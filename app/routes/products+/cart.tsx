import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node"
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

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