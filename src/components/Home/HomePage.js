import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slice/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.userData);
  useEffect(() => {
    dispatch(fetchUserData({}));
  }, [dispatch]);
  console.log("userdata", userdata);
  return (
    <div>
      <h1>Welcome to the Protected Home Page!</h1>
      <p>This content is only accessible by logged-in users.</p>
      <div>
      <h1>{userdata.firstName}</h1>
      <img src={userdata.image} alt={userdata.firstName} />
      </div>
    </div>
  );
};

export default HomePage;
