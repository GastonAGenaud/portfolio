const NavLink = ({ href, tittle }) => {
    return (
        <NavLink
            href={href}
            className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
            >
        {tittle}
        </NavLink>
    );
};

export default NavLink;