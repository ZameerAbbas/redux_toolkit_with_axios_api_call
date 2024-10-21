import React from "react";
import Product from "../product/product"

import { useSelector } from 'react-redux';

const HomePage = () => {

  // eslint-disable-next-line no-undef
  const user = useSelector((state) => state.auth.user);
  console.log("user",user.providerData) 



  return (
    <div>
      <h1>Welcome to the Protected Home Page!</h1>
      <p>This content is only accessible by logged-in users.</p>

      <div className="flex justify-center items-center bg-yellow-50">

      </div>
      <div>
        <Product />
      </div>
    </div>
  );
};

export default HomePage;
