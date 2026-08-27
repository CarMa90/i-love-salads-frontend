import "./UserInfoPopup.css";
import "../Popup.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { LogOut, Handbag } from "lucide-react";

function UserInfoPopup() {
  const { currentUser } = useContext(UserContext);
  const { orders } = useContext(ProductsContext);

  const pendingOrders = orders.filter(
    (order) =>
      order.clientId === currentUser._id && order.status !== "Entregado",
  );

  return (
    <>
      <h3 className="popup__title">Hola, {currentUser.name} 👋🏼</h3>
      <div className="popup__user-content">
        <h4 className="popup__subtitle">Pedidos en curso</h4>
        <ul className="popup__user-list">
          {pendingOrders.map((order) => {
            return (
              order.status !== "Entregado" && (
                <li key={order._id} className="popup__user-item">
                  <div>
                    <div className="popup__user-shopping-bag">
                      <Handbag />
                    </div>
                    <div className="popup__user-order-info">
                      <div className="popup__user-order-number">
                        Pedido # {order._id}{" "}
                      </div>
                      <div className="popup__user-order-time">
                        Realizado a las {order.time}
                      </div>
                    </div>
                  </div>
                  {order.status === "Enviado" ? (
                    <span className="popup__user-enviado">Enviado</span>
                  ) : order.status === "Aceptado" ? (
                    <span className="popup__user-aceptado">En preparación</span>
                  ) : order.status === "Listo" ? (
                    <span className="popup__user-listo">Orden lista</span>
                  ) : null}
                </li>
              )
            );
          })}
        </ul>
      </div>
      <div className="popup__user-buttons">
        <button className="popup__user-logout-btn">
          <LogOut /> <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );
}

export default UserInfoPopup;
