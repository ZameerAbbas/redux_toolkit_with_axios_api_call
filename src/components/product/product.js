import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromRealtimeDB } from "../../redux/slice/databaseSlice";

const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.firestore.data);

  useEffect(() => {
    dispatch(fetchDataFromRealtimeDB());
  }, [dispatch]);

  console.log("data",data)
  return (
    <div>
      <h1>Firestore Data</h1>
      <ul>
        
      </ul>
    </div>
  );
};

export default Product;
