import React from 'react'
import { useSelector } from 'react-redux';

const CategoriesCheckboxes = ({ selectedCategories, setSelectedCategories }) => {
  const categories = useSelector(state => state.categories)

  const handleCheckboxChange = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories((prevSelectedOptions) => [...prevSelectedOptions, optionValue]);
    } else {
      setSelectedCategories((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== optionValue)
      );
    }
  };


  return (
    <div>
      {categories.map((category) =>{
        return(
          <label key={category.id}>
          <input
            type="checkbox"
            value={category.id}
            onChange={handleCheckboxChange}
            checked={selectedCategories.includes(category.id)}
          />
          {category.category}
        </label>
        )
      })}
    </div>
  )
}

export default CategoriesCheckboxes