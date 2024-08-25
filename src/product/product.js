import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../redux/slice/productSlice';

const Product = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(productApi({}));
  }, [dispatch]);


  console.log("productList",productList)
  return (
    <div>
      <h1>Product List</h1>
      {productList ? (
        <ul>
          {productList.products.map((product, index) => (
            <li key={index}>{product.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default Product;
