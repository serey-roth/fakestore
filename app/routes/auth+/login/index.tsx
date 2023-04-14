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
        <div>
            <form 
            method="post"
            action="/auth/login?index">
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text" 
                    name="username"
                    id="username" />
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <input
                    type="password" 
                    name="password"
                    id="password" />
                </div>
                <button 
                type="submit">
                    log in
                </button>
            </form>
        </div>
    )
}