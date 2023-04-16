import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getUserSessionId } from "../auth+/session.server";
import { getUser } from "../auth+/users.server";

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await getUserSessionId(request);

    let user: Awaited<ReturnType<typeof getUser>> = null;
    
    if (userId) {
        user = await getUser({
            userId
        });
    }

    return json({ user });
}

export default function IndexLayout() {
    const loaderData = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col bg-teal-500 min-h-screen w-screen
        px-2">
            <div className="flex items-center w-full py-2">
                <h1 className="font-bold text-lg mr-auto">Fake Products</h1>
                <span className="rounded-full w-8 h-8 bg-white flex
                items-center justify-center drop-shadow-md">
                    {loaderData.user?.username.charAt(0)}
                </span>
            </div>
            <Outlet />
        </div>
    )
}