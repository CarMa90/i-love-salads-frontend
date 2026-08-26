import "./Popup.css";
import { useEffect } from "react";
import { X } from "lucide-react";

function Popup(props) {
  const { onClose, children } = props;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div className="popup" onClick={onClose}>
        <div
          className="popup__content"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="popup__close" onClick={onClose}>
            <X />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Popup;
