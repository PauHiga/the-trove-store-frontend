import { useState } from 'react';
import styled from 'styled-components';
import productsService from '../../../../services/productsService';
import categoryService from '../../../../services/categoryService';
import { createCategoryReducer} from '../../../../reducers/categoriesReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Button/Button';
import EditCategories from './EditCategories';

const StyledUserInfo = styled.div`
  label {
    margin-right:20px;
  }
  p {
    margin: 0px;
  }
  .inline{
    display:flex;
    margin: 10px 0px;
    align-items: center;
  }
  
  .toggle-edit-user {
    font-variant: small-caps;
    align-items: center;
    background-color: #ce9124;
    color: white;
    border: none;
    padding: 4px 10px 7px 10px;
    margin-left:30px;
    width:50px;
    height:30px;
  }
  h3 {
    margin-top:20px;
  }
  h4 {
    margin-top:20px;
  }
  `;
  
  const UserInfo = (id) => {

    const[errorMessage, setErrorMessage] = useState('')
    
    const[newCategory, setNewCategory] = useState('')

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
        <StyledUserInfo>
          <div>
            <div className="inline">
              <h2>User Information</h2>
              <div className="toggle-edit-user" data-bs-toggle="collapse" data-bs-target="#collapse-edit-user" aria-controls="collapse-edit-user">
                Edit
              </div>
            </div>
            <div className="collapse" id="collapse-edit-user">
              <div>
                <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <Button onClick={handleAddCategory} text={"Add Category"}/>
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </StyledUserInfo>  

    </div>
  );
};

export default UserInfo
