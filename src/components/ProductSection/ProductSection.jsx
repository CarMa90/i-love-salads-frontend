import "./ProductSection.css";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import Card from "./Card/Card";

function ProductSection() {
  const { groups, products } = useContext(ProductsContext);
  console.log(groups, products);

  return (
    <>
      {groups.map((item) => {
        return (
          <section
            key={item._id}
            id={item.name.toLowerCase()}
            className="product-section"
          >
            <h2 className="product-section__title">
              {item.name.toUpperCase()}
            </h2>
            <div className="product-section__content">
              {products.map((product) => {
                return (
                  product.type === item.name && (
                    <Card key={product._id} product={product} />
                  )
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}

export default ProductSection;
