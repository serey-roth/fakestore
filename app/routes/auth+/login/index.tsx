import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node"
import { login } from "../auth.server";
import { Link, useActionData, useLoaderData, useSearchParams } from "@remix-run/react";
import { ValidatedLabelledFormInput } from "../validated-labelled-form-input";
import { createUserSession } from "../session.server";
import { createLinkWithRedirectTo } from "../createLinkWithRedirectTo";

export const action = async ({ request }: ActionArgs ) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = form.get("redirectTo") || "/?index";

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo != "string"
    ) {
        throw new Error("Form not submitted correctly!");
    }

    const result = await login({ username, password });

    if (result.errors) {
        return json(result.errors);
    }

    if (!result.data) {
        throw new Error("Something went wrong when logging user in.");
    }

    return createUserSession(result.data.id, redirectTo);
}

export const loader = async ({ request }: LoaderArgs) => {
    const searchParams = new URL(request.url).searchParams;
    const username = searchParams.get("username");
    
    return json({
        username
    });
}

export default function LoginRoute() {
    const loaderData = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");
    const linkToRegister = createLinkWithRedirectTo("/auth/register?index", redirectTo);

    return (
        <div className="flex justify-center w-full">
            <div className="w-full sm:max-w-[500px]">
                <h1 className="font-bold text-xl mb-2
                underline underline-offset-2">Log in to your account</h1>
                <form 
                method="post"
                action="/auth/login?index">
                    <ValidatedLabelledFormInput 
                    name="username"
                    type="text"
                    label="Username"
                    defaultValue={loaderData.username || actionData?.fields?.username}
                    error={actionData?.fieldErrors?.username} />

                    <ValidatedLabelledFormInput 
                    name="password"
                    type="password"
                    label="Password"
                    defaultValue={actionData?.fields?.password}
                    error={actionData?.fieldErrors?.password} />

                    {actionData?.formError ? (
                        <p 
                        role="alert"
                        id="form-error"
                        className="text-sm font-semibold text-red-500 my-2">
                            {actionData.formError}
                        </p>
                    ) : null}

                    <button 
                    type="submit"
                    className="w-full bg-blue-300 p-1 rounded-sm
                    drop-shadow-sm mt-2">
                        Log in
                    </button>
                </form>
                <div className="flex items-center mt-2">
                    <p>Don't have an account yet?</p>
                    <Link to={linkToRegister}>
                        <p className="ml-2 underline hover:text-blue-500
                        transition duration-300 ease-in-out">
                            Register
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}