import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { UserContext } from "../../../contexts/UserContext";
import trashCan from "../../../assets/delete-icon.svg";
import UserInfoPopup from "../UserInfoPopup/UserInfoPopup";

function CartPopup() {
  const {
    cartItems,
    setCartItems,
    setOrders,
    handleOpenPopup,
    handleClosePopup,
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

  function handleOrder(items) {
    const timestamp = Date.now();

    setOrders((prevOrders) => {
      return [
        ...prevOrders,
        {
          products: items,
          client: currentUser.name,
          clientId: currentUser._id,
          _id: timestamp.toString(),
          date: new Date(timestamp).toLocaleDateString("es-MX"),
          time: new Date(timestamp).toLocaleTimeString("es-MX"),
          status: "Enviado",
        },
      ];
    });
    setCartItems([]);
    handleClosePopup();
    handleOpenPopup(userInfoPopup);
  }

  return (
    <>
      <h3 className="popup__title">Carrito de compras:</h3>
      <div className="popup__cart-content">
        <ul className="popup__cart-list">
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
