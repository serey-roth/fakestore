import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { ExtendedProductSchema } from "~/utils/types/product";
import { ProductCategory, ProductDescription, ProductImage, ProductPrice, ProductTitle } from "../product-card";
import { AddToCartButtons } from "../cart";

export const loader = async ({ params }: LoaderArgs) => {
    const { productId } = params;

    if (!productId) {
        throw new Error("Product ID is mandatory!")
    }

    const result = await fetch(
        `https://fakestoreapi.com/products/${productId}`
    ).then(response => response.json())
    .then(data => ExtendedProductSchema.safeParse(data));

    if (!result.success) {
        throw new Error("No product with this ID!");
    }

    return json({
        product: result.data
    });
}

export default function ProductRoute() {
    const { product } = useLoaderData<typeof loader>();
    
    return (
        <div className="w-full bg-teal-400 p-2">
            <div className="flex sm:flex-row flex-col sm:items-start gap-2
            relative">
                <div className="w-full sm:w-40">
                    <ProductImage image={product.image} />
                </div>
                <div className="flex flex-col self-stretch">
                    <span className="text-lg">
                        <ProductTitle title={product.title} />
                    </span>
                    <span className="text-md font-semibold mb-2">
                        <ProductPrice price={product.price} />
                    </span>
                    <AddToCartButtons />
                    <span className="flex-1 mt-2 mb-2">
                        <ProductDescription description={product.description} />
                    </span>

                    <ProductCategory category={product.category} />
                </div>
            </div>
        </div>
    )
}