import React from "react";
import { Link } from "react-router-dom";

const ProductModal = (props) => {
  const {
    selectedProduct,
    closeModal,
    selectThumbnail,
    addToCart,
    addedToCart,
    wishlist,
    whishlistbtn,
  } = props;
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white flex justify-center items-center  rounded-3xl shadow-2xl max-w-2xl relative z-10">
            <div className="py-10 px-10">
              <button
                className="float-right pb-9 text-2xl"
                onClick={closeModal}
              >
                <i class="fa-solid fa-xmark "></i>
              </button>

              <h2 className="text-3xl font-bold pb-8 ">
                {selectedProduct.title}
              </h2>
              <div className="flex justify-center items-center">
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="object-cover h-96 py-5 "
                />
              </div>
              <span className="font-semibold">More Images</span>
              <div className="flex items-center mt-5 overflow-x-auto">
                {selectedProduct.images.map((v, i) => (
                  <img
                    key={i}
                    src={v}
                    alt="image"
                    className="w-16 h-16 mr-8 border rounded-full"
                    onClick={() => selectThumbnail(v)}
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed font-semibold pt-1">
                {selectedProduct.brand}
              </p>
              <p className="text-base py-2 *:">{selectedProduct.description}</p>
              <div className="flex my-1">
                <p className="text-lg font-bold">
                  <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
                  {selectedProduct.price -
                    parseInt(
                      (selectedProduct.price *
                        selectedProduct.discountPercentage) /
                        100
                    )}
                </p>
                <p className="text-base font-semibold px-3 leading-relaxed text-gray-500 line-through">
                  <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                  {selectedProduct.price}
                </p>
              </div>
              <p className="text-base leading-relaxed font-bold text-red-500">
                ({selectedProduct.discountPercentage}% off)
              </p>
              <div className="flex ">
                <p className="text-lg leading-relaxed mt-4 py-2 px-4  border  hover:border-black text-center font-semibold rounded">
                  {selectedProduct.rating}
                  <i className="fa-solid fa-star pl-1 text-teal-500"></i>
                </p>
                <button
                  className="bg-rose-500 mx-1 hover:bg-rose-400 text-white rounded font-bold ml-2 mt-4 py-1 px-5"
                  onClick={addToCart}
                >
                  {addedToCart ? (
                    <span>
                      <Link to="/cart">
                        GO TO CART <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </span>
                  ) : (
                    "ADD TO CART"
                  )}
                </button>

                <div
                  className={`border rounded-full text-center  ml-64 px-3 mt-4 py-2 ${
                    wishlist.some((item) => item.id === selectedProduct.id)
                      ? "bg-gray-300"
                      : ""
                  }`}
                  onClick={(e) => {
                    whishlistbtn(selectedProduct.id, e);
                  }}
                >
                  {wishlist.some((item) => item.id === selectedProduct.id) ? (
                    <i className="fas fa-heart text-rose-500 text-xl "></i>
                  ) : (
                    <i className="fa-regular fa-heart text-xl  "></i>
                  )}
                  <label htmlFor="" className="font-semibold ">
                    {wishlist.some((item) => item.id === selectedProduct.id)
                      ? ""
                      : ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
{
  /* <div
                  className={`border flex justify-center rounded items-center ml-1 px-5 mt-4 py-1${
                    props.wishlist.some(
                      (item) => item.id === props.selectedProduct.id
                    )
                      ? "bg-gray-300"
                      : ""
                  }`}
                  onClick={(e) => {
                    whishlistbtn(props.selectedProduct.id, e);
                  }}
                >
                  {props.wishlist.some(
                    (item) => item.id === props.selectedProduct.id
                  ) ? (
                    <i className="fas fa-heart text-red-600 mr-1"></i>
                  ) : (
                    <i className="fa-regular fa-heart "></i>
                  )}
                  <label htmlFor="" className="font-semibold mx-2">
                    {props.wishlist.some(
                      (item) => item.id === props.selectedProduct.id
                    )
                      ? "WISHLISTED"
                      : "WISHLIST"}
                  </label>
                </div> */
}
