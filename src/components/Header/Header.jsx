import logo from "../../assets/logo.svg";
import "./Header.css";

function Header({ children, secondaryComponent }) {
  return (
    <>
      <header className="header">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="logo i love salads" />
          <div className="header__icons">{secondaryComponent}</div>
        </div>
        {children}
      </header>
    </>
  );
}

export default Header;
