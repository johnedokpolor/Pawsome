import React, { useContext, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import { Context } from "./context/Context";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);
  const { theme } = useContext(Context);

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-base-200 "
      data-theme={theme}
    >
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
