import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircle,
} from "lucide-react";
import React, { useContext } from "react";
import { Context } from "../context/Context";

const CreateProduct = () => {
  const { handleChange, setModal, pet, loading, createProduct } =
    useContext(Context);
  return (
    <div className="flex absolute top-0 bottom-0 justify-center z-10  items-center w-full backdrop-blur-xl bg-black/70 h-screen">
      <div className="bg-base-200 w-xl rounded-lg p-7">
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl font-bold">Add New Pet</p>
          <p
            className="text-base cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </p>
        </div>
        <form onSubmit={createProduct} className="space-y-5">
          <div>
            <label htmlFor="name" className="font-semibold text-base">
              Pet Name
            </label>{" "}
            <br />
            <div className=" relative  mt-2">
              <div className="inset-y-0  flex absolute left-3 items-center">
                <Package2Icon className="size-5 " />
              </div>
              <input
                className="outline-0 w-full focus:border-2 pr-3 py-3 pl-10 text-base-content/50 rounded-2xl  border border-base-content focus:border-primary h-full"
                type="text"
                id="name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="price" className="font-semibold text-base">
              Price
            </label>{" "}
            <br />
            <div className=" relative  mt-2">
              <div className="inset-y-0  flex absolute left-3 items-center">
                <DollarSignIcon className="size-5 " />
              </div>
              <input
                className="outline-0 w-full focus:border-2 pr-3 py-3 pl-10 text-base-content/50 rounded-2xl  border border-base-content focus:border-primary h-full"
                type="text"
                id="price"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="font-semibold text-base">
              Image Url
            </label>{" "}
            <br />
            <div className=" relative  mt-2">
              <div className="inset-y-0  flex absolute left-3 items-center">
                <ImageIcon className="size-5 " />
              </div>
              <input
                className="outline-0 w-full focus:border-2 pr-3 py-3 pl-10 text-base-content/50 rounded-2xl  border border-base-content focus:border-primary h-full"
                type="text"
                id="image"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-end items-center">
            <p className="btn btn-ghost" onClick={() => setModal(false)}>
              Cancel
            </p>
            <button
              className="flex gap-1 btn btn-primary cursor-pointer items-center py-2 px-4 font-bold disabled:cursor-no-drop"
              disabled={!pet.name || !pet.price || !pet.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <div className=" flex gap-1">
                  <PlusCircle className="size-5" />
                  <p>Add Pet</p>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
