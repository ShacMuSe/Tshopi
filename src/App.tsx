import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import OrderPage from "./components/OrderPage/OrderPage";
import CategoriesPage from "./components/HomePage/CategoriesPage";
import CartPage from "./components/CartPage/CartPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home page */}
          <Route index element={<CategoriesPage />} />

          {/* Products by category */}
          <Route path="products/:category" element={<ProductListingPage />} />

          {/* All products (optional) */}
          <Route path="listproducts" element={<ProductListingPage />} />

          {/* Product details */}
          <Route path="product/:id" element={<ProductDetailsPage />} />

          {/* Order */}
          <Route path="order/:productId" element={<OrderPage />} />

          {/* Cart */}
          <Route path="/cart/:phone" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
