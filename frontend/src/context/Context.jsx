import React, { createContext, useState } from "react";
import api from "../utils/AxiosInstance";
import { toast } from "react-hot-toast";

export const Context = createContext();

const ContextProvider = (props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("preferred-theme") || "forest",
  );
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [pet, setPet] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [modal, setModal] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/products");
      setPets(response.data.products);
    } catch (err) {
      if (err.status === 429) {
        setError("Rate Limit exceeded");
        setPets([]);
      } else {
        setError("Something went wrong, Try again");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async (id) => {
    setLoading(true);
    try {
      const response = await api.get("/api/products/" + id);
      setPet(response.data.product);
    } catch (error) {
      console.log(error);
      setError("Something went wrong, Try again");
    } finally {
      setLoading(false);
    }
  };
  const createProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/products/", pet);
      getProduct();
      setPet({
        name: "",
        image: "",
        price: "",
      });

      toast.success("Pet Added Successfully");
      setModal(false);
      getProducts();
    } catch (error) {
      console.log("Error in createProduct Function", error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  const updateProduct = async (id) => {
    setLoading(true);
    try {
      const response = await api.patch("/api/products/" + id, pet);

      toast.success("Pet Edited Successfully");
    } catch (error) {
      console.log("Error in updateProduct Function", error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = async (id) => {
    setLoading(true);

    try {
      const response = await api.delete("/api/products/" + id);
      console.log(response.data);
      setPets((prev) => prev.filter((product) => product.id !== id));
      toast.success("Pet Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete Pet");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPet((prev) => ({ ...prev, [id]: value }));
  };

  const contextValue = {
    loading,
    error,
    theme,
    modal,
    pet,
    pets,
    setModal,
    setTheme,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
    handleChange,
    admin,
    setAdmin,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
