import "./Register.css";
import { useState } from "react";
import { register } from "../../utils/auth";
import { COUNTRIES } from "../../constants/index";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function Register() {
  const { setIsOpen, setSuccess, setErrorMessage } = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: { countryCode: "", phone: "" },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    if (name === "countryCode" || name === "phone") {
      setData((prevData) => ({
        ...prevData,
        mobile: {
          ...prevData.mobile,
          [name]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    }
    if (!data.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!data.mobile.countryCode) {
      newErrors.countryCode = "Selecciona un país";
    }
    if (!data.mobile.phone.trim()) {
      newErrors.phone = "El número de celular es requerido";
    }
    if (!data.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (data.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(data);
    register(data)
      .then(() => {
        console.log("registro exitoso");
        setIsOpen(true);
        setSuccess(true);
      })
      .catch((err) => {
        setIsOpen(true);
        setSuccess(false);
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      <InfoTooltip />
      <div className="register">
        <div className="register__content">
          <h3 className="register__title">Regístrate</h3>
          <form
            className="register__form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="register__label-input">
              <label className="register__label" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="register__input register__input_type_email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                type="email"
                required
                value={data.email}
                onChange={handleChange}
              />
              <span className="register__error-message email-error-message">
                {errors.email}
              </span>
            </div>
            <div className="register__label-input">
              <label className="register__label" htmlFor="name">
                Nombre
              </label>
              <input
                className="register__input register__input_type_name"
                id="name"
                name="name"
                placeholder="Nombre"
                type="text"
                required
                value={data.name}
                onChange={handleChange}
              />
              <span className="register__error-message name-error-message">
                {errors.name}
              </span>
            </div>
            <div>
              <div className="register__mobile">
                <div className="register__label-input">
                  <label className="register__label" htmlFor="countryCode">
                    País
                  </label>
                  <select
                    name="countryCode"
                    id="countryCode"
                    value={data.mobile.countryCode}
                    onChange={handleChange}
                    className="register__input register__input_type_country-code"
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {COUNTRIES.map((country) => {
                      return (
                        <option key={country.code} value={country.dialCode}>
                          {country.code} {country.flag}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="register__label-input register__label-input_phone">
                  <label className="register__label" htmlFor="phone">
                    Celular
                  </label>
                  <input
                    className="register__input register__input_type_phone"
                    id="phone"
                    name="phone"
                    placeholder="Celular"
                    type="text"
                    required
                    value={data.mobile.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <span className="register__error-message mobile-error-message">
                {errors.phone}
              </span>
            </div>
            <div className="register__label-input">
              <label className="register__label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="register__input register__input_type_password"
                id="password"
                name="password"
                placeholder="Contraseña"
                type="password"
                minLength={8}
                maxLength={12}
                required
                value={data.password}
                onChange={handleChange}
              />
              <span className="register__error-message password-error-message">
                {errors.password}
              </span>
            </div>
            <button className="button register__button" type="submit">
              Regístrate
            </button>
            <p className="register__paragraph">
              Ya tienes una cuenta con nosotros{" "}
              <Link to="/signin">inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
