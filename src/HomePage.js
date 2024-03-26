import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
// import banner from "./Images/heroimage.jpg";

import firstpart from "./Images/firstpart.webp";
import secondpart from "./Images/secondpar.webp";
import home1 from "./Images/home1.webp";
import home2 from "./Images/home2.webp";
import home3 from "./Images/home3.webp";
import home4 from "./Images/home5.webp";
import home6 from "./Images/home6.webp";
import footerimg from "./Images/footeimage.webp";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductsDetail from "./components/ProductsDetail";

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  
  }, [searchTerm, products]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const addToCart = () => {
    const isAlreadyInCart = cartItems?.some(
      (item) => item.id === selectedProduct.id
    );
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      setAddedToCart(true);
      toast.success("Item added to cart successfully");
    }
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== selectedProduct.id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.length);
  }, [cartItems]);
  const productmodal = (product) => {
    openModal(product);
    setSearchTerm("");
  };
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
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== productId)
      : [...wishlist, selectedProduct];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast[isInWishlist ? "error" : "success"](
      isInWishlist ? "Removed from wishlist" : "Added to wishlist"
    );
  };
  return (
    <>
      <Header
        count={count}
        // toggleCartModal={toggleCartModal}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
   {filteredProducts && searchTerm ? (
        <section className="py-10 px-5 sm:px-10">
          <div className="container mx-auto py-10">
            {searchTerm && filteredProducts.length === 0 ? (
              <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
                No products found
              </div>
            ) : (
              <div className="flex flex-wrap -m-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 "
                    onClick={() => productmodal(product)}
                  >
                    <div className="bg-white hover:shadow-xl rounded-lg shadow-lg overflow-hidden">
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
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <h2 className="text-lg font-bold line-clamp-1 text-gray-800">
                          {product.title}
                        </h2>
                        <p className="text-xs line-clamp-1 mt-2 text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex  justify-between  mt-3">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-800">
                              ₹
                              {product.price -
                                parseInt(
                                  (product.price * product.discountPercentage) /
                                    100
                                )}
                            </span>
                            <span class="font-semibold text-xs mx-2 line-through text-slate-900">
                              ₹{product.price}
                            </span>
                            <span className="text-xs leading-relaxed font- text-red-500">
                              ({product.discountPercentage}% off)
                            </span>
                          </div>
                          {/* Wishlist button */}
                          <div
                            className={`rounded-full text-center px-2 py-1 ${
                              wishlist?.some((item) => item.id === product.id)
                                ? "bg-gray-300"
                                : "bg-transparent border border-gray-300"
                            }`}
                            onClick={(e) => whishlistbtn(product.id, e)}
                          >
                            {wishlist?.some(
                              (item) => item.id === product.id
                            ) ? (
                              <i className="fas fa-heart text-rose-500"></i>
                            ) : (
                              <i className="far fa-heart text-gray-500"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* open model */}
            {isModalOpen && selectedProduct && <ProductsDetail />}
          </div>
        </section>
      ) :(
        <div>
      <div className="container mx-auto">
        {/* All products */}
        <Link to="/all">
          <div className="flex pt-10 justify-center items-center ">
            <div>
              <img src={firstpart} alt="" className="" />
            </div>
            <div>
              <img src={secondpart} alt="" className="w-full" />
            </div>
          </div>
        </Link>
        <div>
          <img src={home1} alt="" className="w-full" />
        </div>
        <div>
          <img src={home2} alt="" className="w-full" />
        </div>

        <div className="flex">
          <div>
            <img src={home3} alt="" className="" />
          </div>
          <div>
            <img src={home4} alt="" className="" />
          </div>
        </div>
        <div>
          <img src={home6} alt="" />
        </div>
      </div>
     
     
      <div className="flex justify-center items-center py-20 text-xl  sm:text-4xl font-semibold">
        <h1>Deal-icious Offers</h1>
      </div>
      <div class="container gap-3 mx-auto max-w flex w-full justify-center flex-wrap  sm:flex-wrap   overflow-hidden bg-white">
        <Link to="/mens-shoes">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792073334814.jpg"
              alt="shoes"
            />
          </div>
        </Link>
        <Link to="/bags">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49733324931102.jpg"
              alt="women-bag"
            />
          </div>
        </Link>
        <Link to="/mens-shirts">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49739179622430.jpg"
              alt="men"
            />
          </div>
        </Link>
        <Link to="/mens-watches">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792074317854.jpg"
              alt="watch"
            />
          </div>
        </Link>
        <Link to="/home-decoration">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792074711070.jpg"
              alt="home decor"
            />
          </div>
        </Link>
      </div>
      <div className="py-20 text-xl sm:text-4xl text-center font-semibold">
        <h1>Blockbuster Offers</h1>
      </div>
      <div className=" mx-auto container">
        <div className="gap-5 flex justify-center items-center flex-wrap   bg-white">
          <Link to="/bags">
            <div class="flex  h-3/4  object-cover ">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180343326.jpg"
                alt="women-bag"
              />
            </div>
          </Link>
          <Link to="/womens-watches">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180408862.jpg"
                alt="women-watch"
              />
            </div>
          </Link>
          <Link to="/sunglasses">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180605470.jpg"
                alt="sunglass"
              />
            </div>
          </Link>
          <Link to="/women's shoes">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180736542.jpg"
                alt="shoes"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="my-3">
        <img src={footerimg} alt="" className="w-full" />
      </div>
      </div>
      )}
    </>
  );
};

export default HomePage;
{
  /* <div className=" flex justify-center relative ">
<div className="w-full  ">
  <img src={banner} alt="" className=" w-full" />
</div>
<div className="container mx-auto absolute py-80 w-96  left-28">
  <p className="bghead   text-5xl text-white ">
    Every purchase will be mad e with pleasure.
  </p>
  <p className="bghead flex text-xl my-5 text-white  ">
    We work with global brands and have created an application for you
    to do your shopping.
  </p>
  <div className="container mx-auto py-3 flex justify-center items-center w-screen  bg-white mt-32">
    <p className="mr-10 ">
      You are on myntra.com.You can also shop on myntra india for
      millions of products with fast local delivery.{" "}
      <a href="https://www.myntra.com/online-fashion-store">
        Click here to go to myntra.in
      </a>
    </p>
  </div>
</div>
</div> */
}
// ------------
// <div class="flex w-full  flex-wrap overflow-hidden bg-white">
// {products.map((product) => (
//   <div key={product.id}>
//   <a class="relative flex h-80 w-72 overflow-hidden" href="#">
//   <img
//                       alt={product.title}
//                       className="object-contain object-center"
//                       src={product.thumbnail}
//                     />

//     <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0"></div>
//   </a>
//   <div class="mt-4 pb-5">
//     <a href="#">
//       {/* <h5 class="text-center tracking-tight text-gray-500">
//         Piped Linen Blend Blazer
//       </h5> */}

//     </a>
//     <div class="flex justify-center">
//       <p>
//       {product.category==="smartphones"}
//         <span class="text-sm font-bold text-gray-900">{product.category}</span>
//         <span class="text-sm text-gray-400 line-through">$499</span>
//       </p>
//       </div>

//     </div>
//   </div>

// ))}
// </div>

// =============
// <div>
//         {/* All products */}
//         <div className="">
//           <div className=" flex justify-center items-center">
//             <img src={firstimage} alt="" className="w-full h-full" />
//           </div>
//           <div className="flex justify-center items-center ">
//             <div>
//               <img src={firstpart} alt="" className="" />
//             </div>
//             <div>
//               <img src={secondpart} alt="" className="w-full" />
//             </div>
//           </div>
//           <div>
//             <img src={home1} alt="" className="w-full" />
//           </div>
//           <div>
//             <img src={home2} alt="" className="w-full" />
//           </div>

//           <div className="flex">
//             <div>
//               <img src={home3} alt="" className="" />
//             </div>
//             <div>
//               <img src={home4} alt="" className="" />
//             </div>
//           </div>
//           <div>
//             <img src={home6} alt="" />
//           </div>
//         </div>
//       </div>
