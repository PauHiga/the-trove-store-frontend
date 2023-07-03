import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledSectionsBar = styled.div`
  display:flex;
  justify-content: space-around;
  font-size:23px;
  font-variant: small-caps;
  color: #ce9124;
  padding: 5px;
  width:100%;
  `;

  const SectionsBar = () => {
   return (
    <StyledSectionsBar>
      <Link to="/category/women">Women</Link>
      <Link to="/category/girls">Girls</Link>
      <Link to="/category/accessories">Accessories</Link>
      <Link to="/category/on-sale">On Sale</Link>
    </StyledSectionsBar>
  );
};

export default SectionsBar
