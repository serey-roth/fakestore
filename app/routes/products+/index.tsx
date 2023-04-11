import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Pagination from "./pagination";
import ProductCard from "./product-card";
import { getCategories, getPaginatedProducts, getPaginatedProductsByCategory } from "./products.server";
import CategoriesSelect from "./category-select";

const LIMIT = 10;

export const action = async ({ request }: ActionArgs) => {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category");

    const form = await request.formData();
    const currentPage = form.get("currentPage") || "1";
    const paginationAction = form.get("paginationAction");

    if (
        typeof currentPage !== "string" ||
        typeof paginationAction !== "string" 
    ) {
        throw new Error("Form not submitted correctly!");
    }

    let page = Number.parseInt(currentPage);
    if (paginationAction === "next") {
        page += 1;
    } else if (paginationAction === "previous" && page > 1) {
        page -= 1;
    }

    return redirect(`/products?page=${page}${category ? `&category=${category}` : ""}`);
}

export const loader = async ({ request }: LoaderArgs) => {
    const searchParams = new URL(request.url).searchParams;
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page") || "1";

    const currentPage = Number.parseInt(pageParam);
    const paginatedLimit = currentPage * LIMIT + 1;

    const categories = await getCategories();

    let { hasMore, products } = await (
    categoryParam ? getPaginatedProductsByCategory({
        category: categoryParam,
        limit: paginatedLimit
    }) : getPaginatedProducts({
        limit: paginatedLimit
    }));

    products = products.slice((currentPage - 1) * LIMIT, paginatedLimit - 1);
    
    return json({
        currentCategory : categoryParam,
        categories,
        currentPage,
        products,
        hasMore
    }, {
        headers: {
            "Cache-Control": "max-age=10, stale-while-revalidate=60"
        }
    })
}

export default function ProductsRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className="bg-teal-200 p-2 flex flex-col w-full gap-2">
            <CategoriesSelect 
            categories={data.categories} 
            value={data.currentCategory} />
            <Pagination 
            currentPage={data.currentPage} 
            hasMore={!!data.hasMore} />
            <div className="flex flex-wrap justify-center gap-2">
                {data.products.map((product) => (
                    <ProductCard key={product.id}>
                        <ProductCard.Image image={product.image} />
                        <Link to={`/products/${product.id}`}>
                            <ProductCard.Title 
                            title={product.title}
                            isTruncated={true}/>
                        </Link>
                        <span className="text-sm flex-1">
                            <ProductCard.Description description={product.description} />
                        </span>
                        <ProductCard.Price price={product.price} />
                        <span className="text-sm">
                            <ProductCard.Category category={product.category} />
                        </span>
                    </ProductCard>
                ))}
            </div>
        </div>
    )
}