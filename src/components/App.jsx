import "./App.css";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import { ProductsContext } from "../contexts/ProductsContext";
import { UserContext } from "../contexts/UserContext";
import ProductSection from "./ProductSection/ProductSection";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Popup from "./Popup/Popup";
import Footer from "./Footer/Footer";
import OrdersTable from "./OrdersTable/OrdersTable";
import HeaderClient from "./Header/HeaderClient/HeaderClient";
import { api } from "../utils/api";
import CanceledOrdersPopup from "./Popup/CanceledOrdersPopup/CanceledOrdersPopup";
import Loader from "./Loader/Loader";
import ErrorPopup from "./Popup/ErrorPopup/ErrorPopup";
import { GROUPS, PRODUCTS } from "../constants";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { getToken, removeToken } from "../utils/token";
import { tokenValidation } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import HeaderBackoffice from "./Header/HeaderBackoffice/HeaderBackoffice";

function App() {
  const [popup, setPopup] = useState(null);
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await api
      .getOrders()
      .then((data) => {
        setOrders(data.slice().reverse());
        setLoader(false);
        // console.log("DATA DE API:", data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        handleOpenPopup(<ErrorPopup error={err} />);
      });
  };

  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    _id: "64a2b9f1e4b0c8a1b2c3d4e5",
    name: "Carlos",
    email: "ejemplo@email.com",
    type: "client",
    mobile: "522581067042",
  });

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      getOrders();
      return;
    }

    tokenValidation(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        if (
          res.data.userType === "admin" ||
          res.data.userType === "restaurant"
        ) {
          navigate("/backoffice");
        } else if (res.data.userType === "client") {
          navigate("/");
        }
        getOrders();
      })
      .catch((err) => {
        console.log(err);
        removeToken();
        setIsLoggedIn(false);
      });
  }, []);

  const canceledOrders = orders.filter(
    (order) =>
      order.clientId === currentUser._id &&
      order.status === "Cancelado" &&
      !order.cancelAcceptance,
  );

  // console.log(canceledOrders);

  return (
    <>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          success,
          setSuccess,
          isOpen,
          setIsOpen,
          errorMessage,
          setErrorMessage,
          isLoggedIn,
          setIsLoggedIn,
          handleClosePopup,
        }}
      >
        <ProductsContext.Provider
          value={{
            PRODUCTS,
            GROUPS,
            handleOpenPopup,
            handleClosePopup,
            setCartItems,
            cartItems,
            orders,
            setOrders,
            getOrders,
            canceledOrders,
            setLoader,
          }}
        >
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ProtectedRoute allowedRoles={["client"]}>
                      <Header secondaryComponent={<HeaderClient />}>
                        <Navigation />
                      </Header>
                      <ProductSection />
                      <Footer />
                      {loader && <Loader />}
                      {popup && (
                        <Popup onClose={handleClosePopup}>{popup}</Popup>
                      )}
                      {canceledOrders.length > 0 && (
                        <Popup onClose={handleClosePopup}>
                          <CanceledOrdersPopup />
                        </Popup>
                      )}
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/backoffice"
                element={
                  <>
                    <ProtectedRoute allowedRoles={["admin", "restaurant"]}>
                      <Header secondaryComponent={<HeaderBackoffice />} />
                      <OrdersTable />
                      <Footer />
                      {popup && (
                        <Popup onClose={handleClosePopup}>{popup}</Popup>
                      )}
                      {loader && <Loader />}
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <ProtectedRoute anonymous>
                      <Header />
                      <Register />
                      <Footer />
                      {popup && (
                        <Popup onClose={handleClosePopup}>{popup}</Popup>
                      )}
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <ProtectedRoute anonymous>
                      <Header />
                      <Login />
                      <Footer />
                      {popup && (
                        <Popup onClose={handleClosePopup}>{popup}</Popup>
                      )}
                    </ProtectedRoute>
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </ProductsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
