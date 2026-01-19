import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import OrderPage from "./components/OrderPage/OrderPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/listproducts" />} />
          <Route path="listproducts" element={<ProductListingPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="order/:productId" element={<OrderPage />} />
          <Route path="/products/:category" element={<ProductListingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
