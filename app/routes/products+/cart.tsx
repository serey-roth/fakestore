import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useFetcher, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const productId = form.get("productId");
    const quantity = form.get("quantity");

    if (
        typeof productId !== "string" ||
        typeof quantity !== "string"
    ) {
        throw new Error("Form not submitted correctly!");
    }

    
}

export const loader = async ({ request }: LoaderArgs) => {
    return json({
        cart: 1,
    })
}

export function Cart() {
    const fetcher = useFetcher<typeof loader>();
    
    useEffect(() => {
        if (
            fetcher.state === "idle" && 
            fetcher.data == null
        ) {
            fetcher.load("/products/cart");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcher.state, fetcher.data]);

    return (
        <div className="w-fit flex items-center gap-1
        rounded-full bg-teal-600 px-2 py-1 text-gray-100
        drop-shadow-sm">
            <AiOutlineShoppingCart size={20}/>
            <p className="text-sm">{fetcher.data?.cart}</p>
        </div>
    )
}

export function AddToCartButtons() {
    const { productId } = useParams();

    console.log(productId)

    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
        if (quantity <= 0) {
            return;
        }
        setQuantity(quantity - 1);
    }

    return (
        <div className="flex items-center">
            <button 
            onClick={handleIncrement}
            className="bg-white border 
            rounded-l-full px-2">
                +
            </button>
            <p className="bg-white border px-4 font-medium">
                {quantity}
            </p>
            <button 
            onClick={handleDecrement}
            className="bg-white border px-2
            rounded-r-full"
            disabled={quantity === 0}>
                -
            </button>
            <form method="post" action="/products/cart">
                <input
                type="hidden"
                value={productId ? Number.parseInt(productId) : undefined}
                name="productId" />
                <input
                type="hidden"
                value={quantity}
                name="quantity" />
                <button 
                type="submit"
                className="ml-2 py-1 px-2 rounded-full bg-teal-600 text-gray-100">
                    <BsFillCartCheckFill size={20}/>
                </button>
            </form>
        </div>
    )
}