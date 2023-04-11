import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
});

export const ExtendedProductSchema = ProductSchema.extend({
    category: z.string(),
    image: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ExtendedProduct = z.infer<typeof ExtendedProductSchema>;