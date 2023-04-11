import { Link } from "@remix-run/react";

export default function IndexRoute() {
    return (
        <div className="bg-teal-200 p-2 flex flex-col w-full gap-2">
            <div className="sm:max-w-[600px] self-center">
                <p className="mb-10">
                    Welcome to FakeProducts, a website that showcases the FakeStore API.
                    Here you'll be able to browse the available products, and if you're 
                    authenticated, you'll be able to manage new and existing products as well.
                </p>
                <Link to='/products'>
                    <p className="underline underline-offset-1 text-teal-600">
                        Check out our products!
                    </p>
                </Link>
            </div>
        </div>
    )
}