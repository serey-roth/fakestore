import { Link } from "@remix-run/react";

type NavLink = {
    name: string;
    to: string;
}

type NavbarProps = {
    links: NavLink[];
}

export default function Navbar({
    links
}: NavbarProps) {
    return (
        <>
        <nav className="sm:opacity-100 opacity-0">
            <ul className="flex gap-2 items-center">
                {links.map(({ name, to }) => (
                    <li 
                    key={name}
                    className="underline text-sm font-medium underline-offset-1">
                        <Link to={to}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
        </>
    )
}