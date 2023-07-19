import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";

const categorySlice = createSlice({
  name: "Categories",
  initialState: [],
  reducers: {
    setAllCategories(state, action) {
      return action.payload;
    },
    createCategoryReducer(state, action) {
      const content = action.payload;
      state.push(content);
    },
    editCategoryReducer(state, action) {
      const editedCategory = action.payload;
      return state.map((item) =>
        item.id !== editedCategory.id ? item : editedCategory,
      );
    },
    deleteCategoryReducer(state, action) {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const initializeCategories = () => {
  return async (dispatch) => {
    const allCategories = await categoryService.getAllCategories();
    dispatch(setAllCategories(allCategories));
  };
};

export const {
  setAllCategories,
  createCategoryReducer,
  editCategoryReducer,
  deleteCategoryReducer,
} = categorySlice.actions;
export default categorySlice.reducer;
