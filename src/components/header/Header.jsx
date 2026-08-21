import logo from "../../assets/logo.svg";
import profileIcon from "../../assets/user-icon.svg";
import cartIcon from "../../assets/shopping-cart.svg";
import CartPopup from "../Popup/CartPopup/CartPopup";
import "./Header.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

function Header() {
  const { handleOpenPopup } = useContext(ProductsContext);

  const cartPopup = { children: <CartPopup /> };

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
              className="header__button"
            >
              <img
                src={cartIcon}
                alt="cart icon"
                className="header__cart-icon"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
