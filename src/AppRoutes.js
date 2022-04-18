import { Routes, Route } from "react-router-dom";
import Add from "./pages/admin/Add";
import AdminProducts from "./pages/admin/Products";
import BodySize from "./pages/BodySize";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Secret from "./pages/Secret";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/body-size" element={<BodySize />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/admin/*" element={<Secret />}>
        <Route index element={<AdminProducts />} />
        <Route path="product/add" element={<Add />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
