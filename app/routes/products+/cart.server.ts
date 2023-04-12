import { z } from "zod";

type AddProductToCardArgs = {
    productId: number,
    userId: number,
    quantity: number,
};

const AddProductToCardResponseSchema = z.object({
    id: z.number(),
    userId: z.number(),
    date: z.date(),
    products: z.array(z.object({
        productId: z.number(),
        quantity: z.number()
    }))
});

export const addProductToCart = async ({
    productId,
    userId,
    quantity
}: AddProductToCardArgs) => {
    const result = await fetch(
        `https://fakestoreapi.com/carts`,
        {
            method: "POST",
            body: JSON.stringify({
                userId,
                date: new Date(),
                products: [{
                    productId,
                    quantity
                }]
            })
        }
    )
    .then(response => response.json())
    .then(data => AddProductToCardResponseSchema.safeParse(data));

    if (!result.success) {
        return undefined;
    } else {
        return result.data;
    }
}