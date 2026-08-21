import "./Card.css";
import cartIcon from "../../../assets/shopping-cart.svg";

function Card({ product }) {
  return (
    <>
      <div className="card">
        <img className="card__image" src={product.image} alt={product.name} />
        <h3 className="card__title">{product.name}</h3>
        <p className="card__description">{product.description}</p>
        <div>
          <p className="card__price">${product.price}mxn</p>
          <button className="card__cart-button">
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
