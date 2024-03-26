import React from "react";

const FilterProducts = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="flex items-center  sm:mx-5">
      <input
        type="text"
        placeholder="Search For Products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className=" h-7 pl-4 w-[114px] text-[9px] border border-r-0  sm:text-sm sm:w-[300px] sm:h-8 sm:text-[12px]   lg:w-[290px] lg:h-8 md:w-[150px] md:h-[29px] lg:text-[12px]  xl:text-[15px] md:text-[11px]  xl:w-[360px]   xl:text-sm rounded-l-md text-gray-700 focus:outline-none   xl:h-10"
      />
      <button className=" border-l-0 w-10 h-7 sm:h-8 xl:h-10  lg:h-8 md:w-[35px] md:h-[29px] border rounded-r-md text-gray-300 ">
        <i className="fas fa-search text-xs xl:text-[16px]  "></i>
      </button>
    </div>
  );
};

export default FilterProducts;

// ------------------header code of original----------------------
// return (
//   <header className="bg-white shadow-md">
//     <nav className="mx-14 h-20 flex justify-between items-center ">
//       <Link to="/" className="flex items-center justify-center">
//         <img src="../myntralogo.png" className="w-28 mt-2" alt="Logo" />
//       </Link>
//       <div className="space-x-10 mr-32 font-semibold">
//         <Link to="/all" className="nav-link">
//           ALL
//         </Link>
//         <Link to="/smartphones" className="nav-link">
//           SMARTPHONES
//         </Link>
//         <Link to="/bags" className="nav-link">
//           BAG
//         </Link>
//         <Link to="/sunglasses" className="nav-link">
//           SUNGLASSES
//         </Link>
//         <Link to="/jewellery" className="nav-link">
//           JEWELLERY
//         </Link>
//         <Link to="/laptop" className="nav-link">
//           LAPTOP
//         </Link>
//       </div>

//       <div className="flex items-center space-x-6">
//         <div>
//           <FilterProducts
//             searchTerm={searchTerm}
//             handleSearchChange={handleSearchChange}
//           />
//         </div>
//         <Link to="/login">
//           <i class="fa-regular fa-user text-xl "></i>
//         </Link>
//         <div className="relative">
//           <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
//             <i className="far fa-heart text-2xl"></i>
//           </Link>
//         </div>
//         <div className="relative">
//           <Link to="/cart" className="text-gray-700 hover:text-gray-900">
//             <i className="fas fa-shopping-cart text-2xl "></i>
//             <span className="absolute bottom-6  bg-red-500 text-white rounded-full right-5 w-5 h-5 flex items-center justify-center text-xs">
//               {count}
//             </span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   </header>
// );
