import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
const navLink = [
    {
        href: "/about",
        title: "About",
    },
    {
        href: "/contact",
        title: "Contact",
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
                        <ul className="flex">
                            {
                                navLink.map((link) => (
                                    <li key={link.href} className="mr-4">
                                        <NavLink href={link.href} title={link.title} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
