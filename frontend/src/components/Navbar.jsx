import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, PawPrint } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector.jsx";
import { useContext } from "react";
import { Context } from "../context/Context.jsx";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const isHomepage = pathname === "/";
  const { setAdmin } = useContext(Context);

  return (
    <div className="flex items-center backdrop-blur-lg border-b border-base-content/10 justify-between h-20 px-10 bg-base-100/80 shadow-b-md">
      <div className="flex items-center gap-1 font-medium   ">
        <PawPrint className="size-8 text-primary" />
        <p className="font-mono text-3xl  text-primary">
          Paw<span onClick={() => setAdmin(true)}>S</span>ome
        </p>
      </div>
      <div className="flex gap-5 items-center">
        <ThemeSelector />
        {isHomepage && (
          <div className="indicator">
            <ShoppingBagIcon className="size-5" />
            <span className="badge badge-sm indicator-item badge-primary">
              4
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
