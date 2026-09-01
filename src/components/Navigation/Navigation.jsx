import "./Navigation.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

function Navigation() {
  const { GROUPS } = useContext(ProductsContext);
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          {GROUPS.map((item) => {
            return (
              <li key={item._id} className="nav__item">
                <a className="nav__link" href={`#${item.name.toLowerCase()}`}>
                  {item.name.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
