import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import categoryService from "../../../../services/categoryService";
import { editCategoryReducer } from "../../../../reducers/categoriesReducer";
import Button from "../../../Button/Button";
import toast, { Toaster } from "react-hot-toast";

const StyledEditCategories = styled.div`
  margin: 10px;
  min-height: 20px;
  p{
    margin:0;
  `;

const EditCategories = ({ item }) => {
  const dispatch = useDispatch();
  const [editedCategory, setEditedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditCategory = async (category) => {
    if (editedCategory.length === 0) {
      setErrorMessage(
        "The category name cannot be empty! Please add a name for the category.",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      try {
        const categoryToEdit = { category: editedCategory };
        const successfullyEditedCategory = await categoryService.editCategory(
          categoryToEdit,
          category.id,
        );
        dispatch(editCategoryReducer(successfullyEditedCategory));
        setEditedCategory("");
        toast.success(`Category edited`);
      } catch (error) {
        toast(`There was an error editing this category`);
        console.log(error);
      }
    }
  };

  return (
    <StyledEditCategories>
      <Toaster />
      <h5
        data-bs-toggle="collapse"
        data-bs-target={"#" + item.category}
        aria-controls="collapse"
      >
        {item.category}
      </h5>
      <div className="collapse" id={item.category}>
        <div>
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <Button
            onClick={() => handleEditCategory(item)}
            text={"Edit Category"}
          />
          <p>{errorMessage}</p>
        </div>
      </div>
    </StyledEditCategories>
  );
};

export default EditCategories;
