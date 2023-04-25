import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useActionData, useSearchParams } from "@remix-run/react";
import { register } from "../auth.server";
import { ValidatedLabelledFormInput } from "../validated-labelled-form-input";
import { createLinkWithRedirectTo } from "../createLinkWithRedirectTo";

export const action = async ({ request }: ActionArgs ) => {
    const form = await request.formData();
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    const redirectTo = form.get("redirectTo") || "";

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof email !== "string" ||
        typeof confirmPassword !== "string" || 
        typeof redirectTo !== "string"
    ) {
        throw new Error("Form not submitted correctly!");
    }

    const result = await register({ 
        username,
        password,
        email,
        confirmPassword
    });

    if (result.errors) {
        return json(result.errors);
    }

    return redirect(createLinkWithRedirectTo(`/auth/login?index&username=${result.data?.username}`, redirectTo));
}

export default function LoginRoute() {
    const actionData = useActionData<typeof action>();

    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");
    const linkToLogin = createLinkWithRedirectTo("/auth/login?index", redirectTo);

    return (
        <div className="flex justify-center w-full">
            <div className="w-full sm:max-w-[500px]">
                <h1 className="font-bold text-xl mb-2
                underline underline-offset-2">Register an account</h1>
                <form 
                method="post"
                action="/auth/register?index">
                    <input
                    type="hidden"
                    value={redirectTo || undefined}
                    name="redirectTo" />

                    <ValidatedLabelledFormInput 
                    name="username"
                    type="text"
                    label="Username"
                    defaultValue={actionData?.fields?.username}
                    error={actionData?.fieldErrors?.username} />

                    <ValidatedLabelledFormInput 
                    name="email"
                    type="text"
                    label="Email"
                    defaultValue={actionData?.fields?.email}
                    error={actionData?.fieldErrors?.email} />

                    <ValidatedLabelledFormInput 
                    name="password"
                    type="password"
                    label="Password"
                    defaultValue={actionData?.fields?.password}
                    error={actionData?.fieldErrors?.password} />

                    <ValidatedLabelledFormInput 
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    defaultValue={actionData?.fields?.confirmPassword}
                    error={actionData?.fieldErrors?.confirmPassword} />

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
                        Register
                    </button>
                </form>
                <div className="flex items-center mt-2">
                    <p>Already have an account?</p>
                    <Link to={linkToLogin}>
                        <p className="ml-2 underline hover:text-blue-500
                        transition duration-300 ease-in-out">
                            Log in
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}