import logo from "../../assets/logo.svg";
import profileIcon from "../../assets/user-icon.svg";
import cartIcon from "../../assets/shopping-cart.svg";
import "./Header.css";

function Header() {
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
            <button className="header__button">
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
