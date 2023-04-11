import { z } from "zod";
import { ExtendedProductSchema } from "~/utils/types/product";

export const getCategories = async () => {
    const result = await fetch(
        'https://fakestoreapi.com/products/categories'
    )
    .then(response => response.json())
    .then(data => z.array(z.string()).safeParse(data));

    return result.success ? result.data : [];
}

export const getProducts = async () => {
    const result = await fetch(
        `https://fakestoreapi.com/products`
    )
    .then(response => response.json())
    .then(data => z.array(ExtendedProductSchema).safeParse(data));

    return result.success ? result.data : [];
}

type PaginationOptions = {
    limit: number
}

const getPaginatedResources = async <TValues extends { length : number }>({
    url,
    schema,
    limit,
}: {
    url: string,
    schema: z.Schema<TValues>
} & PaginationOptions) => {
    const data = await fetch(url).then(response => response.json());
    const result = schema.safeParse(data);

    return {
        hasMore: result.success ? result.data.length === limit : undefined,
        products: result.success ? result.data : []
    }
}

export const getPaginatedProducts = async ({
    limit
}: PaginationOptions) => {
    return getPaginatedResources({
        url: `https://fakestoreapi.com/products?limit=${limit}`,
        schema: z.array(ExtendedProductSchema),
        limit
    });
}

export const getPaginatedProductsByCategory = async ({
    category,
    limit
}: { 
    category: string
} & PaginationOptions) => {
    return getPaginatedResources({
        url: `https://fakestoreapi.com/products/category/${category}?limit=${limit}`,
        schema: z.array(ExtendedProductSchema),
        limit
    });
}

export const getProduct = async (id: number) => {
    const result = await fetch(
        `https://fakestoreapi.com/products/${id}`
    )
    .then(response => response.json())
    .then(data => ExtendedProductSchema.safeParse(data));

    return result.success ? result.data : null;
}