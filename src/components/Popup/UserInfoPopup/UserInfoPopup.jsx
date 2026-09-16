import "./UserInfoPopup.css";
import "../Popup.css";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { LogOut, Handbag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../utils/token";

function UserInfoPopup() {
  const { currentUser, setCurrentUser, setIsLoggedIn, handleClosePopup } =
    useContext(UserContext);
  const { orders } = useContext(ProductsContext);
  const navigate = useNavigate();

  // console.log(orders);

  const pendingOrders = orders.filter(
    (order) =>
      order.client._id === currentUser._id &&
      order.status !== "Entregado" &&
      order.status !== "Cancelado",
  );

  // console.log(pendingOrders);

  const handleLogOut = () => {
    handleClosePopup();
    setCurrentUser({});
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      <h3 className="popup__title">Hola, {currentUser.name} 👋🏼</h3>
      <div className="popup__user-content">
        <h4 className="popup-user__subtitle">Pedidos en curso</h4>
        <ul className="popup__user-list">
          {pendingOrders.map((order) => {
            const fecha = new Date(order.createdAt);
            const hora = String(fecha.getHours()).padStart(2, "0");
            const minutos = String(fecha.getMinutes()).padStart(2, "0");
            const time = `${hora}:${minutos}`;

            return (
              order.status !== "Entregado" &&
              order.status !== "Cancelado" && (
                <li key={order._id} className="popup__user-item">
                  <div>
                    <div className="popup__user-shopping-bag">
                      <Handbag />
                    </div>
                    <div className="popup__user-order-info">
                      <div className="popup__user-order-number">
                        Pedido # {order.orderNumber}{" "}
                      </div>
                      <div className="popup__user-order-time">
                        Realizado a las {time}
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
        <button className="popup__user-logout-btn" onClick={handleLogOut}>
          <LogOut /> <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );
}

export default UserInfoPopup;
