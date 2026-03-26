import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import {
  ArrowLeftIcon,
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, updateProduct, handleChange, pet, error, deleteProduct } =
    useContext(Context);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      deleteProduct(Number(id));
      navigate("/");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 ">
      <button
        onClick={() => navigate("/")}
        className="flex gap-2 btn py-1 hover:bg-gray-700 mb-8"
      >
        <ArrowLeftIcon className="size-5" />
        <p>Back to Pets</p>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg h-110  overflow-hidden shadow-lg bg-base-100">
          <img
            src={pet.image}
            alt={pet.name}
            className="size-full object-cover"
          />
        </div>

        <div className="bg-base-100 w-full rounded-lg p-7">
          <p className="text-xl font-bold mb-6">Edit Pet</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={pet.name}
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
                  type="number"
                  id="price"
                  onChange={handleChange}
                  value={pet.price}
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
                  value={pet.image}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end items-center">
              <button
                className="flex gap-1 btn btn-error cursor-pointer items-center py-2 px-4 font-bold disabled:cursor-no-drop"
                onClick={handleDelete}
                type="button"
              >
                <Trash2Icon className="size-5" />
                <p>Delete Pet</p>
              </button>
              <button
                className="flex gap-1 btn btn-primary cursor-pointer items-center py-2 px-4 font-bold disabled:cursor-no-drop"
                disabled={!pet.name || !pet.price || !pet.image || loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <SaveIcon className="size-5" />
                    <p>Save Changes</p>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
