import React from 'react'
import styled from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';

const mock = [
  {
    "name": "Floral woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Summer woman dress",
    "descriptionL": "Beautiful Floral Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 10,
    "id": "64864cc235f679018c0adb76"
  },
  {
    "name": "Blue woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Blue woman dress",
    "descriptionL": "Beautiful Blue Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 0,
    "id": "64865edd4cfafa1c4f7c2d7c"
  },
  {
    "name": "White Shirt Men",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "White shirt for men",
    "descriptionL": "Elegant white shirt for men",
    "price": 30,
    "stock": {
      "S": 1,
      "M": 2,
      "L": 1,
      "XL": 1
    },
    "category": [
      "men"
    ],
    "discount": 0,
    "id": "6489ef3488d66a021855b138"
  },
  {
    "name": "Floral woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Summer woman dress",
    "descriptionL": "Beautiful Floral Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 10,
    "id": "64864cc235f679018c0adb71"
  },
  {
    "name": "Blue woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Blue woman dress",
    "descriptionL": "Beautiful Blue Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 0,
    "id": "64865edd4cfafa1c4f7c2d72"
  },
  {
    "name": "Floral woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Summer woman dress",
    "descriptionL": "Beautiful Floral Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 10,
    "id": "64864cc235f679018c0adb77"
  },
  {
    "name": "Blue woman dress",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "Blue woman dress",
    "descriptionL": "Beautiful Blue Summer woman dress in fresh colors",
    "price": 35,
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "category": [
      "woman"
    ],
    "discount": 0,
    "id": "64865edd4cfafa1c4f7c2d78"
  },
  {
    "name": "White Shirt Men",
    "featureImg": "img url",
    "galleryImg": [
      
    ],
    "description": "White shirt for men",
    "descriptionL": "Elegant white shirt for men",
    "price": 30,
    "stock": {
      "S": 1,
      "M": 2,
      "L": 1,
      "XL": 1
    },
    "category": [
      "men"
    ],
    "discount": 0,
    "id": "6489ef3488d66a021855b133"
  }
]



const StyledProductsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  max-width: 1100px;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding-bottom:20px;
`;

const ProductsGallery = () => {
  return (
    <StyledProductsGallery>
        {mock.map(item => <ProductCard key={item.id}product={item}/>)}
    </StyledProductsGallery>
  )
}

export default ProductsGallery