import "./ProductSection.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import Card from "./Card/Card";

function ProductSection() {
  const { GROUPS, PRODUCTS } = useContext(ProductsContext);

  return (
    <>
      {GROUPS.map((item) => {
        return (
          <section
            key={item._id}
            id={item.name.toLowerCase()}
            className="product-section"
          >
            <div className="product-section__content">
              <h2 className="product-section__title">
                {item.name.toUpperCase()}
              </h2>
              <div className="product-section__grid">
                {PRODUCTS.map((product) => {
                  return (
                    product.type === item.name && (
                      <Card key={product._id} product={product} />
                    )
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default ProductSection;
