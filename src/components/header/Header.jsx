import logo from "../../assets/logo.svg";
import profileIcon from "../../assets/user-icon.svg";
import CartPopup from "../Popup/CartPopup/CartPopup";
import UserInfoPopup from "../Popup/UserInfoPopup/UserInfoPopup";
import "./Header.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { ShoppingCart } from "lucide-react";

function Header({ children, administrador }) {
  const { handleOpenPopup, cartItems } = useContext(ProductsContext);

  const cartPopup = <CartPopup />;
  const userInfoPopup = <UserInfoPopup />;

  let itemsQuantity = 0;

  cartItems.forEach((item) => (itemsQuantity += item.quantity));

  return (
    <>
      <header className="header">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="logo i love salads" />
          <div className="header__icons">
            {administrador === false && (
              <>
                <button
                  className="header__button"
                  onClick={() => {
                    handleOpenPopup(userInfoPopup);
                  }}
                >
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
                  <ShoppingCart className="header__cart-icon" size={20} />
                  {itemsQuantity > 0 && (
                    <div className="header__button-info">{itemsQuantity}</div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        {children}
      </header>
    </>
  );
}

export default Header;
