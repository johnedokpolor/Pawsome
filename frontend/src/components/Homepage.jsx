import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";

const Homepage = () => {
  const { getProducts,getProduct } = useContext(Context);
  useEffect(() => {
    // getProducts();s
    getProduct(2);
  }, []);

  return <div className="bg-red-500">Homepage</div>;
};

export default Homepage;
