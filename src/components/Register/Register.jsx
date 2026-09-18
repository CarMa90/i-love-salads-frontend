import "./Register.css";
import { authorize, register } from "../../utils/auth";
import { COUNTRIES } from "../../constants/index";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidations";
import { mainApi } from "../../utils/MainApi";
import { setToken } from "../../utils/token";

function Register() {
  const navigate = useNavigate();
  const {
    setIsOpen,
    setSuccess,
    setErrorMessage,
    setIsLoggedIn,
    setCurrentUser,
  } = useContext(UserContext);
  const { getOrders, setLoader } = useContext(ProductsContext);

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    name: "",
    mobile: { countryCode: "", phone: "" },
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    setLoader(true);

    try {
      await register(values);

      const authRes = await authorize({
        email: values.email,
        password: values.password,
      });
      setToken(authRes.token);
      setIsLoggedIn(true);

      const userInfoRes = await mainApi.getUserInfo();
      const userData = userInfoRes.data;
      setCurrentUser(userData);

      await getOrders();

      if (userData.userType === "admin" || userData.userType === "restaurant") {
        navigate("/backoffice");
      } else if (userData.userType === "client") {
        navigate("/");
      }
    } catch (err) {
      setLoader(false);
      setIsOpen(true);
      setSuccess(false);
      setErrorMessage(err.message || "Ocurrió un error durante el proceso");
    }
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
                value={values.email || ""}
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
                value={values.name || ""}
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
                    name="mobile.countryCode"
                    id="countryCode"
                    required
                    value={values.mobile?.countryCode || ""}
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
                    name="mobile.phone"
                    placeholder="Celular"
                    type="tel"
                    required
                    value={values.mobile?.phone || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <span className="register__error-message mobile-error-message">
                {errors["mobile.countryCode"] || errors["mobile.phone"]}
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
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?':{}|<>_\\-]).{8,}"
                title="El password debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"
                value={values.password || ""}
                onChange={handleChange}
              />
              <span className="register__error-message password-error-message">
                {errors.password}
              </span>
            </div>
            <button
              className="button register__button"
              type="submit"
              disabled={!isValid}
            >
              Regístrate
            </button>
            <p className="register__paragraph">
              Quieres registrar un restaurante{" "}
              <Link to="/restaurant/signup">registralo aquí</Link>
            </p>
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
