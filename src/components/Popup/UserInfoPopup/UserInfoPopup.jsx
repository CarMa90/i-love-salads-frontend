import "../Popup.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";

function UserInfoPopup() {
  const { currentUser } = useContext(UserContext);
  const { orders } = useContext(ProductsContext);

  const pendingOrders = orders.filter(
    (order) =>
      order.clientId === currentUser._id && order.status !== "Entregado",
  );

  return (
    <>
      <h3 className="popup__title">Hola {currentUser.name}</h3>
      <div className="popup__user-content">
        <h4 className="popup__subtitle">Pedidos en curso:</h4>
        <ul className="popup__user-list">
          {pendingOrders.map((order) => {
            return (
              <li key={order.id} className="popup__user-item">
                Pedido: {order.id.slice(-4)}{" "}
                {order.status === "Enviado" ? (
                  <span className="popup__user-enviado">Enviado</span>
                ) : order.status === "Aceptado" ? (
                  <span className="popup__user-aceptado">En preparación</span>
                ) : order.status === "Listo" ? (
                  <span className="popup__user-listo">Orden lista</span>
                ) : (
                  "Estatus desconocido"
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="popup__user-buttons">
        <button className="popup__user-logout-btn">Cerrar sesión</button>
      </div>
    </>
  );
}

export default UserInfoPopup;
