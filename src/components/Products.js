import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header";
import Footer from "../Footer";
import ProductsDetail from "./ProductsDetail";
import { Link } from "react-router-dom";
import Smartphones from "./Smartphones";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  console.log("products::::", products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const perPage = 30;
  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
      setCount(parsedCartItems.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    console.log("storedWishlist", storedWishlist);
  }, []);

  const totalPages = Math.ceil(products.length / perPage);
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  console.log("ishover", isHover);
  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  });

  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };
 

  const toggleCartModal = () => {
    setIsCartModalOpen(true);
  };

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist?.some((item) => item.id === productId);
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      setWishlist(updatedWishlist);
      toast.error("Removed from wishlist");

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setWishlist([...wishlist, productToAdd]);
        toast.success("Added to wishlist");
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, productToAdd])
        );
      }
    }
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  return (
    <div className="bg-gray-100 overflow-hidden min-h-screen">
      <Header
        count={count}
        toggleCartModal={toggleCartModal}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

<section className="py-0  sm:px-10">
  <div className="container mx-auto sm:py-10">
    {searchTerm && filteredProducts.length === 0 ? (
      <div className="text-center pt-52 text-2xl font-semibold">
        No products found
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
        {filteredProducts.slice(startIndex, endIndex).map((product) => (
          <div
            key={product.id}
            className="bg-white sm:rounded-lg hover:shadow-xl  shadow-lg overflow-hidden"
            onClick={() => openModal(product)}
          >
            <Link to="/ProductsDetail">
              <div
                className="h-64 overflow-hidden"
                onMouseEnter={() => {
                  setIshover(true);
                  setIsHoverSetProduct(product.id);
                }}
                onMouseLeave={() => setIshover(false)}
              >
                {isHoverSetProduct === product.id && isHover ? (
                  <Slider {...settings}>
                    {product.images.map((image, index) => (
                      <div key={index} className="h-64">
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          className="h-full w-full object-cover"
                          onClick={() => selectThumbnail(image)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className=" h-60 w-full object-cover  sm:h-full sm:w-full sm:object-cover"
                  />
                )}
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xs sm:text-lg font-bold line-clamp-1 text-gray-800">
                {product.title}
              </h2>
              <p className="text-[10px]  sm:text-xs line-clamp-1 mt-2 text-gray-600">
                {product.description}
              </p>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <span className=" text-[10px] sm:text-sm font-bold text-gray-800">
                    ₹
                    {product.price -
                      parseInt(
                        (product.price * product.discountPercentage) / 100
                      )}
                  </span>
                  <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                    ₹{product.price}
                  </span>
                  <span className=" text-[8px] sm:text-xs leading-relaxed font- text-red-500">
                    ({product.discountPercentage}% off)
                  </span>
                </div>
                {/* Wishlist button */}
                <div
                  className={` sm:rounded-full text-center sm:px-2  sm:py-1 ${
                    wishlist?.some((item) => item.id === product.id)
                      ? "sm:bg-gray-300"
                      : "sm:bg-transparent sm:border sm:border-gray-300"
                  }`}
                  onClick={(e) => whishlistbtn(product.id, e)}
                >
                  {wishlist?.some((item) => item.id === product.id) ? (
                    <i className="fas fa-heart text-rose-500"></i>
                  ) : (
                    <i className="far fa-heart text-gray-500"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    {/* open modal */}
    {isModalOpen && selectedProduct && <ProductsDetail />}
  </div>
</section>


      {!searchTerm || filteredProducts.length > perPage ? (
        <div className="flex justify-center py-12">
          <button
            onClick={handlePrevPage}
            className={`mx-2 px-5 py-3 text-lg border rounded-full ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            <i class="fa-solid fa-angle-left "></i>
          </button>
          <span className="pt-2 text-2xl ">page {currentPage} </span>
          <button
            onClick={handleNextPage}
            className={`mx-2 px-5 text-lg py-3 border rounded-full
                      ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-blue-500 text-white"
                      }`}
            disabled={currentPage === totalPages}
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Products;




// import React, { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Header from "../Header";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import ProductsDetail from "./ProductsDetail";

// const Smartphones = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isHover, setIshover] = useState(false);
//   const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [count, setCount] = useState(0);
//   const [filteredSmartphones, setFilteredSmartphones] = useState([]);

//   console.log("filteredSmartphones", filteredSmartphones);

//   console.log("products:>", products);
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 300,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`https://dummyjson.com/products?limit=0`);
//       const data = await response.json();
//       setProducts(data.products);
//     };
//     fetchData();
//   }, []);
//   useEffect(() => {
//     const smartphones = products.filter(
//       (product) => product.category === "smartphones"
//     );
//     setFilteredSmartphones(smartphones);
//   }, [products]);
//   useEffect(() => {
//     const savedCartItems = localStorage.getItem("cartItems");
//     if (savedCartItems) {
//       const parsedCartItems = JSON.parse(savedCartItems);
//       setCartItems(parsedCartItems);
//       setCount(parsedCartItems.length);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     setCount(cartItems.length);
//   }, [cartItems]);

//   useEffect(() => {
//     const filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchTerm, products]);
//   useEffect(() => {
//     const storedWishlist = localStorage.getItem("wishlist");
//     if (storedWishlist) {
//       setWishlist(JSON.parse(storedWishlist));
//     }
//     console.log("storedWishlist", storedWishlist);
//   }, []);
//   const whishlistbtn = (productId, e) => {
//     e.stopPropagation();
//     const isInWishlist = wishlist?.some((item) => item.id === productId);
//     if (isInWishlist) {
//       const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//       setWishlist(updatedWishlist);
//       toast.error("Removed from wishlist");

//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     } else {
//       const productToAdd = products.find((product) => product.id === productId);
//       if (productToAdd) {
//         setWishlist([...wishlist, productToAdd]);
//         toast.success("Added to wishlist");
//         localStorage.setItem(
//           "wishlist",
//           JSON.stringify([...wishlist, productToAdd])
//         );
//       }
//     }
//   };
  

//   const openModal = useCallback((product) => {
//     setSelectedProduct(product);

//     const isInCart = cartItems?.some((item) => item.id === product.id);
//     setAddedToCart(isInCart);
//     localStorage.setItem("selectedProduct", JSON.stringify(product));
//   });
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);

//   };
//   const productmodal=(product)=>{
//     openModal(product) 
//     setSearchTerm("")
//    }
//    const addToCart = () => {
//     const isAlreadyInCart = cartItems.some(
//       (item) => item.id === selectedProduct.id
//     );
//     const maxQuantity = 10;
//     const productWithQuantity = { ...selectedProduct, quantity: 1 };
//     if (!isAlreadyInCart && cartItems.length < maxQuantity) {
//       setCartItems([...cartItems, productWithQuantity]);
//       setCount(count + 1);
//       toast.success("Item added to cart successfully");
//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify([...cartItems, productWithQuantity])
//       );
//     } else if (isAlreadyInCart) {
//       toast.error("This item is already in your cart.");
//     } 
//   };
//   const selectThumbnail = (image) => {
//     setSelectedProduct((prevProduct) => ({
//       ...prevProduct,
//       thumbnail: image,
//     }));
//   };
//   return (
//     <>
//       <Header
//         count={count}
//         searchTerm={searchTerm}
//         handleSearchChange={handleSearchChange}
//       />
//       {filteredProducts&&searchTerm ?(
//       <section className="py-10 px-5 sm:px-10">
//         <div className="container mx-auto py-10">
//           {searchTerm && filteredProducts.length === 0 ? (
//             <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
//               No products found
//             </div>
//           ) : (
//             <div className="flex flex-wrap -m-4">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 "
//                   onClick={()=>productmodal(product)}
//                 >
//                   <div className="bg-white hover:shadow-xl rounded-lg shadow-lg overflow-hidden">
//                 <Link to="/ProductsDetail">
//                     <div
//                       className="h-64 overflow-hidden"
//                       onMouseEnter={() => {
//                         setIshover(true);
//                         setIsHoverSetProduct(product.id);
//                       }}
//                       onMouseLeave={() => setIshover(false)}
//                     >
//                       {isHoverSetProduct === product.id && isHover ? (
//                         <Slider {...settings}>
//                           {product.images.map((image, index) => (
//                             <div key={index} className="h-64">
//                               <img
//                                 src={image}
//                                 alt={`Product ${index}`}
//                                 className="h-full w-full object-cover"
//                                 onClick={() => selectThumbnail(image)}
//                               />
//                             </div>
//                           ))}
//                         </Slider>
//                       ) : (
//                         <img
//                           src={product.thumbnail}
//                           alt={product.title}
//                           className="h-full w-full object-cover"
//                         />
//                       )}
//                     </div>
//                     </Link>
//                     <div className="p-4">
//                       <h2 className="text-lg font-bold line-clamp-1 text-gray-800">
//                         {product.title}
//                       </h2>
//                       <p className="text-xs line-clamp-1 mt-2 text-gray-600">
//                         {product.description}
//                       </p>
//                         <div className="flex  justify-between  mt-3">
//                         <div className="flex items-center">
//                           <span className="text-sm font-bold text-gray-800">
//                             ₹
//                             {product.price -
//                               parseInt(
//                                 (product.price * product.discountPercentage) / 100
//                               )}
//                           </span>
//                           <span class="font-semibold text-xs mx-2 line-through text-slate-900">
//                           ₹{product.price}
//                         </span>
//                         <span className="text-xs leading-relaxed font- text-red-500">
//                           ({product.discountPercentage}% off)
//                         </span>
//                         </div>
//                         {/* Wishlist button */}
//                         <div
//                           className={`rounded-full text-center px-2 py-1 ${
//                             wishlist?.some((item) => item.id === product.id)
//                               ? "bg-gray-300"
//                               : "bg-transparent border border-gray-300"
//                           }`}
//                           onClick={(e) => whishlistbtn(product.id, e)}
//                         >
//                           {wishlist?.some((item) => item.id === product.id) ? (
//                             <i className="fas fa-heart text-rose-500"></i>
//                           ) : (
//                             <i className="far fa-heart text-gray-500"></i>
//                           )}
//                         </div>
//                       </div>
//                     </div>
            
//                 </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* open model */}
//           {isModalOpen && selectedProduct && <ProductsDetail />}
        
//         </div>
//       </section>
//       ):(
//       <div className="container mx-auto m-4 block md:flex md:justify-center">
//         <div className="flex justify-center items-center w-full">
//           <div className="p-4 flex-wrap grid xl:grid-cols-2 md:grid-cols-2 md:p-0 gap-2">
//             {selectedProduct.images.map((image, index) => (
//               <div
//                 key={index}
//                 className="w-full xl:w-[350px] xl:h-[350px] lg:w-[290px] lg:h-[290px] md:w-[200px] md:h-[200px] border "
//               >
//                 <img
//                   src={image}
//                   alt="image"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col px-10 gap-10 xl:gap-10 lg:gap-6 md:gap-2 xl:px-0 lg:px-0 md:px-0 sm:px-0 py-20 xl:w-2/3 md:w-[41%]">
//           <div className="flex flex-col gap-2  xl:gap-10 lg:gap-6 md:gap-4 ">
//             <h1 className="text-3xl  font-bold">{selectedProduct.title}</h1>
//             <h1 className="text-gray-400 text-xl font-normal">
//               {selectedProduct.category}
//             </h1>
//             <h1 className="text-gray-400 text-xl font-normal">
//               {selectedProduct.description}
//             </h1>
//             <p className="text-gray-400 text-xl leading-relaxed font-normal">
//               {selectedProduct.brand}
//             </p>
//             <div className="border border-gary-200 w-20 flex font-bold justify-evenly">
//               {selectedProduct.rating}{" "}
//               <i className="fa-solid fa-star mt-1 text-teal-500"></i>
//             </div>
//             <div className="border border-gray-300"></div>
//           </div>

//           <div className="flex items-center  my-1 text-2xl   font-bold text-black">
//             <p className="text-2xl lg:text-lg sm:text-base font-bold">
//               <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
//               {selectedProduct.price -
//                 (
//                   (selectedProduct.price * selectedProduct.discountPercentage) /
//                   100
//                 ).toFixed()}
//             </p>
//             <p className="text-xl lg:text-lg sm:text-base opacity-40 font-normal px-3 leading-relaxed line-through">
//               ₹{selectedProduct.price}
//             </p>
//             <span className="opacity-40 text-xl lg:text-lg sm:text-base font-normal">
//               {" "}
//               MRP
//             </span>{" "}
//             <p className="text-lg leading-relaxed lg:text-lg sm:text-base font-bold px-2 text-red-400">
//               ({selectedProduct.discountPercentage}% off)
//             </p>
//           </div>
//           <div>
//             <p className="text-lg leading-relaxed ">
//               <label htmlFor="" className="text-teal-600 font-semibold">
//                 In stock :{" "}
//               </label>
//               {selectedProduct.stock}
//             </p>
//           </div>
//           <div className="text-teal-600 font-bold text-xl xl:text-xl lg:text-lg md:text-lg  ">
//             inclusive of all taxes
//           </div>

//           <div className="flex flex-row gap-1">
//             <button
//               className="rounded-none py-3 px-4 h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
//               onClick={addToCart}
//             >
//               {cartItems.some((item) => item.id === selectedProduct.id) ? (
//                 <Link to="/cart" className="text-white">
//                   GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
//                 </Link>
//               ) : (
//                 "ADD TO CART"
//               )}
//             </button>
//             <button
//               className={`rounded-none py-3 px-4 h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
//                 wishlist?.some((item) => item.id === selectedProduct.id)
//                   ? "bg-gray-300"
//                   : ""
//               }`}
//               onClick={(e) => {
//                 whishlistbtn(selectedProduct.id, e);
//               }}
//             >
//               {wishlist?.some((item) => item.id === selectedProduct.id) ? (
//                 <i className="fas fa-heart text-red-400 mr-1"></i>
//               ) : (
//                 <i className="fa-regular fa-heart "></i>
//               )}
//               <label htmlFor="" className="font-semibold mx-2">
//                 {wishlist?.some((item) => item.id === selectedProduct.id)
//                   ? "WISHLISTED"
//                   : "WISHLIST"}
//               </label>
//             </button>
//           </div>
//         </div>
//       </div>
//       )}
//     </>
//   );
// };

// export default Smartphones;
