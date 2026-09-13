import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../utils/auth";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { setToken } from "../../utils/token";
import { mainApi } from "../../utils/MainApi";

function Login() {
  const {
    setIsOpen,
    setSuccess,
    setErrorMessage,
    setIsLoggedIn,
    setCurrentUser,
  } = useContext(UserContext);

  const { setLoader } = useContext(ProductsContext);

  const [data, setData] = useState({
    email: "",
    password: "",
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

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    }
    if (!data.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (data.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    authorize(data)
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
                value={data.email}
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
                value={data.password}
                onChange={handleChange}
              />
              <span className="login__error-message password-error-message">
                {errors.password}
              </span>
            </div>
            <button className="button login__button" type="submit">
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
