import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Header from "./components/Header/Header";
import FeaturedShop from "./components/FeaturedShop/FeaturedShop";
import FeaturedRestaurants from "./components/FeaturedRestaurants/FeaturedRestaurants";
import AllShop from "./components/AllShop/AllShop";
import AllRestaurants from "./components/AllRestaurants/AllRestaurants";
import Shop from "./components/Shop/Shop";
import ShopProducts from "./components/Shop/ShopProducts/ShopProducts";
import Payment from "./components/Payment/Payment";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FeaturedShop /> <FeaturedRestaurants />
            </>
          }
        />
        <Route path="all-shop" element={<AllShop />} />
        <Route path="all-restaurants" element={<AllRestaurants />} />
        <Route path="shop/:id/*" element={<Shop />}>
          <Route path=":sid" element={<ShopProducts />} />
        </Route>
        <Route path="payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default App;
