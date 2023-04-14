import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "~/utils/types/db.server";

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const LoginSchema = z.object({
    username: z.string().min(MIN_USERNAME_LENGTH, "Username must be at least 3 characters long!"),
    password: z.string().min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters long!"),
});

type LoginArgs = z.infer<typeof LoginSchema>;

type FormErrors<T> = {
    fields: T | null,
    fieldErrors: string[] | null,
    formError: string | null,
}

const validateUserPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}

const handleBadRequest = <T>(errors: T) => {
    return {
        data: null,
        errors,
    };
}

const handleOKRequest = <T>(data: T) => {
    return {
        data,
        errors: null
    };
}

const handleInvalidFormFieldValues = <T>({ 
    fields, fieldErrors 
}: {
    fields: T,
    fieldErrors: string[]
}) => {
    return handleBadRequest({
        fields,
        fieldErrors,
        formError: null,
    });
}

const handleNoExistingUser = (
    message = "Invalid credentials! Please try again."
) => {
    return handleBadRequest({
        fields: null,
        fieldErrors: null,
        formError: message,
    });
}

const handleIncorrectPassword = (
    message = "Incorrect password! Please try again."
) => {
    return handleBadRequest({
        fields: null,
        fieldErrors: null,
        formError: message,
    });
}

export const login = async ({
    username,
    password
}: LoginArgs): Promise<{
    data: Pick<User, "id" | "username"> | null,
    errors: FormErrors<LoginArgs> | null, 
}> => {
    const validationResult = LoginSchema.safeParse({
        username,
        password
    });

    if (!validationResult.success) {
        return handleInvalidFormFieldValues({
            fields: { username, password },
            fieldErrors: validationResult.error.errors.map(error => error.message),
        });
    }
    
    const user = await db.user.findUnique({
        where: { username }
    });

    if (!user) {
        return handleNoExistingUser();
    }

    const isCorrectPassword = await validateUserPassword(
        password, user.password
    );

    if (!isCorrectPassword) {
        return handleIncorrectPassword();
    }

    return handleOKRequest({
        id: user.id,
        username: user.username
    });
}