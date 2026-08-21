import "./Card.css";
import cartIcon from "../../../assets/shopping-cart.svg";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";

function Card({ product }) {
  const { setCartItems } = useContext(ProductsContext);

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

  return (
    <>
      <div className="card">
        <img className="card__image" src={product.image} alt={product.name} />
        <h3 className="card__title">{product.name}</h3>
        <p className="card__description">{product.description}</p>
        <div>
          <p className="card__price">${product.price}mxn</p>
          <button
            className="card__cart-button"
            onClick={() => {
              handleAddItemToCart(product);
            }}
          >
            <img
              className="card__cart-svg"
              src={cartIcon}
              alt="Añade al carrito"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
