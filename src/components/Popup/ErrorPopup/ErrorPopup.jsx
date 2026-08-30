import "./ErrorPopup.css";

function ErrorPopup({ error }) {
  return (
    <>
      <div className="popup-error__head">
        <h3 className="popup__title">Algo salió mal</h3>
      </div>
      <div className="popup-error__content">
        <div className="popup-error__message">{error}</div>
      </div>
    </>
  );
}

export default ErrorPopup;
