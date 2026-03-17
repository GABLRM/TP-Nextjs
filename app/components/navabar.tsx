import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar navbar-default">
            <div className="flex items-center justify-center w-full">
                <div className="navbar-header">
                    <h1 className="text-2xl font-bold text-black">Ecommerce-next</h1>
                    <Link className="navbar-brand" href="/">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    )
}