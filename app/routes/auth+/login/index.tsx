import type { ActionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node"
import { login } from "../auth.server";

export const action = async ({ request }: ActionArgs ) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    if (
        typeof username !== "string" ||
        typeof password !== "string" 
    ) {
        throw new Error("Form not submitted correctly!");
    }

    const result = await login({ username, password });

    if (result.errors) {
        return json(result.errors);
    }

    return redirect("/");
}

export default function LoginRoute() {
    return (
        <div className="flex justify-center w-full">
            <form 
            method="post"
            action="/auth/login?index"
            className="w-full sm:max-w-[500px]">
                <div className="mb-2 flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text" 
                    name="username"
                    id="username" 
                    className="rounded-sm p-1 appearance-none
                    outline-none focus:ring-2 focus:ring-blue-200
                    drop-shadow-sm"/>
                </div>
                <div className="mb-2 flex flex-col gap-1">
                    <label htmlFor="Password">Password</label>
                    <input
                    type="password" 
                    name="password"
                    id="password" 
                    className="rounded-sm p-1 appearance-none
                    outline-none focus:ring-2 focus:ring-blue-200
                    drop-shadow-sm"/>
                </div>
                <button 
                type="submit"
                className="w-full bg-blue-200 p-1 rounded-sm
                drop-shadow-sm">
                    Log in
                </button>
            </form>
        </div>
    )
}