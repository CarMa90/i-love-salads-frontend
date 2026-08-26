import "./CartPopup.css";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { UserContext } from "../../../contexts/UserContext";
import trashCan from "../../../assets/delete-icon.svg";
import UserInfoPopup from "../UserInfoPopup/UserInfoPopup";
import { api } from "../../../utils/api";

function CartPopup() {
  const {
    cartItems,
    setCartItems,
    orders,
    setOrders,
    handleOpenPopup,
    handleClosePopup,
    getOrders,
  } = useContext(ProductsContext);
  const { currentUser } = useContext(UserContext);
  const userInfoPopup = { children: <UserInfoPopup /> };

  function handleRemoveItem(item) {
    setCartItems((prevItems) => {
      return prevItems
        .map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: 0 } : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0);
    });
  }

  function handleRemoveAll() {
    setCartItems([]);
  }

  const [emptyCart, setEmptyCart] = useState(false);

  function handleOrder(items) {
    if (items.length === 0) {
      setEmptyCart(() => {
        return true;
      });
      return console.warn("No puedes realizar un pedido sin productos!");
    }

    const timestamp = Date.now();

    (async () => {
      api
        .getNewOrder({
          products: items,
          client: currentUser.name,
          clientId: currentUser._id,
          date: new Date(timestamp).toLocaleDateString("es-MX"),
          time: new Date(timestamp).toLocaleTimeString("es-MX"),
          status: "Enviado",
        })
        .then((newOrder) => {
          setOrders([newOrder, ...orders]);
          setCartItems([]);
          getOrders();
          handleClosePopup();
          handleOpenPopup(userInfoPopup);
        });
    })();
  }

  return (
    <>
      <h3 className="popup__title">Carrito de compras:</h3>
      <div className="popup__cart-content">
        <ul className="popup__cart-list">
          {cartItems.length === 0 && emptyCart === true && (
            <li className="popup__cart-item popup__cart-item-empty-cart">
              Debes añadir productos para poder realizar tu pedido
            </li>
          )}
          {cartItems.map((item) => {
            return (
              <li key={item._id} className="popup__cart-item">
                {`${item.quantity} x ${item.name} total: $${item.quantity * item.price}mxn`}{" "}
                <button
                  className="popup__cart-delete-item-btn"
                  onClick={() => {
                    handleRemoveItem(item);
                  }}
                >
                  <img src={trashCan} alt="eliminar" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="popup__cart-buttons">
        <button
          className="popup__cart-button popup__cart-delete-btn"
          onClick={() => {
            handleRemoveAll();
          }}
        >
          Borrar todo
        </button>
        <button
          className="popup__cart-button"
          onClick={() => {
            handleOrder(cartItems);
          }}
        >
          Ordenar
        </button>
      </div>
    </>
  );
}

export default CartPopup;
