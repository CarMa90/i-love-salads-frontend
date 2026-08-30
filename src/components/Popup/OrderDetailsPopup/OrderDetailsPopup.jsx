import "./OrderDetailsPopup.css";
import { Printer, MessageCircle, X } from "lucide-react";
import { useContext, useRef } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import CancelOrderPopup from "../CancelOrderPopup/CancelOrderPopup";
import { useReactToPrint } from "react-to-print";
import ProductionOrder from "../../ProductionOrder/ProductionOrder";

function OrderDetailsPopup({ order }) {
  const { handleOpenPopup } = useContext(ProductsContext);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  function sendMessage(mobile) {
    const url = `https://api.whatsapp.com/send/?phone=${mobile}`;

    window.open(url, "_blank");
  }

  const cartTotal = order.products.reduce((acumulator, itemActual) => {
    return acumulator + itemActual.price * itemActual.quantity;
  }, 0);

  return (
    <>
      <ProductionOrder contentRef={contentRef} order={order} />
      <div className="popup-details__header">
        <p className="popup-details__subtext">Pedido</p>
        <p className="popup-details__order-number">No. {order._id}</p>
        <p className="popup-details__subtext">Cliente</p>
        <p className="popup-details__order-client">{order.client}</p>
        <p className="popup-details__order-mobile">{order.mobile.slice(-10)}</p>
      </div>
      <h3 className="popup-details__title">Detalles del pedido</h3>
      <ul className="popup-details__order-list">
        {order.products.map((item) => {
          return (
            <li key={item._id} className="popup-details__order-product">
              <div>
                {item.quantity} x {item.name}
              </div>
              <div>$ {item.quantity * item.price} mxn</div>
            </li>
          );
        })}
      </ul>
      <div className="popup-details__total">
        <div className="popup-details__total-text">Total</div>
        <div className="popup-details__total-number">$ {cartTotal} mxn</div>
      </div>
      <div className="popup-details__buttons">
        <button
          className="popup-details__button popup-details__button-print"
          onClick={() => {
            reactToPrintFn();
          }}
        >
          <Printer />
        </button>
        <button
          className="popup-details__button popup-details__button-message"
          onClick={() => {
            sendMessage(order.mobile);
          }}
        >
          <MessageCircle />
        </button>
        <button
          className="popup-details__button popup-details__button-cancel"
          onClick={() => {
            handleOpenPopup(<CancelOrderPopup order={order} />);
          }}
        >
          <X />
        </button>
      </div>
    </>
  );
}

export default OrderDetailsPopup;
