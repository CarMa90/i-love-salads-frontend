import "./CancelOrderPopup.css";
import { TicketX, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import OrderDetailsPopup from "../OrderDetailsPopup/OrderDetailsPopup";
import { validateRequiredText } from "../../../utils/formValidations";
import { api } from "../../../utils/api";

function CancelOrderPopup({ order }) {
  const { _id } = order;

  const { handleOpenPopup, handleClosePopup, getOrders, setLoader } =
    useContext(ProductsContext);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleCancelOrder(order, message) {
    const validationError = validateRequiredText(
      message,
      "Debes escribir un motivo de cancelación",
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    if (order.status === "Cancelado") {
      setError("Esta orden ya fue cancelada");
      return;
    }

    setError("");

    setLoader(true);

    api
      .changeOrderStatus({
        _id: order._id,
        status: "Cancelado",
        cancelMessage: message,
      })
      .then(() => {
        getOrders();
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

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
          required
          value={message}
          onChange={handleChange}
        ></textarea>
        {error && <span className="popup-cancel__error-message">{error}</span>}
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
              handleCancelOrder(order, message);
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
