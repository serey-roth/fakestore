import type { z } from "zod";

export function validate<TValues>(
    values: unknown,
    schema: z.Schema<TValues>
): z.infer<typeof schema> | null {
    const validated = schema.safeParse(values);
    console.log(validated)
    if (validated.success) {
        return validated.data;
    } else {
        return null;
    }
}