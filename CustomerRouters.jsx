

 import React from 'react';
 import { Routes, Route } from 'react-router-dom';

// // Import all your pages/components - with fixed NotFoundPage import
import HomePage from '../Customer/Pages/HomePage/HomePage';
 import Product from '../Customer/Components/Product/Product';
 import ProductDetails from '../Customer/Components/ProductDetails/ProductDetails';
 import ProductCard from '../Customer/Components/Product/ProductCard';
 import Cart from '../Customer/Components/Cart/Cart';
 import CheckOut from '../Customer/Components/CheckOut/CheckOut';
 import Order from '../Customer/Components/Order/Order';
 import Navigation from '../Customer/Components/Navigation/Navigation';
 import Footer from '../Customer/Components/Footer/Footer';
 import HouseServicesApp from '../Customer/Components/HomeSectionCarousel/HouseServicesApp';
 import SalonForWomenCarousel from '../Customer/Components/HomeSectionCarousel/SalonForWomenCarousel';
 import NotFoundPage from '../Customer/Pages/NotFoundPage';
 import RegisterForm from '../Customer/Auth/RegisterForm';
 import LoginForm from '../Customer/Auth/LoginForm';
 import ProductDetailsSalon from '../Customer/Components/ProductDetails/ProductDetailsSalon';
const CustomerRouters = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/salon-details" element={<ProductDetailsSalon />} />
          <Route path="/product-card" element={<Product/>} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/home-services" element={<HouseServicesApp />} />
          <Route path="/salon-services" element={<SalonForWomenCarousel />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};
export default CustomerRouters;