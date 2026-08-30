import "./CanceledOrdersPopup.css";
import "../Popup.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { TicketX } from "lucide-react";
import { api } from "../../../utils/api";

function CanceledOrdersPopup() {
  const { currentUser } = useContext(UserContext);
  const { canceledOrders, getOrders, handleClosePopup } =
    useContext(ProductsContext);

  const handelAcceptCancelation = (data) => {
    api
      .changeOrderStatus({ _id: data._id, cancelAcceptance: true })
      .then(() => {
        getOrders();
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h3 className="popup__title">Hola, {currentUser.name} 👋🏼</h3>
      <div className="popup-canceled__content">
        <h4 className="popup__subtitle">Pedidos cancelados</h4>
        <ul className="popup-canceled__list">
          {canceledOrders.map((order) => {
            return (
              <li key={order._id} className="popup-canceled__item">
                <div>
                  <div className="popup-canceled__icon">
                    <TicketX />
                  </div>
                  <div className="popup-canceled__order-info">
                    <div className="popup-canceled__order-number">
                      Tu pedido # {order._id} fue cancelado
                    </div>
                    <div className="popup-canceled__motive">
                      motivo: {order.cancelMessage}
                    </div>
                  </div>
                </div>
                <span
                  className="popup__user-enviado"
                  onClick={() => {
                    handelAcceptCancelation({ _id: order._id });
                  }}
                >
                  Aceptar
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CanceledOrdersPopup;
