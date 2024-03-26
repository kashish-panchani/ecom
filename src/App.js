import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Login from "./Login";
import Cart from "./components/Cart";
import ProductsDetail from "./components/ProductsDetail";
import HomePage from "./HomePage";
import Smartphones from "./components/Smartphones";
import Bags from "./components/Bags";
import Sunglasses from "./components/Sunglasses";
import Jewellery from "./components/Jewellery";
import Laptops from "./components/Laptops";
import Shoes from "./components/Shoes";
import Mensshirt from "./Mensshirt";
import Footer from "./Footer";
import MenWatch from "./components/MenWatch";
import Decor from "./components/Decor";
import WomenWatch from "./components/WomenWatch";
import WomenShoes from "./components/WomenShoes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<HomePage />} />
        <Route path="/all" exact element={<Products />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/ProductsDetail" exact element={<ProductsDetail />} />
        <Route path="/smartphones" exact element={<Smartphones />} />
        <Route path="/bags" exact element={<Bags />} />
        <Route path="/sunglasses" exact element={<Sunglasses />} />
        <Route path="/jewellery" exact element={<Jewellery />} />
        <Route path="/laptop" exact element={<Laptops />} />
        <Route path="/mens-shoes" exact element={<Shoes />} />
        <Route path="/mens-shirts" exact element={<Mensshirt />} />
        <Route path="/mens-watches" exact element={<MenWatch />} />
        <Route path="/home-decoration" exact element={<Decor />} />
        <Route path="/womens-watches" exact element={<WomenWatch />} />
        <Route path="/women's shoes" exact element={<WomenShoes />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  
  );
};

export default App;
