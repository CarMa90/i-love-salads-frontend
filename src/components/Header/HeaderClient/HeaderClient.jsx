import { ShoppingCart, User, KeyRound } from "lucide-react";
import profileIcon from "../../../assets/user-icon.svg";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { UserContext } from "../../../contexts/UserContext";
import CartPopup from "../../Popup/CartPopup/CartPopup";
import UserInfoPopup from "../../Popup/UserInfoPopup/UserInfoPopup";

function HeaderClient() {
  const { handleOpenPopup, cartItems } = useContext(ProductsContext);
  const { isLoggedIn, navigateToSignin } = useContext(UserContext);

  function handleNavigateToSignin() {
    navigateToSignin();
  }

  const cartPopup = <CartPopup />;
  const userInfoPopup = <UserInfoPopup />;

  let itemsQuantity = 0;

  cartItems.forEach((item) => (itemsQuantity += item.quantity));

  return (
    <>
      {isLoggedIn ? (
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
      ) : (
        <button
          className="header__button header__button-login"
          onClick={handleNavigateToSignin}
        >
          <KeyRound size={16} /> Iniciar sesión
        </button>
      )}
      <button
        className="header__button header__cart-button"
        onClick={() => {
          handleOpenPopup(cartPopup);
        }}
      >
        <ShoppingCart className="header__cart-icon" size={20} />
        {itemsQuantity > 0 && (
          <div className="header__button-info">{itemsQuantity}</div>
        )}
      </button>
    </>
  );
}

export default HeaderClient;
