import { db } from "~/utils/types/db.server";

export const getCategories = async () => {
    const results = await db.product.findMany({
        select: {
            category: true,
        }
    });
    return Array.from(new Set(results.map(result => result.category)));
}

export const getProducts = async () => {
    return db.product.findMany();
}

type PaginationOptions = {
    page: number,
    limit?: number
}

// const getPaginatedResources = async <TValues extends { length : number }>({
//     url,
//     schema,
//     limit,
// }: {
//     url: string,
//     schema: z.Schema<TValues>
// } & PaginationOptions) => {
//     const data = await fetch(url).then(response => response.json());
//     const result = schema.safeParse(data);

//     return {
//         hasMore: result.success ? result.data.length === limit : undefined,
//         products: result.success ? result.data : []
//     }
// }

export const getPaginatedProducts = async ({
    page,
    limit = 10
}: PaginationOptions) => {
    const products = await db.product.findMany({
        take: limit + 1,
        skip: (page - 1) * limit
    });
    return {
        hasMore: products.length === limit + 1,
        products: products.slice(0, limit - 1)
    }
}

// export const getPaginatedProductsByCategory = async ({
//     category,
//     limit
// }: { 
//     category: string
// } & PaginationOptions) => {
//     return getPaginatedResources({
//         url: `https://fakestoreapi.com/products/category/${category}?limit=${limit}`,
//         schema: z.array(ExtendedProductSchema),
//         limit
//     });
// }

export const getProduct = async ({
    id
}: {
    id: number
}) => {
    return db.product.findUnique({
        where: { id }
    });
}