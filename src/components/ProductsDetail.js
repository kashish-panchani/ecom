import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";

const ProductsDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
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
    const storedSelectedProduct = JSON.parse(
      localStorage.getItem("selectedProduct")
    );
    if (storedSelectedProduct) setSelectedProduct(storedSelectedProduct);

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setCount(savedCartItems.length);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    // setCurrentPage(1);
  }, [searchTerm, products]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // setCurrentPage(1);
  };
  const addToCart = () => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.id === selectedProduct.id
    );
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (!isAlreadyInCart && cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      toast.success("Item added to cart successfully");
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, productWithQuantity])
      );
    } else if (isAlreadyInCart) {
      toast.error("This item is already in your cart.");
    } else {
      toast.error(
        "You have reached the maximum quantity allowed in your cart."
      );
    }
  };
  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  });
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
  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };
  const productmodal = (product) => {
    openModal(product);
    setSearchTerm("");
  };
  if (!selectedProduct) return null;

  return (
    <>
      <Header
        count={count}
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
      ) : (
        <div className="container mx-auto m-4 block md:flex md:justify-center">
          <div className="flex justify-center items-center w-full">
            <div className="p-4 flex-wrap grid xl:grid-cols-2 md:grid-cols-2 md:p-0 gap-2">
              {selectedProduct.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full xl:w-[350px] xl:h-[350px] lg:w-[290px] lg:h-[290px] md:w-[200px] md:h-[200px] border "
                >
                  <img
                    src={image}
                    alt="image"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col px-4 sm:px-16 gap-3 xl:gap-5 lg:gap-4 md:gap-2 sm:gap-3 md:px-0 py-5 md:py-20 xl:w-2/3  md:w-[41%]">
            <div className="flex flex-col gap-2  xl:gap-5 lg:gap-4 md:gap-3 sm:gap-3 ">
              <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-xl text-lg  font-bold">
                {selectedProduct.title}
              </h1>
              <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-base text-sm font-normal">
                {selectedProduct.category}
              </h1>
              <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm font-normal">
                {selectedProduct.description} 
              </h1>
              <p className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm leading-relaxed font-normal">
                {selectedProduct.brand}
              </p>
              <div className="border border-gary-200 w-14 text-xs    flex items-center font-bold justify-evenly">
                {selectedProduct.rating}{" "}
                <i className="fa-solid fa-star mt-1 text-xs text-teal-500"></i>
              </div>
              {/* <div className="border border-gray-300"></div>
               */}
              <hr />
            </div>

            <div className="flex items-center my-1 xl:text-2xl   font-bold text-black">
              <p className="xl:text-2xl lg:text-lg md:text-sm sm:text-sm text-xs font-bold">
                ₹
                {selectedProduct.price -
                  (
                    (selectedProduct.price *
                      selectedProduct.discountPercentage) /
                    100
                  ).toFixed()}
              </p>
              <p className="text-xs xl:text-xl lg:text-base md:text-sm sm:text-sm opacity-40 font-normal px-2 leading-relaxed line-through">
                ₹{selectedProduct.price}
              </p>
              <span className="opacity-40 text-xs  xl:text-xl lg:text-sm  md:text-sm sm:text-sm font-normal">
                {" "}
                MRP
              </span>{" "}
              <p className=" text-xs xl:text-lg leading-relaxed lg:text-sm md:text-sm sm:text-sm font-bold px-2 text-red-400">
                ({selectedProduct.discountPercentage}% off)
              </p>
            </div>
            <div>
              <p className="text-sm xl:text-xl lg:text-lg md:text-sm sm:text-base leading-relaxed ">
                <label htmlFor="" className="text-teal-600 font-semibold">
                  In stock :{" "}
                </label>
                {selectedProduct.stock}
              </p>
            </div>
            <div className="text-teal-600 font-bold text-sm xl:text-xl lg:text-base md:text-sm sm:text-sm ">
              inclusive of all taxes
            </div>

            <div className="flex flex-row gap-1 w-60 sm:w-72  lg:w-96">
              <button
                className="text-[10px] xl:text-base  lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
                onClick={addToCart}
              >
                {cartItems.some((item) => item.id === selectedProduct.id) ? (
                  <Link to="/cart" className="text-white">
                    GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
                  </Link>
                ) : (
                  "ADD TO CART"
                )}
              </button>
              <button
                className={`text-[10px] xl:text-base lg:text-sm  md:text-xs sm:text-xs  rounded-none py-3 sm:px-4 lg:h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
                  wishlist?.some((item) => item.id === selectedProduct.id)
                    ? "bg-gray-300"
                    : ""
                }`}
                onClick={(e) => {
                  whishlistbtn(selectedProduct.id, e);
                }}
              >
                {wishlist?.some((item) => item.id === selectedProduct.id) ? (
                  <i className="fas fa-heart text-red-400 mr-1"></i>
                ) : (
                  <i className="fa-regular fa-heart "></i>
                )}
                <label htmlFor="" className="font-semibold mx-2">
                  {wishlist?.some((item) => item.id === selectedProduct.id)
                    ? "WISHLISTED"
                    : "WISHLIST"}
                </label>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetail;

{
  /* <button
                  className={`rounded-none py-3 px-4 h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
                    wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "bg-gray-300"
                      : ""
                  }`}
                  onClick={(e) => {
                    whishlistbtn(selectedProduct.id, e);
                  }}
                >
                  {wishlist?.some((item) => item.id === selectedProduct.id) ? (
                    <i className="fas fa-heart text-red-600 mr-1"></i>
                  ) : (
                    <i className="fa-regular fa-heart "></i>
                  )}
                  <label htmlFor="" className="font-semibold mx-2">
                    {wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "WISHLISTED"
                      : "WISHLIST"}
                  </label>
                </button> */
}
