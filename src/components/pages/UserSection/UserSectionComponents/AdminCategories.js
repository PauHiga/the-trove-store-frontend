import { useState } from 'react';
import styled from 'styled-components';
import productsService from '../../../../services/productsService';
import categoryService from '../../../../services/categoryService';
import { createCategoryReducer} from '../../../../reducers/categoriesReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Button/Button';
import EditCategories from './EditCategories';

const StyledAdminCategories = styled.div`
  label {
    margin-right:20px;
  }
  p {
    margin: 0px;
  }
  .inline{
    display:flex;
  }
  
  .toggle-add-category {
    font-variant: small-caps;
    align-items: center;
    background-color: #ce9124;
    color: white;
    border: none;
    padding: 7px 10px 7px 10px;
    margin-left:30px;
    width:150px;
  }
  h3 {
    margin-top:20px;
  }
  `;
  
  const AdminCategories = (id) => {

    const[newCategory, setNewCategory] = useState('')
    const[errorMessage, setErrorMessage] = useState('')

    const categories = useSelector(state => state.categories)

    const user = useSelector(state => state.user)
    productsService.setToken(user.token)
    categoryService.setToken(user.token)
    
  const dispatch = useDispatch()
  
  const handleAddCategory = async () => {
    if(newCategory.length === 0){
      setErrorMessage('The category name cannot be empty! Please add a name for the category.')
      setTimeout(()=> setErrorMessage(''), 3000)
    }
    else {
      try{
        const categoryToAdd = {category: newCategory}
        const addedCategory = await categoryService.createCategory(categoryToAdd)
        dispatch(createCategoryReducer(addedCategory))
        setNewCategory('')
      }
      catch (error){
        console.log(error)
        if (newCategory === ''){
          
        }
      }
    }
  }

   return (
    <div>
        <StyledAdminCategories>
          <div>
            <div className="inline">
              <h2>Categories</h2>
              <div className="toggle-add-category" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-controls="collapseExample">
                Add New Category
              </div>
            </div>
            <div className="collapse" id="collapseExample">
              <div>
                <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <Button onClick={handleAddCategory} text={"Add Category"}/>
                <p>{errorMessage}</p>
              </div>
            </div>

            <div>
            <h3>Current Categories</h3>
              <ul>
                {categories.map(item => <EditCategories item={item} key={item.id}/>)}
              </ul>
            </div>
          </div>
        </StyledAdminCategories>  

    </div>
  );
};

export default AdminCategories
