import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SectionHeader from "../../sectionHeader/SectionHeader";
import { useParams } from "react-router-dom";
import ProductsGallery from "../../ProductsGallery/ProductsGallery";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import SectionsBar from "../../SectionsBar/SectionsBar";
import NoProducts from "./NoProducts/NoProducts";

const CategoriesContainer = styled.div`
  display: flex;
  margin-top: 10px;
  .allCategories {
    font-variant: small-caps;
    color: #ce9124;
    padding: 10px;
    li {
      margin-top: 15px;
    }
  }
  .displayProducts {
    display: flex;
    margin: 10px 40px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    .allCategories {
      padding: 0px;
    }
    .displayProducts {
      justify-content: center;
      margin: 0px 0px;
    }
  }
`;

const AdminProducts = () => {
  const [sectionFilter, setSectionFilter] = useState("All categories");

  const allProducts = useSelector((state) => state.products);
  let categoryProducts = [];

  let section = useParams().section;

  const sections = ["women", "girls", "accessories"];

  if (section === "on-sale") {
    categoryProducts = allProducts.filter((item) => item.discount !== 0);
    section = "On Sale";
  } else if (sections.includes(section)) {
    categoryProducts = allProducts.filter((item) => item.section === section);
    section = section.charAt(0).toUpperCase() + section.slice(1);
  } else {
    section = "All Products";
    categoryProducts = allProducts;
  }

  const allCategories = categoryProducts.flatMap((obj) =>
    obj.category.map((item) => item.category),
  );
  let uniqueCategories = allCategories.filter(
    (category, index, array) => array.indexOf(category) === index,
  );
  uniqueCategories.unshift("All categories");

  console.log(uniqueCategories);

  let filteredProducts = categoryProducts;
  if (sectionFilter !== "All categories") {
    filteredProducts = categoryProducts.filter((item) =>
      item.category.map((item) => item.category).includes(sectionFilter),
    );
  }
  console.log(filteredProducts);

  return (
    <>
      <ScrollToTop />
      <SectionHeader text={section} />
      <SectionsBar />
      {filteredProducts.length === 0 ? (
        <NoProducts />
      ) : (
        <CategoriesContainer>
          <div className="allCategories">
            {uniqueCategories.length > 2 ? (
              <ul>
                {uniqueCategories.map((item) => (
                  <li key={item} onClick={() => setSectionFilter(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="displayProducts">
            <ProductsGallery products={filteredProducts} />
          </div>
        </CategoriesContainer>
      )}
    </>
  );
};

export default AdminProducts;
