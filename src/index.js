import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <ToastContainer />
  </>
);
//wishlist valu 6-----------------------------------
// import React, { useState, useEffect, useCallback } from "react";
// import { toast } from "react-toastify";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [count, setCount] = useState(0);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);  const [wishlist, setWishlist] = useState([]);

//   const perPage = 30;

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`https://dummyjson.com/products?limit=0`);
//       const data = await response.json();
//       setProducts(data.products);
//     };
//     fetchData();
//   }, []);

//   // Other useEffects for cart items and filtered products...

// const whishlistbtn = (productId) => {
//   const isInWishlist = wishlist.some((item) => item.id === productId);
//   if (isInWishlist) {
//     const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//     setWishlist(updatedWishlist);
//     toast.success("Removed from wishlist");
//   } else {
//     const productToAdd = products.find((product) => product.id === productId);
//     if (productToAdd) {
//       setWishlist([...wishlist, productToAdd]);
//       toast.success("Added to wishlist");
//     }
//   }
// };

//   return (
//     <div className=" bg-gray-100 ">
//       {/* Header and other components... */}
//       <div className="text-white cursor-pointer mr-12  hover:text-gray-300">
//         <i class="fa-regular fa-heart left-10 text-white text-3xl px-4 "></i>
//         <span className="float-right font-bold border-black text-white px-2  text-center rounded-full my-3 bg-red-500 text-lg">
//           {wishlist.length}
//         </span>
//       </div>
//       {/* Products section */}
//       <section className="text-gray-600  body-font ">
//         <div className="container py-36  mx-auto">
//           {/* Product cards */}
//           <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 ">
//             {filteredProducts.slice(startIndex, endIndex).map((product) => (
//               <div
//                 key={product.id}
//                 className="p-6 md:w-1/3 sm:mb-0 mb-6"
//                 onClick={() => openModal(product)}
//               >
//                 {/* Product card content */}
//                 <div className="rounded-lg hover:shadow-2xl cursor-pointer h-full bg-white px-10 py-4">
//                   {/* Product details */}
//                   <div className="h-80 overflow-hidden">
//                     <img
//                       alt={product.title}
//                       className="object-contain object-center h-full w-full"
//                       src={product.thumbnail}
//                     />
//                   </div>
//                   <h2 className="text-xl pt-4 font-bold title-font text-gray-900 mt-5">
//                     {product.title}
//                   </h2>
//                   {/* Other product details */}
//                   {/* Wishlist icon */}
//                   <div className="border flex justify-center items-center py-1 px-1">
//                     <i class="fa-regular fa-heart text-2xl"></i>
//                     <label
//                       htmlFor=""
//                       className="font-semibold mx-2"
//                       onClick={() => whishlistbtn(product.id)}
//                     >
//                       {wishlist.some((item) => item.id === product.id)
//                         ? "REMOVE FROM WISHLIST"
//                         : "ADD TO WISHLIST"}
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App;
