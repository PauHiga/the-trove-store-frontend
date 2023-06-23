import React, { useState } from 'react';
import productsService from '../../services/productsService';
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../reducers/productsReducer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CategoriesCheckboxes from '../../components/CategoriesCheckboxes/CategoriesCheckboxes';

const EditProductsForm = styled.form`
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
  border: 1px solid #ccc;
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

const EditProducts = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    
    // const currentProduct = useSelector(state => state.products)
    // const currentProduct = useSelector(state => state.products.find(item => item.id === id))
    const currentProduct = useSelector(state => state.products.name)
    console.log(currentProduct)
    
  const [name, setName] = useState(currentProduct.name)
  const [featureImg, setFeatureImg] = useState(currentProduct.featureImg)
  // const [galleryImg, setGalleryImg] = useState(currentProduct.galleryImg)
  const [description, setDescription] = useState(currentProduct.description)
  const [descriptionL, setDescriptionL] = useState(currentProduct.descriptionL)
  const [price, setPrice] = useState(currentProduct.price)
  const [stockS, setStockS] = useState(currentProduct.stockS)
  const [stockM, setStockM] = useState(currentProduct.stockM)
  const [stockL, setStockL] = useState(currentProduct.stockL)
  const [stockXL, setStockXL] = useState(currentProduct.stockXL)
  const [section, setSection] = useState(currentProduct.section)
  const [selectedCategories, setSelectedCategories] = useState(currentProduct.category)
  const [discount, setDiscount] = useState(currentProduct.discount)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {     
      productsService.setToken(user.token)

      const productToEdit = {
        name: name,
        featureImg: featureImg,
        description: description,
        price: price,
        stock: {
          "S": stockS,
          "M": stockM,
          "L": stockL,
          "XL": stockXL
      },
        section: section,
        category: selectedCategories,
        discount:discount,
      }
      const editedProduct = await productsService.editProduct(productToEdit, id);
      dispatch(editProduct(productToEdit))
      console.log("editedProduct", editedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm("Are you sure you want to cancel? No changes will be submitted")
    if(confirm){
      navigate('/admin-section')
    }
  }

  return (
  
    <div>
      <h2>Edit Product</h2>
      <EditProductsForm onSubmit={handleSubmit}>
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
          <Label htmlFor="featureImg">Image url:</Label>
          <Input
            type="text"
            id="featureImg"
            value={featureImg}
            onChange={(e) => setFeatureImg(e.target.value)}
          />
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
          <Label htmlFor="selectedCategories">selectedCategories:</Label>
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
        <SubmitButton type="submit">Edit product</SubmitButton>
        <SubmitButton type="button" onClick={handleCancel}>Cancel</SubmitButton>
      </EditProductsForm>

    </div>

  );
};

export default EditProducts
