
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {

  return (
<nav className="" >

  <div className='flex relative'>
      <div className="container mx-auto flex  items-center p-2 m-5 w-3/5">
        {/* Logo */}
        <div className="text-2xl font-bold mr-20">
          Homble
        </div>

        <div className="relative text-gray-600 ml-12 mr-12 w-1/2 pl-40 ">
  <input
    type="search"
    name="search"
    placeholder="Search"
    className="bg-white h-10 px-15 pl-6  rounded-full text-sm focus:outline-none shadow-md w-full"
  />
  <button type="submit" className="absolute right-0 top-0 mt-3 mr-4" aria-label="Search">
  <FaSearch className="ml-2 text-gray-600" />
  </button>
</div>



       

    

      </div>

      
<div className="flex justify-end ">
  <div className="flex items-center space-x-4">
    {/* Shopping Cart Icon */}
    <div className='pl-5 pr-5 '>
    <FaShoppingCart className="text-gray-600 cursor-pointer" />
    </div>

    {/* User Icon with Dropdown */}
    <div className=" pl-5 pr-5">
      <FaUser
        className="text-gray-600 cursor-pointer"
      />
   
    </div>
    <div className=" pl-5 pr-5 mh-1">
  <a href="/about" className="text-gray-800 hover:text-gray-600">
    Menu
  </a>
  </div>
  </div>

  {/* Menu Link */}
  
</div>
</div>
    </nav>
  );
};

export default Navbar;