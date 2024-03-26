const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  });

  {isModalOpen && selectedProduct && <ProductsDetail />}
