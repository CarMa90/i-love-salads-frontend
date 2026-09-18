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
import CanceledOrdersPopup from "./Popup/CanceledOrdersPopup/CanceledOrdersPopup";
import Loader from "./Loader/Loader";
import ErrorPopup from "./Popup/ErrorPopup/ErrorPopup";
import { GROUPS, PRODUCTS } from "../constants";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { getToken, removeToken, setToken } from "../utils/token";
import { validateToken } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import HeaderBackoffice from "./Header/HeaderBackoffice/HeaderBackoffice";
import { mainApi } from "../utils/MainApi";
import RestaurantRegister from "./RestaurantRegister/RestaurantRegister";
import { getCartItems, setCartItemsToLocalStorage } from "../utils/cartItems";
import { authorize, register } from "../utils/auth";

function App() {
  const [popup, setPopup] = useState(null);
  const [loader, setLoader] = useState(() => Boolean(getToken()));
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()));
  const navigate = useNavigate();

  function navigateToSignin() {
    navigate("/signin");
  }

  function handleLogOut() {
    handleClosePopup();
    setCurrentUser({});
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await mainApi
      .getOrders()
      .then((data) => {
        // console.log(data);
        setOrders(data.data.slice().reverse());
        setLoader(false);
        // console.log("DATA DE API:", data);
      })
      .catch((err) => {
        // console.log(err);
        setLoader(false);
        handleOpenPopup(<ErrorPopup error={err} />);
      });
  };

  const [cartItems, setCartItems] = useState(() => {
    const cartItemsFromLocalStorage = getCartItems();
    if (cartItemsFromLocalStorage) {
      try {
        return JSON.parse(cartItemsFromLocalStorage);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCartItemsToLocalStorage(JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    validateToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);

        const currentPath = location.pathname;

        const isAuthRoute = [
          "/signin",
          "/signup",
          "/restaurant/signup",
        ].includes(currentPath);

        if (
          res.data.userType === "admin" ||
          res.data.userType === "restaurant"
        ) {
          if (isAuthRoute || currentPath === "/") {
            navigate("/backoffice", { replace: true });
          }
        } else if (res.data.userType === "client") {
          if (isAuthRoute) {
            navigate("/", { replace: true });
          }
        }
        getOrders();
      })
      .catch(() => {
        // console.log(err);
        removeToken();
        setIsLoggedIn(false);
        setLoader(false);
      });
  }, []);

  const canceledOrders = orders.filter(
    (order) =>
      order.client._id === currentUser._id &&
      order.status === "Cancelado" &&
      !order.cancelAcceptance,
  );

  function handleLogin(values) {
    authorize(values)
      .then(async (res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        const userInfoRes = await mainApi.getUserInfo();
        const userData = userInfoRes.data;
        setCurrentUser(userData);
        if (
          userData.userType === "admin" ||
          userData.userType === "restaurant"
        ) {
          navigate("/backoffice");
        } else if (userData.userType === "client") {
          navigate("/");
        }
        getOrders();
      })
      .catch((err) => {
        setLoader(false);
        setIsOpen(true);
        setSuccess(false);
        setErrorMessage(err.message);
      });
  }

  async function handleRegister(values) {
    try {
      await register(values);

      const authRes = await authorize({
        email: values.email,
        password: values.password,
      });
      setToken(authRes.token);
      setIsLoggedIn(true);

      const userInfoRes = await mainApi.getUserInfo();
      const userData = userInfoRes.data;
      setCurrentUser(userData);

      await getOrders();

      if (userData.userType === "admin" || userData.userType === "restaurant") {
        navigate("/backoffice");
      } else if (userData.userType === "client") {
        navigate("/");
      }
    } catch (err) {
      setLoader(false);
      setIsOpen(true);
      setSuccess(false);
      setErrorMessage(err.message || "Ocurrió un error durante el proceso");
    }
  }

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
          navigateToSignin,
          handleLogOut,
          handleRegister,
          handleLogin,
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
                    <ProtectedRoute anonymous allowedRoles={["client"]}>
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
                    <ProtectedRoute anonymous exactAnonymous>
                      <Header />
                      <Register />
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
                path="/restaurant/signup"
                element={
                  <>
                    <ProtectedRoute anonymous exactAnonymous>
                      <Header />
                      <RestaurantRegister />
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
                path="/signin"
                element={
                  <>
                    <ProtectedRoute anonymous exactAnonymous>
                      <Header />
                      <Login />
                      <Footer />
                      {popup && (
                        <Popup onClose={handleClosePopup}>{popup}</Popup>
                      )}
                      {loader && <Loader />}
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
