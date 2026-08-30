import "./ErrorPopup.css";

function ErrorPopup({ error }) {
  return (
    <>
      <div className="popup-error__head">
        <h3 className="popup__title">Algo salió mal</h3>
      </div>
      <div className="popup-error__content">
        <div className="popup-error__message">{error}</div>
        <p>
          Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
          haya un problema de conexión o que el servidor no funcione. Por favor,
          inténtalo más tarde
        </p>
      </div>
    </>
  );
}

export default ErrorPopup;
