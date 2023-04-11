import { Outlet } from "@remix-run/react";

export default function IndexLayout() {
    return (
        <div className="flex flex-col bg-teal-500 min-h-screen w-screen
        px-2">
            <div className="flex items-center w-full py-2">
                <h1 className="font-bold text-lg mr-auto">Fake Products</h1>
            </div>
            <Outlet />
        </div>
    )
}