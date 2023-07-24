import { useState } from 'react';
import styled from 'styled-components';
import productsService from '../../../../services/productsService';
import categoryService from '../../../../services/categoryService';
import { createCategoryReducer} from '../../../../reducers/categoriesReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Button/Button';
import EditCategories from './EditCategories';
import toast, { Toaster } from 'react-hot-toast';

const StyledAdminCategories = styled.div`
  label {
    margin-right:20px;
  }
  p {
    margin: 0px;
  }
  .inline{
    display:flex;
    margin: 10px 0px;
  }
  
  .toggle-add-category {
    margin-left: 20px
  }
  
  h3 {
    margin-top:20px;
  }
  h4 {
    margin-top:20px;
  }
  `;
  
  const AdminCategories = () => {

    const[newCategory, setNewCategory] = useState('')
    const[errorMessage, setErrorMessage] = useState('')

    const categories = useSelector(state => state.categories)

    const user = useSelector(state => state.user)
    productsService.setToken(user.token)
    categoryService.setToken(user.token)
    
  const dispatch = useDispatch()
  
  const handleAddCategory = async () => {
    if(newCategory.length === 0){
      toast('The category name cannot be empty. Please add a name for the new category.')
      setErrorMessage('The category name cannot be empty. Add a name for the new category.')
      setTimeout(()=> setErrorMessage(''), 3000)
    }
    else {
      try{
        const categoryToAdd = {category: newCategory}
        const addedCategory = await categoryService.createCategory(categoryToAdd)
        dispatch(createCategoryReducer(addedCategory))
        setNewCategory('')
        toast.success(`Category created`)
      }
      catch (error){
        console.log(error)
      }
    }
  }

   return (
    <div>
      <Toaster />
      <StyledAdminCategories>
        <div>
          <div className="inline">
            <h2>Categories</h2>
            <div className="toggle-add-category" data-bs-toggle="collapse" data-bs-target="#collapse-add-category" aria-controls="collapse-add-category">
              <Button text={"Add New Category"}/>
            </div>
          </div>
          <div className="collapse" id="collapse-add-category">
            <div>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <Button onClick={handleAddCategory} text={"Add Category"}/>
              <p>{errorMessage}</p>
            </div>
          </div>
          <div>
            <h4>Current Categories</h4>
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
