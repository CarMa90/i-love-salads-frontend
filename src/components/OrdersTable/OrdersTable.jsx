import "./OrdersTable.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

function OrdersTable() {
  const { orders, setOrders } = useContext(ProductsContext);
  const timestamp = 1787448767726;

  return (
    <div className="orders-table">
      <div className="orders-table__content">
        <table className="orders-table__table">
          <thead className="orders-table__head">
            <tr className="orders-table__row">
              <th className="orders-table__header">No. Pedido</th>
              <th className="orders-table__header">Cliente</th>
              <th className="orders-table__header">Total</th>
              <th className="orders-table__header">Fecha</th>
              <th className="orders-table__header">Hora</th>
              <th className="orders-table__header">Detalles</th>
              <th className="orders-table__header">Estatus</th>
            </tr>
          </thead>
          <tbody className="orders-table__body">
            {orders.map((order) => (
              <tr className="orders-table__row" key={order._id}>
                <td className="orders-table__cell">{order._id.slice(-4)}</td>
                <td className="orders-table__cell">{order.client}</td>
                <td className="orders-table__cell">
                  $
                  {order.products.reduce(
                    (accumulator, item) =>
                      accumulator + item.price * item.quantity,
                    0,
                  )}
                  mxn
                </td>
                <td className="orders-table__cell">{order.date}</td>
                <td className="orders-table__cell">{order.time}</td>
                <td className="orders-table__cell">Detalles</td>
                <td className="orders-table__cell">{order.status}</td>
              </tr>
            ))}
            <tr className="orders-table__row" key="123456">
              <td className="orders-table__cell">1234</td>
              <td className="orders-table__cell">Carlos A Castro</td>
              <td className="orders-table__cell">$ 1000 mxn</td>
              <td className="orders-table__cell">
                {new Date(timestamp).toLocaleDateString("es-MX")}
              </td>
              <td className="orders-table__cell">
                {new Date(timestamp).toLocaleTimeString("es-MX")}
              </td>
              <td className="orders-table__cell">Detalles</td>
              <td className="orders-table__cell">Enviado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
