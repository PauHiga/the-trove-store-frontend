import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import productsService from '../../../services/productsService';
import { createProduct } from '../../../reducers/productsReducer';
import CategoriesCheckboxes from '../../CategoriesCheckboxes/CategoriesCheckboxes';

const AddProductsForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  // border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddProducts = () => {
  const [name, setName] = useState('')
  const [featureImg, setFeatureImg] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stockU, setStockU] = useState(0)
  const [stockS, setStockS] = useState(0)
  const [stockM, setStockM] = useState(0)
  const [stockL, setStockL] = useState(0)
  const [stockXL, setStockXL] = useState(0)
  const [section, setSection] = useState('women')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [discount, setDiscount] = useState(0)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      productsService.setToken(user.token)

      const stock = {"S": stockS,"M": stockM,"L": stockL,"XL": stockXL }

      const formData  = new FormData();
      formData.append('name', name);
      formData.append('featureImg', featureImg);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', JSON.stringify(stock));
      formData.append('section', section);
      formData.append('category', selectedCategories);
      formData.append('discount', discount);
      
      const createdProduct = await productsService.createProduct(formData);
      dispatch(createProduct(createdProduct))
      console.log("createdProduct", createdProduct);
    } catch (error) {
      console.log(error);
    }  
    
  };
  
  console.log(featureImg);
  return (
    <div>
      <h2>Add New Product</h2>
      <AddProductsForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Product name:</Label>
          <Input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="featureImg">Image url:
          {featureImg ? featureImg.name : " Upload image"}
          <Input
            type="file"
            id="featureImg"
            accept="image/*"
            onChange={(e) => setFeatureImg(e.target.files[0])}
            hidden
          />
          </Label>
          <div>
            {featureImg &&
            <img src={URL.createObjectURL(featureImg)} alt="product_photo" height={'200px'} />
            }
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Product description:</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Product price: (numbers only)</Label>
          <Input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
          <FormGroup>
            <Label htmlFor="stockS">Product stock S: (numbers only)</Label>
            <Input
              type="text"
              id="price"
              value={stockS}
              onChange={(e) => setStockS(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="stockS">Product stock M: (numbers only)</Label>
            <Input
              type="text"
              id="price"
              value={stockM}
              onChange={(e) => setStockM(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="stockL">Product stock L: (numbers only)</Label>
            <Input
              type="text"
              id="price"
              value={stockL}
              onChange={(e) => setStockL(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="stockXL">Product stock XL: (numbers only)</Label>
            <Input
              type="text"
              id="price"
              value={stockXL}
              onChange={(e) => setStockXL(e.target.value)}
            />
          </FormGroup>
        <FormGroup>
          <Label htmlFor="Section">Section</Label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="women">Women</option>
            <option value="girls">Girls</option>
            <option value="accessories">Accessories</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="selectedCategories">Select categories:</Label>
          <CategoriesCheckboxes selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </FormGroup>
        <FormGroup>
          <div>
          <Label htmlFor="name">Discount: (numbers only)</Label>

          </div>
          <Input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">Add product</SubmitButton>
      </AddProductsForm>

    </div>

  );
};

export default AddProducts
