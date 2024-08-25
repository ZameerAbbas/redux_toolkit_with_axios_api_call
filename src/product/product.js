import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../redux/slice/productSlice';

const Product = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(productApi({}));
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      {state ? (
        <ul>
          {state.map((product, index) => (
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
