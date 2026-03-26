import React, { useContext } from "react";
import { Trash2Icon, EditIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const ProductCard = ({ product }) => {
  const { deleteProduct, getProduct, admin } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="rounded-md bg-base-300">
      <figure
        className=" h-60 w-full cursor-pointer"
        onClick={() => navigate(product.image)}
      >
        <img
          src={product.image}
          className="object-cover w-full h-full rounded-t-md"
          alt={product.name + "image"}
        />
      </figure>
      <div className="py-5 px-7">
        <div>
          <p className="text-lg mb-1">{product.name}</p>
          <p className="text-3xl text-secondary font-bold">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
        {admin && (
          <div className="flex justify-end gap-2">
            <Link
              className=" border border-blue-500 rounded-xl  hover:bg-blue-200  px-2 py-1 "
              to={`/products/${product.id}`}
              onClick={() => getProduct(product.id)}
            >
              <EditIcon className="size-5 text-blue-500" />
            </Link>
            <button
              className="rounded-xl px-2 py-1 border border-red-500 cursor-pointer hover:bg-red-200"
              onClick={() => deleteProduct(product.id)}
            >
              <Trash2Icon className="size-5 text-red-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
