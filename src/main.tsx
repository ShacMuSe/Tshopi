import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProductListingPage from "./components/ProductListingPage";
import AddProductPage from "./components/AddProductPage";
import ProductDetailsPage from "./components/ProductDetailsPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/listproducts" />} />
          <Route path="listproducts" element={<ProductListingPage />} />
          <Route path="addproducts" element={<AddProductPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
