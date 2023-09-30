/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link"; // Importa Link de next/link

const NavLink = ({ href, title }) => {
    return (
        <Link href={href}>
            <span className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white">
                {title}
            </span>
        </Link>
    );
};

export default NavLink;
