import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "~/utils/types/db.server";

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const UsernamePasswordSchema = z.object({
    username: z.string().min(MIN_USERNAME_LENGTH, "Username must be at least 3 characters long!"),
    password: z.string().min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters long!"),
});

type UsernamePassword = z.infer<typeof UsernamePasswordSchema>;

type FieldErrors<TFields> = {
    [T in keyof TFields]?: string[];
}

type FormErrors<TFields> = {
    fields?: TFields,
    fieldErrors?: FieldErrors<TFields>;
    formError?: string,
}

const validateUserPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}

const handleBadRequest = <TErrors>(errors: TErrors) => {
    return {
        data: null,
        errors,
    };
}

const handleOKRequest = <TData>(data: TData) => {
    return {
        data,
        errors: null
    };
}

const handleInvalidFormFieldValues = <TFields>({ 
    fields, fieldErrors 
}: {
    fields: TFields,
    fieldErrors: FieldErrors<TFields>
}) => {
    return handleBadRequest({
        fields,
        fieldErrors,
    });
}

const handleNoExistingUser = <TFields>(
    fields: TFields,
    message = "Invalid credentials! Please try again."
) => {
    return handleBadRequest({
        fields,
        formError: message,
    });
}

const handleIncorrectPassword = <TFields>(
    fields: TFields,
    message = "Incorrect password! Please try again."
) => {
    return handleBadRequest({
        fields,
        formError: message,
    });
}

export const login = async ({
    username,
    password
}: UsernamePassword): Promise<{
    data: Pick<User, "id" | "username"> | null,
    errors: FormErrors<UsernamePassword> | null, 
}> => {
    const validationResult = UsernamePasswordSchema.safeParse({
        username,
        password
    });

    if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        return handleInvalidFormFieldValues({
            fields: { username, password },
            fieldErrors,
        });
    }
    
    const user = await db.user.findUnique({
        where: { username }
    });

    if (!user) {
        return handleNoExistingUser({ username, password });
    }

    const isCorrectPassword = await validateUserPassword(
        password, user.password
    );

    if (!isCorrectPassword) {
        return handleIncorrectPassword({ username, password });
    }

    return handleOKRequest({
        id: user.id,
        username: user.username
    });
}