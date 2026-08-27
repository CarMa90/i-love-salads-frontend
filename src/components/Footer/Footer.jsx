import { Clock, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo.svg";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>
          <img className="footer__logo" src={logo} alt="i love salads" />
          <p className="footer__message">
            Ensaladas, sopas y baguettes preparadas al momento con ingredientes
            frescos.
          </p>
        </div>
        <div className="footer__info">
          <div className="footer__group">
            <MapPin size="var(--step-0)" color="var(--dark-green)" />
            <div>
              <p className="footer__text">Sucursal Forjadores</p>
              <p className="footer__subtext">
                Blvd. Forjadores de Sudcalifornia
              </p>
            </div>
          </div>
          <div className="footer__group">
            <Clock size="var(--step-0)" color="var(--dark-green)" />
            <div>
              <p className="footer__text">Horario:</p>
              <p className="footer__subtext">Lun a Dom, 10:00 - 21:00</p>
            </div>
          </div>
          <div className="footer__group">
            <Phone size="var(--step-0)" color="var(--dark-green)" />
            <div>
              <p className="footer__text">Teléfono:</p>
              <p className="footer__subtext">258 106 7042</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
