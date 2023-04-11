import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyleSheet from "./styles/global.css";
import { ClientOnly } from "remix-utils";
import { createPortal } from "react-dom";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyleSheet }
];

export function Head() {
  return (
    <>
      <Meta />
      <Links />
    </>
  )
};

export default function App() {
  return (
    <>
      <ClientOnly>{() => createPortal(<Head />, document.head)}</ClientOnly>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  );
}
