import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import CategoriesSelect from "./category-select";
import Pagination from "./pagination";
import ProductCard from "./product-card";
import { getCategories, getPaginatedProducts } from "./products.server";

//const LIMIT = 10;

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

    const categories = await getCategories();

    let productsData = getPaginatedProducts({
        page: currentPage
    });
    
    return defer({
        currentCategory : categoryParam,
        categories,
        currentPage,
        productsData
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
            <Suspense fallback={<div>Loading products...</div>}>
                <Await
                resolve={data.productsData}>
                {({ hasMore, products}) => (
                    <>
                        <Pagination 
                        currentPage={data.currentPage} 
                        hasMore={!!hasMore} />
                        <div className="flex flex-wrap justify-center gap-2">
                            {products.map((product) => (
                                <ProductCard key={product.id}>
                                    <ProductCard.Image image={product.imageURL || ""} />
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
                    </>
                )}
                </Await>
            </Suspense>
        </div>
    )
}