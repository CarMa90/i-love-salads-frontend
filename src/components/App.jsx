import "./App.css";
import Header from "./header/Header";
import Navigation from "./Navigation/Navigation";
import { ProductsContext } from "../contexts/ProductsContext";
import { UserContext } from "../contexts/UserContext";
import ProductSection from "./ProductSection/ProductSection";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Popup from "./Popup/Popup";
import Footer from "./Footer/Footer";
import OrdersTable from "./OrdersTable/OrdersTable";
import { api } from "../utils/api";
import CanceledOrdersPopup from "./Popup/CanceledOrdersPopup/CanceledOrdersPopup";
import Loader from "./Loader/Loader";
import ErrorPopup from "./Popup/ErrorPopup/ErrorPopup";

const groups = [
  { name: "Ensaladas", _id: "65f1a2b3c4d5e6f7a8b9c011" },
  { name: "Baguettes", _id: "65f1a2b3c4d5e6f7a8b9c022" },
  { name: "Sopas", _id: "65f1a2b3c4d5e6f7a8b9c033" },
  { name: "Bebidas", _id: "65f1a2b3c4d5e6f7a8b9c044" },
];

const products = [
  {
    name: "E. Pollo Manzana",
    description:
      "Cama de lechuga, vinagreta de balsámico, mezcla de pollo con manzana y chile jalapeño, uvas, queso feta y almendras tostadas.",
    image: "../images/pollo-manzana.jpg",
    price: 149,
    type: "Ensaladas",
    _id: "650f1f1e1c4d7b001c8e9f1a",
  },
  {
    name: "E. Mexicana",
    description:
      "Cama de lechuga, aderezo de cilantro, arrachera, tomate, granos de elote amarillo, frijol negro, aguacate, queso fresco y tiritas de tortilla.",
    image: "../images/pollo-manzana.jpg",
    price: 149,
    type: "Ensaladas",
    _id: "650f1f1e1c4d7b001c8e9f1b",
  },
  {
    name: "E. Pasta al Pesto",
    description:
      "Cama de pasta fusilli, aderezo pesto, pechuga de pollo a la plancha, tomate, pimiento amarillo, aceitunas negras y queso parmesano (no contiene lechuga y se sirve fría).",
    image: "../images/pollo-manzana.jpg",
    price: 149,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6a",
  },
  {
    name: "E. Griega",
    description:
      "Cama de lechuga, vinagreta de balsámico, pechuga de pollo a la plancha, tomate, aceitunas negras, pepino, pimento amarillo y queso feta.",
    image: "../images/pollo-manzana.jpg",
    price: 141,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6b",
  },
  {
    name: "E. Oriental",
    description:
      "Cama de lechuga, aderezo oriental, pechuga de pollo a la plancha, zanahoria, repollo morado y crujientes de won ton",
    image: "../images/pollo-manzana.jpg",
    price: 141,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6c",
  },
  {
    name: "B. Pollo con Chipotle",
    description:
      "Pechuga de pollo a la plancha con crema de chipotle, mayonesa, queso monterrey, tomate, lechuga y aguacate.",
    image: "../images/pollo-chipotle.jpg",
    price: 144,
    type: "Baguettes",
    _id: "650f1f1e1c4d7b001c8e9f1c",
  },
  {
    name: "B. Pollo Poblano",
    description:
      "Pechuga de pollo a la plancha con crema de chile poblano, mayonesa, queso monterrey y granos de elote amarillo.",
    image: "../images/pollo-chipotle.jpg",
    price: 144,
    type: "Baguettes",
    _id: "650f1f1e1c4d7b001c8e9f1d",
  },
  {
    name: "S. de Tortilla",
    description:
      "Base de tomate, queso fresco, aguacate, tiritas de tortilla y crema ácida.",
    image: "../images/sopa-tortilla.jpg",
    price: 61,
    type: "Sopas",
    _id: "507f1f77bcf86cd799439011",
  },
  {
    name: "Caldo de Res",
    description: "Pecho de res, elote, chile poblano, zanahoria, papa y arroz.",
    image: "../images/sopa-tortilla.jpg",
    price: 61,
    type: "Sopas",
    _id: "64a2b2f8e4b09a123456789a",
  },
  {
    name: "Agua fresca",
    description:
      "Botella de medio litro de agua fresca natural con azúcar regular.",
    image: "../images/agua-fresca.jpg",
    price: 36,
    type: "Bebidas",
    _id: "5f50c31b83f3a421b8f01234",
  },
  {
    name: "Refrescos",
    description: "Refresco en lata de 355 ml de la marca coca cola",
    image: "../images/agua-fresca.jpg",
    price: 29,
    type: "Bebidas",
    _id: "60c72b2f9b1d8b0015d8123f",
  },
];

function App() {
  const [popup, setPopup] = useState(null);
  const [loader, setLoader] = useState(false);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    setLoader(true);
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
    getOrders();

    /*
    const interval = setInterval(() => {
      getOrders();
    }, 5000);

    return () => clearInterval(interval);
    */
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
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ProductsContext.Provider
          value={{
            groups,
            products,
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
                    <Header>
                      <Navigation />
                    </Header>
                    <ProductSection />
                    <Footer />
                    {loader && <Loader />}
                    {popup && <Popup onClose={handleClosePopup}>{popup}</Popup>}
                    {canceledOrders.length > 0 && (
                      <Popup onClose={handleClosePopup}>
                        <CanceledOrdersPopup />
                      </Popup>
                    )}
                  </>
                }
              />
              <Route
                path="/backoffice"
                element={
                  <>
                    <Header />
                    <OrdersTable />
                    <Footer />
                    {popup && <Popup onClose={handleClosePopup}>{popup}</Popup>}
                    {loader && <Loader />}
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
