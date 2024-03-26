import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../Header";
import { Link } from "react-router-dom";
import Slider from "react-slick";


const Decor = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [addedToCart, setAddedToCart] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isHover, setIshover] = useState(false);
    const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [count, setCount] = useState(0);
    const [filteredSmartphones, setFilteredSmartphones] = useState([]);
  
    console.log("filteredSmartphones", filteredSmartphones);
  
    console.log("products:>", products);
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
     
      const smartphones = products.filter(
        (product) => product.category === "home-decoration"
      );
      setFilteredSmartphones(smartphones);
    }, [products]);
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
   
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchTerm, products]);
    useEffect(() => {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
      console.log("storedWishlist", storedWishlist);
    }, []);
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

    const openModal = useCallback((product) => {
      setSelectedProduct(product);
  
      const isInCart = cartItems?.some((item) => item.id === product.id);
      setAddedToCart(isInCart);
      localStorage.setItem("selectedProduct", JSON.stringify(product));
    });
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
 
    };
    const selectThumbnail = (image) => {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        thumbnail: image,
      }));
    };
    return (
      <>
        <Header
          count={count}
      
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
       <div className="overflow-hidden sm:container sm:mx-auto py-10">
  <div className="overflow-hidden grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
    {filteredSmartphones.map((product) => (
      <div
        key={product.id}
        className=" sm:p-0  bg-white sm:border sm:rounded-lg shadow-lg overflow-hidden"
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
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="p-2 sm:p-4">
          <h2 className="text-xs  sm:text-base  font-bold line-clamp-1 text-gray-800">
            {product.title}
          </h2>
          <p className="text-xs sm:text-sm line-clamp-1 md:line-clamp-2 mt-2 text-gray-600">
            {product.description}
          </p>
          <div className="flex justify-between items-center sm:mt-3">
            <p className="flex justify-center items-center text-xs sm:text-sm font-bold text-gray-800">
              ₹
              {product.price -
                parseInt(
                  (product.price * product.discountPercentage) / 100
                )}
                <p class="font-semibold text-[10px] mx-1 sm:text-sm sm:mx-2 line-through text-slate-900">
                              ₹{product.price}
                            </p>
                            <p className="text-[9px] sm:text-xs leading-relaxed  text-orange-300">
                              ({product.discountPercentage}% off)
                            </p>
            </p>
           
            {/* Wishlist button */}
            <div
              className={`sm:rounded-full text-center px-2 py-1 ${
                wishlist?.some((item) => item.id === product.id)
                  ? "sm:bg-gray-300"
                  : "bg-transparent sm:border sm:border-gray-300"
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
</div>
      </>
    );
}

export default Decor
