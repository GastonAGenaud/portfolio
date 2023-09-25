import React from "react";
import Link from "next/link";
const NavLink = React.lazy(() => import('./NavLink'));
// import { Suspense } from "react";

const navLinks = [
    {
        title: "About",
        path: "#about",
    },
    {
        title: "Projects",
        path: "#projects",
    },
    {
        title: "Contact",
        path: "#contact",
    },
    {
        title: "Contact",
        path: "#contact",
    }
]
const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="flex flex-wrap items-center justify-between mx-auto p-8">
                    <Link href={"/"} className="text-5xl text-white font-semibold">
                        Portfolio
                    </Link>
                    <div className="menu block md:w-auto" id="navbar">
                        <ul>
                            {
                                navLinks.map((link, index) => (

                                    <li key={index}>
                                        {/* <Suspense fallback={<div>Loading...</div>}> */}
                                            <NavLink href={link.path} title={link.title} />
                                        {/* </Suspense> */}

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
