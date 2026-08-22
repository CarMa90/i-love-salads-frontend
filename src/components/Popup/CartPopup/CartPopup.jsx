import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import trashCan from "../../../assets/delete-icon.svg";

function CartPopup() {
  const { cartItems, setCartItems } = useContext(ProductsContext);

  function handleRemoveItem(item) {
    setCartItems((prevItems) => {
      return prevItems
        .map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0);
    });
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
        <button className="popup__cart-button popup__cart-delete-btn">
          Borrar todo
        </button>
        <button className="popup__cart-button">Ordenar</button>
      </div>
    </>
  );
}

export default CartPopup;
