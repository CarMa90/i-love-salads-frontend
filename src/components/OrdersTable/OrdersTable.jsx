import "./OrdersTable.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { api } from "../../utils/api";

function OrdersTable() {
  const { orders, getOrders } = useContext(ProductsContext);

  function handleOrderStatusChange(order) {
    const newStatus =
      order.status === "Enviado"
        ? "Aceptado"
        : order.status === "Aceptado"
          ? "Listo"
          : "Entregado";

    api
      .changeOrderStatus({ _id: order._id, status: newStatus })
      .then(() => getOrders());
  }

  return (
    <div className="orders-table">
      <div className="orders-table__content">
        <table className="orders-table__table">
          <thead className="orders-table__head">
            <tr className="orders-table__row">
              <th className="orders-table__header">Estatus</th>
              <th className="orders-table__header">Cliente</th>
              <th className="orders-table__header">Detalles</th>
              <th className="orders-table__header">Total</th>
              <th className="orders-table__header">No. Pedido</th>
            </tr>
          </thead>
          <tbody className="orders-table__body">
            {orders.map((order) => (
              <tr className="orders-table__row" key={order._id}>
                <td
                  className={
                    order.status === "Enviado"
                      ? "orders-table__cell orders-table__status-cell orders-table__status-enviado"
                      : order.status === "Aceptado"
                        ? "orders-table__cell orders-table__status-cell orders-table__status-aceptado"
                        : order.status === "Listo"
                          ? "orders-table__cell orders-table__status-cell orders-table__status-listo"
                          : "orders-table__cell orders-table__status-cell orders-table__status-entregado"
                  }
                  onClick={() => {
                    handleOrderStatusChange(order);
                  }}
                >
                  {order.status === "Enviado"
                    ? "Aceptar"
                    : order.status === "Aceptado"
                      ? "Preparando..."
                      : order.status === "Listo"
                        ? "Orden Lista"
                        : "Entregado"}
                </td>
                <td className="orders-table__cell">{order.client}</td>
                <td className="orders-table__cell orders-table__details-cell">
                  Detalles
                </td>
                <td className="orders-table__cell">
                  $
                  {order.products.reduce(
                    (accumulator, item) =>
                      accumulator + item.price * item.quantity,
                    0,
                  )}
                  mxn
                </td>
                <td className="orders-table__cell">{order._id}</td>
              </tr>
            ))}
            <tr className="orders-table__row" key="123456">
              <td className="orders-table__cell">Enviado</td>
              <td className="orders-table__cell">Carlos A Castro</td>
              <td className="orders-table__cell orders-table__details-cell">
                Detalles
              </td>
              <td className="orders-table__cell">$ 1000 mxn</td>
              <td className="orders-table__cell">1234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
