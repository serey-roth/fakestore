/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from 'react-dom/client';

function hydrate() {
  startTransition(() => {
    // @ts-expect-error
    hydrateRoot(document.getElementById("root"), <RemixApp />);
    // since <Head> is wrapped in <ClientOnly> it will
    // not render until after hydration
    // so we need to remove the server rendered head
    // in preparation for the client side render
    document.head.innerHTML = document.head.innerHTML.replace(
      /<!--start head-->.+<!--end head-->/,
      ""
    );
  });
}

function RemixApp() {
  return (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}