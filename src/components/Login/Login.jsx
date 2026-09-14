import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../utils/auth";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { setToken } from "../../utils/token";
import { mainApi } from "../../utils/MainApi";
import { useFormAndValidation } from "../../hooks/useFormAndValidations";

function Login() {
  const {
    setIsOpen,
    setSuccess,
    setErrorMessage,
    setIsLoggedIn,
    setCurrentUser,
  } = useContext(UserContext);

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    authorize(values)
      .then(async (res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        const userInfoRes = await mainApi.getUserInfo();
        const userData = userInfoRes.data;
        setCurrentUser(userData);
        if (
          userData.userType === "admin" ||
          userData.userType === "restaurant"
        ) {
          navigate("/backoffice");
        } else if (userData.userType === "client") {
          navigate("/");
        }
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
      <div className="login">
        <div className="login__content">
          <h3 className="login__title">Iniciar sesión</h3>
          <form
            className="login__form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="login__label-input">
              <label className="login__label" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="login__input login__input_type_email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                type="email"
                required
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className="login__error-message email-error-message">
                {errors.email}
              </span>
            </div>
            <div className="login__label-input">
              <label className="login__label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="login__input login__input_type_password"
                id="password"
                name="password"
                placeholder="Contraseña"
                type="password"
                minLength={8}
                maxLength={12}
                required
                pattern={
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
                }
                title="El password debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"
                value={values.password || ""}
                onChange={handleChange}
              />
              <span className="login__error-message password-error-message">
                {errors.password}
              </span>
            </div>
            <button
              className="button login__button"
              type="submit"
              disabled={!isValid}
            >
              Iniciar sesión
            </button>
            <p className="login__paragraph">
              Aún no tienes cuenta con nosotros{" "}
              <Link to="/signup">regístrate</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
