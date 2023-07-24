import styled from "styled-components";
import ButtonLink from "../../../ButtonLink/ButtonLink";

const StylizedNoProducts = styled.div`
  display: flex;
  height: 70vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NoProducts = () => {
  return (
    <StylizedNoProducts>
      <div>There are currently no products for this category</div>
      <ButtonLink url="/category/all-products" text="Keep Shopping" />
    </StylizedNoProducts>
  );
};

export default NoProducts;
