import "./ProductionOrder.css";

function ProductionOrder({ contentRef, order }) {
  const fullDate = new Date(order.createdAt);

  const date = fullDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = fullDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="print__content" ref={contentRef}>
      <h3 className="print__title">Orden # {order.orderNumber}</h3>
      <div className="print__order-info">
        <div>Fecha:</div>
        <div>{date}</div>
        <div>{time}</div>
      </div>
      <ul className="print__list">
        {order.products.map((item) => {
          return (
            <li className="print__item" key={item._id}>
              {item.quantity} X {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductionOrder;
