import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authorize } from "../../utils/auth";

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(data);

    authorize(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
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
