import "./ProductionOrder.css";

function ProductionOrder({ contentRef, order }) {
  return (
    <div className="print__content" ref={contentRef}>
      <h3 className="print__title">Orden # {order._id}</h3>
      <div className="print__order-info">
        <div>Fecha:</div>
        <div>{order.date}</div>
        <div>{order.time}</div>
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
