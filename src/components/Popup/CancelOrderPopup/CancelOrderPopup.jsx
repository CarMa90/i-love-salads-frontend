import "./CancelOrderPopup.css";
import { TicketX, Trash2 } from "lucide-react";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import OrderDetailsPopup from "../OrderDetailsPopup/OrderDetailsPopup";

function CancelOrderPopup({ order }) {
  const { _id } = order;

  const { handleOpenPopup } = useContext(ProductsContext);

  return (
    <>
      <div className="popup-cancel__head">
        <div className="popup-cancel__icon">
          <TicketX size={36} />
        </div>
        <h3 className="popup-cancel__title">Cancelar Orden</h3>
        <p className="popup-cancel__text">
          Por favor, indica el motivo de cancelación de la orden {_id}
        </p>
      </div>
      <form className="popup-cancel__form">
        <label htmlFor="message" className="popup-cancel__label">
          Motivo de cancelación <span>*</span>
        </label>
        <textarea
          className="popup-cancel__textarea"
          name="message"
          id="message"
          placeholder="Escribe el motivo de la cancelación"
        ></textarea>
        <div className="popup-cancel__buttons">
          <button
            className="popup-cancel__button"
            onClick={(e) => {
              e.preventDefault();
              handleOpenPopup(<OrderDetailsPopup order={order} />);
            }}
          >
            Volver
          </button>
          <button
            className="popup-cancel__button popup-cancel__cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log("funcionó el prevent default");
            }}
          >
            <Trash2 size={20} />
            <span>Cancelar orden</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default CancelOrderPopup;
