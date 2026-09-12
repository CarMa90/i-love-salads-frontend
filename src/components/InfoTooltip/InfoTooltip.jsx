import "./InfoTooltip.css";
import { CircleX, CircleCheckBig, X } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function InfoTooltip() {
  const { success, isOpen, setIsOpen, errorMessage } = useContext(UserContext);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`info-tooltip ${isOpen && "info-tooltip_is-opened"}`}>
      <div className="info-tooltip__content">
        <button
          aria-label="Cerrar ventana emergente"
          className="info-tooltip__close"
          type="button"
          onClick={handleClose}
        >
          <X />
        </button>
        {success ? (
          <CircleCheckBig size={48} className="info-tooltip__icon-success" />
        ) : (
          <CircleX size={48} className="info-tooltip__icon-fail" />
        )}
        <h3 className="info-tooltip__title">
          {success ? "¡Correcto! Ya estás registrado." : errorMessage}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
