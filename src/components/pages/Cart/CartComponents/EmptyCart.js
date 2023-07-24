import styled from "styled-components";
import ButtonLink from "../../../ButtonLink/ButtonLink";

const StyledEmptyCart = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-height: 55vh;
  font-variant: small-caps;
  color: #ce9124;
  align-items: center;
  justify-content: center;
`;

const EmptyCart = () => {
  return (
    <StyledEmptyCart>
      <h3>The cart is empty</h3>
      <ButtonLink url="/category/all-products" text="Go Shopping" />
    </StyledEmptyCart>
  );
};

export default EmptyCart;
