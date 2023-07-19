import styled from "styled-components";
import productsService from "../../../../services/productsService";
import categoryService from "../../../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../../reducers/productsReducer";
import { useNavigate } from "react-router-dom";
import Button from "../../../Button/Button";
import ButtonLink from "../../../ButtonLink/ButtonLink";
import ProductCard from "../../../ProductCard/ProductCard";

const AdminProductsContainer = styled.div`
  margin-top: 50px;
  .inline {
    display: flex;
    h2 {
      margin-right: 20px;
    }
  }
  h3 {
    margin-top: 30px;
  }
  .displayAllProducts {
    justify-content: center;
    margin: 30px;
  }
`;

const AdminProducts = () => {
  const user = useSelector((state) => state.user);
  productsService.setToken(user.token);
  categoryService.setToken(user.token);

  const allProducts = useSelector((state) => state.products);
  console.log("allProducts", allProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProduct = async (item) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${item.name}?`,
    );
    if (confirm) {
      await productsService.deleteProduct(item.id);
      dispatch(deleteProduct(item.id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-products/${id}`);
  };

  return (
    <>
      <AdminProductsContainer>
        <div className="inline">
          <h2>Products</h2>
          <ButtonLink url="/add-products" text="Add New Product" />
        </div>
        <h3>All products</h3>
        <div className="displayAllProducts">
          {allProducts.map((item) => {
            return (
              <div key={item.id}>
                <ProductCard key={item.id} product={item} />
                <Button onClick={() => handleEdit(item.id)} text="Edit" />
                <Button
                  onClick={() => handleDeleteProduct(item)}
                  text="Delete"
                />
              </div>
            );
          })}
        </div>
      </AdminProductsContainer>
    </>
  );
};

export default AdminProducts;
