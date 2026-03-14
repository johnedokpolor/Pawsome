import React, { createContext, useEffect, useState } from "react";
import api from "../utils/AxiosInstance";

export const Context = createContext();

const ContextProvider = (props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("preferred-theme") || "forest",
  );
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async (id) => {
    try {
      const response = await api.get("/api/products/" + id);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createProduct = async () => {
    try {
      const response = await api.get("/api/products/" + id);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    theme,
    setTheme,
    getProducts,
    getProduct,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
