import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("Session secret is required for cookie!")
}

export const storage = createCookieSessionStorage({
    cookie: {
        name: "fake-products",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        path: "/",
        secrets: [sessionSecret]
    }
});

