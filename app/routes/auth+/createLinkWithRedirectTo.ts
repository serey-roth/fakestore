import { URLSearchParams } from "url";

export const createLinkWithRedirectTo = (basePath: string, redirectTo: string | null) => {
    if (redirectTo) {
        return basePath + `&${new URLSearchParams([[ "redirectTo" , redirectTo ]])}`;
    } else {
        return basePath;
    }
}