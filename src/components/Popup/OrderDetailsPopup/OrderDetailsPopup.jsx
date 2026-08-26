import "./OrderDetailsPopup.css";
import { Printer, MessageCircle, X } from "lucide-react";

function OrderDetailsPopup({ order }) {
  return (
    <>
      <div className="popup-details__header">
        <div className="popup-details__order-basic">
          <div className="popup-details__order-client">
            Cliente: {order.client}
          </div>
          <div className="popup-details__order-number">
            Orden No. {order._id}
          </div>
        </div>
        <div className="popup-details__order-date">
          <div className="popup-details__order-date">Fecha: {order.date}</div>
          <div className="popup-details__order-hour">Hora: {order.time}</div>
        </div>
      </div>
      <ul className="popup-details__order-list">
        {order.products.map((item) => {
          return (
            <li key={item._id} className="popup-details__order-product">
              {item.quantity} x {item.name}
            </li>
          );
        })}
      </ul>
      <div className="popup-details__buttons">
        <button className="popup-details__button popup-details__button-print">
          <Printer />
        </button>
        <button className="popup-details__button popup-details__button-message">
          <MessageCircle />
        </button>
        <button className="popup-details__button popup-details__button-cancel">
          <X />
        </button>
      </div>
    </>
  );
}

export default OrderDetailsPopup;
