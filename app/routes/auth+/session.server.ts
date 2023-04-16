import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
    userId: string;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("Session secret is required for cookie!")
}

export const storage = createCookieSessionStorage<SessionData>({
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

export const createUserSession = async (
    userId: string,
    redirectToURL: string
) => {
    //create a new session so we don't pass the cookie header
    const session = await storage.getSession();
    
    session.set("userId", userId);

    return redirect(redirectToURL, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        }
    });
}

export const getUserSession = async (request: Request) => {
    return storage.getSession(request.headers.get("Cookie"));
}

export const getUserSessionId = async (request: Request) => {
    const session = await getUserSession(request);
    return session.get("userId");
}

export const requireUserSessionId = async (
    request: Request,
    currentPath = new URL(request.url).pathname
) => {
    const userId = await getUserSessionId(request);
    
    if (!userId) {
        const searchParams = new URLSearchParams([
            ["redirectTo", currentPath]
        ])
        throw redirect(`/auth/login?index&${searchParams}`);
    }

    return userId;
}