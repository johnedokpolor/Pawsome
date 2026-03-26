import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";

const Homepage = () => {
  const { getProducts, pets, error, loading, modal, setModal } =
    useContext(Context);
  useEffect(() => {
    getProducts();
  }, [0]);

  return (
    <div>
      {modal && <CreateProduct />}
      <div className="px-4 mx-auto py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <button
            className="btn btn-primary rounded-lg"
            onClick={() => setModal(true)}
          >
            <PlusCircleIcon className="size-5 mr-2" />
            Add Pet
          </button>
          <button className="btn btn-ghost btn-circle" onClick={getProducts}>
            <RefreshCcwIcon className="size-5" />
          </button>
        </div>
        {error && <p className="alert alert-error mb-8">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid=cols-2 lg:grid-cols-3 gap-6">
            {pets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
