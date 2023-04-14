import { Outlet } from "@remix-run/react";
import Navbar from "../nav-bar";

export default function AuthLayout() {
    return (
        <div className="flex flex-col bg-teal-500 min-h-screen w-screen
        px-2">
            <div className="flex items-center w-full py-2 gap-2">
                <h1 className="font-bold text-lg mr-auto">Fake Store</h1>
                <Navbar 
                links={[
                    {
                        name: "Home", 
                        to: "/"
                    },
                    {
                        name: "Log in", 
                        to: "/auth/login"
                    }
                ]} />
            </div>
            <Outlet />
        </div>
    )
}