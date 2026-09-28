import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import HomeScreen from "./components/screens/HomeScreen.jsx";
import SignupScreen from "./components/screens/SignupScreen.jsx";
import LoginScreen from "./components/screens/LoginScreen.jsx";
import CartScreen from "./components/screens/CartScreen.jsx";
import Product from "./components/Product.jsx";
import ProductScreen from "./components/screens/ProductScreen.jsx";
import AboutScreen from "./components/screens/AboutScreen.jsx";
import FeaturesScreen from "./components/screens/FeaturesScreen.jsx";
import PricingScreen from "./components/screens/PricingScreen.jsx";
import { Routes, Route } from "react-router-dom";
import ProfileScreen from "./components/screens/ProfileScreen.jsx";
import OrderSuccessScreen from "./components/screens/OrderSuccessScreen.jsx";
import MyOrdersScreen from "./components/screens/MyOrdersScreen.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/features" element={<FeaturesScreen />} />
        <Route path="/pricing" element={<PricingScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/order-success" element={<OrderSuccessScreen />} />
        <Route path="/my-orders" element={<MyOrdersScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
