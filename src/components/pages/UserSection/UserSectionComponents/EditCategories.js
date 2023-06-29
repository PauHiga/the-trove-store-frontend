import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import categoryService from '../../../../services/categoryService';
import { editCategoryReducer } from '../../../../reducers/categoriesReducer';
import Button from '../../../Button/Button';

const StyledEditCategories = styled.div`
  margin: 10px;
  min-height: 30px;
  p{
    margin:0;
  `;

const EditCategories = ({item}) => {
  const dispatch = useDispatch()
  const[editedCategory, setEditedCategory] = useState('')
  const[errorMessage, setErrorMessage] = useState('')

  const handleEditCategory = async (category) => {
    if(editedCategory.length === 0){
      setErrorMessage('The category name cannot be empty! Please add a name for the category.')
      setTimeout(()=> setErrorMessage(''), 3000)
    }

    else {
      try{
        const categoryToEdit = {category: editedCategory}
        const successfullyEditedCategory = await categoryService.editCategory(categoryToEdit, category.id)
        dispatch(editCategoryReducer(successfullyEditedCategory))
        setEditedCategory('')
      }
      catch (error){
        console.log(error)
      }
    }
  }

  return (
    <StyledEditCategories>
      <h4 data-bs-toggle="collapse" data-bs-target={"#" + item.category} aria-controls="collapseExample">
      {item.category}
      </h4>
      <div className="collapse" id={item.category}>
        <div>
          <input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />
          <Button onClick={()=> handleEditCategory(item)} text={"Edit Category"}/> 
          <p>{errorMessage}</p>
        </div>
      </div>
    </StyledEditCategories>
  )
}

export default EditCategories