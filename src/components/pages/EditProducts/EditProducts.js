import React, { useState } from 'react';
import productsService from '../../../services/productsService';
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../../reducers/productsReducer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SectionHeader from '../../sectionHeader/SectionHeader';
import CategoriesCheckboxes from '../../CategoriesCheckboxes/CategoriesCheckboxes';
import Button from '../../Button/Button';
import toast, { Toaster } from 'react-hot-toast';

const EditProductsForm = styled.form`
display: flex;
flex-direction: column;
max-width: 70vw;
margin: 5vh auto;
.form-entry{
  margin-bottom: 1rem;
}
input{
  margin: 1vw;
}
.stock{
  display:flex;
}

.stock-option-disabled{
  color:#e4e7ed; 
}

@media (max-width: 480px) { 
  .stock{
    display:flex;
    flex-direction:column;
  }
}
`;

const EditProducts = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  
  const currentProduct = useSelector(state => state.products.find(item => item.id === id))

  const productCategories = currentProduct.category.length > 0 ? currentProduct.category.map(item => item.id? item.id : item) : [];

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
  const [selectedCategories, setSelectedCategories] = useState(productCategories)
  const [discount, setDiscount] = useState(currentProduct.discount)
  const [productWithSize, setProductWithSize] = useState(true)


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
    
    if(name === ''){
      toast("Please add a name for the product.")
    }
    else if(isNaN(stockLargerThanZero) || stockLargerThanZero <= 0){
      toast("The total stock should be a number larger than 0")
    }
    else if(isNaN(price) || price <= 0){
      toast("The price should be a number larger than 0")
    }
    else if( isNaN(discount) || discount < 0 || discount > 100 ){
      toast("The discount should be a number between 0 and 100")
    }
    else{
      try {     
        productsService.setToken(user.token)

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

  return (
    <div>
      <Toaster />
      <SectionHeader text="Edit Product"/>
      <EditProductsForm onSubmit={handleSubmit}>
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
          <div className={!productWithSize ? "stock-option" : "stock-option-disabled"} onClick={allowProductWithUniqueSize}>
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
          <div className={productWithSize ? "stock-option" : "stock-option-disabled"} onClick={allowProductWithSize}>
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
        <Button text="Cancel" onClick={handleCancel}/>
      </EditProductsForm>

    </div>
  );
};

export default EditProducts
