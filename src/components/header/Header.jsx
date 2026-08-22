import logo from "../../assets/logo.svg";
import profileIcon from "../../assets/user-icon.svg";
import cartIcon from "../../assets/shopping-cart.svg";
import CartPopup from "../Popup/CartPopup/CartPopup";
import "./Header.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

function Header({ children }) {
  const { handleOpenPopup, cartItems } = useContext(ProductsContext);

  const cartPopup = { children: <CartPopup /> };

  let itemsQuantity = 0;

  cartItems.forEach((item) => (itemsQuantity += item.quantity));

  console.log(itemsQuantity);

  return (
    <>
      <header className="header">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="logo i love salads" />
          <div className="header__icons">
            <button className="header__button">
              <img
                src={profileIcon}
                alt="user icon"
                className="header__user-icon"
              />
            </button>
            <button
              onClick={() => {
                handleOpenPopup(cartPopup);
              }}
              className="header__button header__cart-button"
            >
              <img
                src={cartIcon}
                alt="cart icon"
                className="header__cart-icon"
              />
              {itemsQuantity > 0 && (
                <div className="header__button-info">{itemsQuantity}</div>
              )}
            </button>
          </div>
        </div>
        {children}
      </header>
    </>
  );
}

export default Header;
