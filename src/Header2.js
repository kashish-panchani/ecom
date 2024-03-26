import React from "react";
import { Link } from "react-router-dom";

const Header2 = ({ count }) => {
  return (
    <header className="fixed w-full bg-gray-800">
      <nav className="flex items-center justify-between h-28">
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              src="../myntralogo.png"
              className="w-44 mt-2 hover:border"
              alt="Logo"
            />
          </Link>
          <div className="text-white mx-">
            <p className="text-xl">Deliver to</p>
            <div className="flex">
              <i className="fa-solid fa-location-dot text-2xl mr-1"></i>
              <p className="text-2xl font-bold">India</p>
            </div>
          </div>
        </div>

        {/* <Link to="/login">
            <i class="fa-regular fa-user text-white "></i>
            </Link> */}

        <div className="ml-auto">
          <Link to="/wishlist">
            <i className="fa-regular fa-heart left-10 text-white text-3xl pr-4 mb-2"></i>
          </Link>
        </div>
        <Link to="/cart">
          <div className="text-white cursor-pointer mr-12  hover:text-gray-300">
            <i className="fa-solid fa-cart-shopping text-4xl float-right py-7 "></i>
            <span className="float-right font-bold border-black text-white px-2  text-center rounded-full my-3 bg-red-500 text-lg">
              {count}
            </span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header2;
