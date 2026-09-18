import "./HeaderBackoffice.css";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

function HeaderBackoffice() {
  const { handleLogOut } = useContext(UserContext);

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
