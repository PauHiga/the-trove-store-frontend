import { useState } from 'react';
import styled from 'styled-components';
import productsService from '../../services/productsService';
import categoryService from '../../services/categoryService';
import { createCategoryReducer, editCategoryReducer } from '../../reducers/categoriesReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../reducers/productsReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

const AdminSectionContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  width: 70%;
  max-width: 1100px;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding-bottom:20px;
  .displayAllProducts {
    display: flex;
    flex-wrap: wrap;
  }
  `;
  
  const AdminSection = (id) => {

    const[newCategory, setNewCategory] = useState('')
    const[editCategoryOn, setEditCategoryOn] = useState('')
    const[editedCategory, setEditedCategory] = useState('')

    const categories = useSelector(state => state.categories)
    console.log(categories)

    const user = useSelector(state => state.user)
    productsService.setToken(user.token)
    categoryService.setToken(user.token)
    
  const allProducts = useSelector(state => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleAddCategory = async () => {
      try{
        const categoryToAdd = {category: newCategory}
        const addedCategory = await categoryService.createCategory(categoryToAdd)
        dispatch(createCategoryReducer(addedCategory))
        setNewCategory('')
      }
      catch (error){
        console.log(error)
      }
  }
 
  const editButtonHandler = (item) => {
    if (editedCategory !== item.id){
      setEditCategoryOn(item.id)
      setEditedCategory(item.category)
    }
    else{
      setEditCategoryOn('0')
    }
  }

  const handleEditCategory = async (category) => {
    try{
      console.log(category);
      const categoryToEdit = {category: editedCategory}
      const successfullyEditedCategory = await categoryService.editCategory(categoryToEdit, category.id)
      dispatch(editCategoryReducer(successfullyEditedCategory))
      setEditedCategory('')
    }
    catch (error){
      console.log(error)
    }
}

const handleCancelEditCategory = async () => {
  setEditCategoryOn('')
}

  const handleDeleteProduct = async (item) => {
    const confirm = window.confirm(`Are you sure you want to delete ${item.name}?`)
    if(confirm){
      await productsService.deleteProduct(item.id)
      dispatch(deleteProduct(item.id))
    }
  }
  
  const handleEdit = (id) => {
    navigate(`/edit-products/${id}`);
  }

   return (
  
    <AdminSectionContainer>
      <h2>Admin Section</h2>
      <div>
        <h2>Categories</h2>
        <label htmlFor="">Add category</label><input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <button onClick={()=> handleAddCategory()}>Add Category</button>
        <ul>
          {categories.map(item => {
          return(
            <>
              <li key={item.id}>{item.category}<button onClick={()=> editButtonHandler(item)}>Edit</button></li>
              {editCategoryOn === item.id ? <><input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />
            <button onClick={()=> handleEditCategory(item)}>Edit Category</button><button onClick={()=> handleCancelEditCategory()}>Cancel</button></> : '' }
            </>
            )})
          }
        </ul>
      </div>
      <div>
        <h2>Products</h2>
        <Link to="/add-products">Add New Product</Link>
        <h3>All products</h3>
          <div className="displayAllProducts">
            {allProducts.map(item => {
              return(
                <div>
                  <ProductCard key={item.id} product={item}/>
                  <button onClick={() => handleEdit(item.id)}>Edit</button><button onClick={()=> handleDeleteProduct(item)}>Delete</button>
                </div>
              )}
            )}
          </div>
      </div>
    </AdminSectionContainer>

  );
};

export default AdminSection
