import React from "react";
import Product from "../product/product"
import { useDispatch, useSelector } from "react-redux";

import {logoutApi} from "../../redux/slice/authSlice"

const HomePage = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const user = useSelector((state) => state.auth.user);
  console.log("user",user) 


  const handleLogout = () => {
    dispatch(logoutApi());
  };

  return (
    <div>
      <h1>Welcome to the Protected Home Page!</h1>
      <p>This content is only accessible by logged-in users.</p>
      <div>
        <p>Logged in as: {user ? user.email : "No user"}</p>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>

      <div className="flex justify-center items-center bg-yellow-50">

      </div>
      <div>
        <Product />
      </div>
    </div>
  );
};

export default HomePage;
