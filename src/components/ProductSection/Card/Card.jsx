import "./Card.css";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";

function Card({ product }) {
  const { setCartItems, cartItems } = useContext(ProductsContext);

  function handleAddItemToCart(item) {
    setCartItems((prevItems) => {
      // 1. Verificar si el producto ya está en el carrito
      const itemExists = prevItems.find(
        (cartItem) => cartItem._id === item._id,
      );

      if (itemExists) {
        // 2. Si existe, mapeamos el array e incrementamos la cantidad del producto duplicado
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      // 3. Si no existe, agregamos el nuevo producto al array con cantidad inicial de 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }

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

  const resultado = cartItems.find((item) => item._id === product._id);

  const renderizar = resultado ? (
    <>
      <button className="card__cart-button">
        <div
          className="card__minus-btn"
          onClick={() => {
            handleRemoveItem(product);
          }}
        >
          -
        </div>
        <div>{resultado.quantity}</div>
        <div
          className="card__plus-btn"
          onClick={() => {
            handleAddItemToCart(product);
          }}
        >
          +
        </div>
      </button>
    </>
  ) : (
    <button
      className="card__cart-button"
      onClick={() => {
        handleAddItemToCart(product);
      }}
    >
      Agregar +
    </button>
  );

  return (
    <>
      <div className="card">
        <img className="card__image" src={product.image} alt={product.name} />
        <h3 className="card__title">{product.name}</h3>
        <p className="card__description">{product.description}</p>
        <div>
          <p className="card__price">${product.price}mxn</p>
          {renderizar}
        </div>
      </div>
    </>
  );
}

export default Card;
