import { NavLink } from "react-router-dom";
import logo from "../../public/assets/Zepto-logo.avif";

import { useState } from "react";
import { GiCrossedBones } from "react-icons/gi";
import { navMenu } from "../common/StoreData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-md font-sans tracking-wide top-0 z-50 sticky">
      <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-slate-800 min-h-[70px]">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-36" />
        </NavLink>

        <div
          id="collapseMenu"
          className={`${
            isMenuOpen ? "block" : "max-lg:hidden"
          } lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          <button
            id="toggleClose"
            onClick={toggleMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <GiCrossedBones size={22} color="red" />
          </button>

          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <NavLink to="/">
                <img src={logo} alt="logo" className="w-36" />
              </NavLink>
            </li>

            {navMenu?.map((item, index) => (
              <li key={index} className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  onClick={toggleMenu}
                  to={item?.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 block font-bold text-[15px]"
                      : "hover:text-blue-500 text-[15px] lg:text-gray-300 text-slate-600 font-bold"
                  }
                >
                  {item?.screenName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex max-lg:ml-auto">
          <button id="toggleOpen" onClick={toggleMenu} className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#ffff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
