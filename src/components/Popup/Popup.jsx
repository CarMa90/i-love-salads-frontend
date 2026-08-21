import "./Popup.css";
import closeIcon from "../../assets/close.svg";

function Popup(props) {
  const { onClose, children } = props;

  return (
    <>
      <div className="popup">
        <div className="popup__content">
          <button className="popup__close" onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Popup;
