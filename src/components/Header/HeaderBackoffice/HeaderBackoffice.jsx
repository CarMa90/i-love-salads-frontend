import "./HeaderBackoffice.css";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { removeToken } from "../../../utils/token";
import { useNavigate } from "react-router-dom";

function HeaderBackoffice() {
  const { handleClosePopup, setCurrentUser, setIsLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    handleClosePopup();
    setCurrentUser({});
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      <button className="header-backoffice__button" onClick={handleLogOut}>
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </>
  );
}

export default HeaderBackoffice;
