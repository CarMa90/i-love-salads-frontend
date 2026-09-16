import "./CartPopup.css";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import UserInfoPopup from "../UserInfoPopup/UserInfoPopup";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { mainApi } from "../../../utils/MainApi";

function CartPopup() {
  const {
    cartItems,
    setCartItems,
    handleOpenPopup,
    handleClosePopup,
    getOrders,
    setLoader,
  } = useContext(ProductsContext);
  const userInfoPopup = <UserInfoPopup />;

  const cartTotal = cartItems.reduce((acumulador, itemActual) => {
    return acumulador + itemActual.price * itemActual.quantity;
  }, 0);

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

  const productsToOrder = cartItems.map((item) => {
    return {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      _id: item._id,
    };
  });

  function handleOrder(items) {
    if (items.length === 0) {
      setEmptyCart(() => {
        return true;
      });
      return console.warn("No puedes realizar un pedido sin productos!");
    }

    setLoader(true);

    // console.log(items);

    (async () => {
      mainApi
        .createOrder({
          products: items,
        })
        .then(async () => {
          setCartItems([]);
          await getOrders();
          handleClosePopup();
          handleOpenPopup(userInfoPopup);
        })
        .catch((err) => {
          // console.log(err);
          handleOpenPopup(<ErrorPopup error={err} />);
        })
        .finally(() => {
          setLoader(false);
        });
    })();
  }

  return (
    <>
      <div className="popup__cart-head">
        <div className="popup__cart-icon">
          <ShoppingCart />
        </div>
        <h3 className="popup__title">Carrito de compras:</h3>
      </div>
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
                <img
                  className="popup__cart-item-image"
                  src={item.image}
                  alt="producto"
                />
                <div className="popup__cart-item-info">
                  <div className="popup__cart-item-name">{item.name}</div>
                  <div className="popup__cart-item-price">{`${item.quantity} x $${item.price}mxn`}</div>
                </div>
                <button
                  className="popup__cart-delete-item-btn"
                  onClick={() => {
                    handleRemoveItem(item);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {cartItems.length > 0 && (
        <div className="popup__cart-total">
          <div className="popup__cart-total-text">Total</div>
          <div className="popup__cart-total-number">$ {cartTotal} mxn</div>
        </div>
      )}
      <div className="popup__cart-buttons">
        <button
          className="popup__cart-button popup__cart-delete-btn"
          onClick={() => {
            handleRemoveAll();
          }}
        >
          <Trash2 />
          <span>Borrar todo</span>
        </button>
        <button
          className="popup__cart-button"
          onClick={() => {
            handleOrder(productsToOrder);
          }}
        >
          <span>Ordenar</span>
          <ArrowRight />
        </button>
      </div>
    </>
  );
}

export default CartPopup;
