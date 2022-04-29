import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductItemsPage from "./Pages/ProductItemsPage";
import { fetchCartFromDBHandler } from "./Store/cart-slice";
import CheckoutPage from "./Pages/CheckoutPage";
import AuthPage from "./Pages/AuthPage";
import LogoutPage from "./Pages/LogoutPage";

function App() {
  const dispatch = useDispatch();
  const isFirsTimeInHomePage = useSelector(
    (state) => state.pCategory.firstTime
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.user.id);
  const accessToken = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    //check saved jwt
    if (isLoggedIn) {
      dispatch(fetchCartFromDBHandler(userId, accessToken));
    }
  }, [isLoggedIn]);
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />}></Route>
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <AuthPage />}
        />
        <Route
          path="/logout"
          element={
            !isLoggedIn ? <Navigate to="/home" replace /> : <LogoutPage />
          }
        />
        <Route
          path="/checkout"
          element={isLoggedIn && <CheckoutPage />}
        ></Route>
        <Route
          path="/category/:id/products"
          element={
            isFirsTimeInHomePage ? (
              <Navigate to="/home" replace />
            ) : (
              <ProductsPage />
            )
          }
        />

        <Route
          path="/product/:id/items"
          element={
            isFirsTimeInHomePage ? (
              <Navigate to="/home" replace />
            ) : (
              <ProductItemsPage />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
