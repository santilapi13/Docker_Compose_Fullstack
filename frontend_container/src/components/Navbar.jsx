import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (window.innerWidth < 768) {
            setClicked(!clicked);
        }
    };

    return (
    <>
        <div className="flex bg-zinc-700 p-6 items-center justify-between">
            <h2 className="text-white font-normal text-2xl">
                Software Libre 2024
            </h2>
            <div className={`z-50 absolute offScreen right-0 mr-auto ml-auto text-center ease-in-out md:static md:m-0 text-white ${clicked ? "w-full block top-1/3 left-0 mt-2" : ""}`}>
                <Link onClick={handleClick} to="/" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                Home
                </Link>
            </div>
        </div>
    </>
    );
}

export default Navbar;