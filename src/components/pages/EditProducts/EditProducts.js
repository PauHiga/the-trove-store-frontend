import React, { useState } from 'react';
import productsService from '../../../services/productsService';
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../../reducers/productsReducer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CategoriesCheckboxes from '../../CategoriesCheckboxes/CategoriesCheckboxes';
import Button from '../../Button/Button';

const AddProductsForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 70vw;
  margin: 0 auto;
  .form-entry{
    margin-bottom: 1rem;
  }
  input{
    padding: 0.5rem;
    // border: 1px solid #ccc;
    border-radius: 4px;
  }
  .stock{
    display:flex;

  }
`;

const EditProducts = () => {

    const id = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    
    const currentProduct = useSelector(state => state.products.find(item => item.id === id))

    console.log(currentProduct);

    const state = useSelector(state => state.products)

    console.log("state", state);

    const arrayOfCategoriesID = currentProduct.category.map(item=> item.id)
    
console.log('currentProduct.category', currentProduct.category );
console.log('arrayOfCategoriesID', arrayOfCategoriesID );

  const [name, setName] = useState(currentProduct.name)
  const [featureImg, setFeatureImg] = useState('')
  const [description, setDescription] = useState(currentProduct.description)
  const [price, setPrice] = useState(currentProduct.price)
  const [stockU, setStockU] = useState(currentProduct.stock.U)
  const [stockS, setStockS] = useState(currentProduct.stock.S)
  const [stockM, setStockM] = useState(currentProduct.stock.M)
  const [stockL, setStockL] = useState(currentProduct.stock.L)
  const [stockXL, setStockXL] = useState(currentProduct.stock.XL)
  const [section, setSection] = useState(currentProduct.section)
  const [selectedCategories, setSelectedCategories] = useState(arrayOfCategoriesID)
  const [discount, setDiscount] = useState(currentProduct.discount)
  const [productWithSize, setProductWithSize] = useState(true)

  console.log('selectedCategories', selectedCategories );

  const allowProductWithSize = () => {
    setProductWithSize(true)
  }
  const allowProductWithUniqueSize = () => {
    setProductWithSize(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let stock = {}
    if (productWithSize) {
      stock = {"U":0, "S": stockS,"M": stockM,"L": stockL,"XL": stockXL }
    }
    else{
      stock = {"U": stockU, "S": 0,"M": 0,"L": 0,"XL": 0 }
    }

    const keysArray = Object.keys(stock)
    const stockLargerThanZero = keysArray.reduce((sum, item) => sum + stock[item], 0)

    if(name === '' || featureImg === '' || description=== ''|| stockLargerThanZero === 0){
      console.log("please fill name, featureImg, description and make stock larger than 0")
    }
    else{
      try {     
        productsService.setToken(user.token)

        let stock = {}

        if (productWithSize) {
          stock = {"U":0, "S": stockS,"M": stockM,"L": stockL,"XL": stockXL }
        }
        else{
          stock = {"U": stockU, "S": 0,"M": 0,"L": 0,"XL": 0 }
        }

        const formData  = new FormData();
        formData.append('name', name);
        formData.append('featureImg', featureImg);
        formData.append('imagePublicID', currentProduct.imagePublicID);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', JSON.stringify(stock));
        formData.append('section', section);
        formData.append('category', selectedCategories);
        formData.append('discount', discount);

        const editedProduct = await productsService.editProduct(formData, id);
        dispatch(editProduct(editedProduct))
        navigate('/user-section')
      } catch (error) {
        console.log(error);
      }
    }  
  };

  const handleCancel = () => {
    const confirm = window.confirm("Are you sure you want to cancel? No changes will be submitted")
    if(confirm){
      navigate('/user-section')
    }
  }

  console.log(selectedCategories)

  return (
    <div>
      <h2>Add New Product</h2>
      <AddProductsForm onSubmit={handleSubmit}>
        <div className="form-entry">
          <label htmlFor="name">Product name:</label>
          <input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-entry">
          <label htmlFor="featureImg">Image url:
          {featureImg ? featureImg.name : " Upload image"}
          <input
            type="file"
            id="featureImg"
            accept="image/*"
            onChange={(e) => setFeatureImg(e.target.files[0])}
            hidden
          />
          </label>
          <div>
            {featureImg &&
            <img src={URL.createObjectURL(featureImg)} alt="product_photo" height={'200px'} />
            }
          </div>
        </div>
        <div className="form-entry">
          <label htmlFor="description">Product description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-entry">
          <label htmlFor="price">Product price: (numbers only)</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="stock">
          <div className="stock-option" onClick={allowProductWithUniqueSize}>
            <div className="form-entry">
              <label htmlFor="stockU">Product stock: (numbers only)</label>
              <input
                disabled={productWithSize}
                type="text"
                id="price"
                value={stockU}
                onChange={(e) => setStockU(e.target.value)}
              />
            </div>
          </div>
          <div className="stock-option" onClick={allowProductWithSize}>
            <div className="form-entry">
              <label htmlFor="stockS">Product stock S: (numbers only)</label>
              <input
                disabled={!productWithSize}
                type="text"
                id="price"
                value={stockS}
                onChange={(e) => setStockS(e.target.value)}
              />
            </div>
            <div className="form-entry">
              <label htmlFor="stockS">Product stock M: (numbers only)</label>
              <input
                disabled={!productWithSize}
                type="text"
                id="price"
                value={stockM}
                onChange={(e) => setStockM(e.target.value)}
              />
            </div>
            <div className="form-entry">
              <label htmlFor="stockL">Product stock L: (numbers only)</label>
              <input
                disabled={!productWithSize}              
                type="text"
                id="price"
                value={stockL}
                onChange={(e) => setStockL(e.target.value)}
              />
            </div>
            <div className="form-entry">
              <label htmlFor="stockXL">Product stock XL: (numbers only)</label>
              <input
                disabled={!productWithSize}              
                type="text"
                id="price"
                value={stockXL}
                onChange={(e) => setStockXL(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-entry">
          <label htmlFor="Section">Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="women">Women</option>
            <option value="girls">Girls</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="form-entry">
          <label htmlFor="selectedCategories">Select categories:</label>
          <CategoriesCheckboxes selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </div>
        <div className="form-entry">
          <div>
          <label htmlFor="name">Discount: (numbers only)</label>

          </div>
          <input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <Button type="submit" text="Edit product"/>
        <Button text="Cancel" onClick={()=> handleCancel}/>
      </AddProductsForm>

    </div>
  );
};

export default EditProducts
