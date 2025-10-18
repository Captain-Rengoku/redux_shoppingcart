import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/shopCart/productSlice";
import { addToCart } from "../features/shopCart/cartSlice";

const ProductList = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load Products, please try again.
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-slate-800 min-h-screen w-full">
        <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-8 pt-28">
          {products
            .map((product) => (
              <div
                key={product.id}
                className="bg-slate-400 rounded-xl shadow-sm hover:shadow-lg transition-transform transform py-6 px-2 flex flex-col items-center justify-between"
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 object-contain mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center line-clamp-3">
                    {product.title}
                  </h2>
                </div>
                <div className="flex flex-col justify-center items-center border-t-2 border-slate-500 w-full p-2">
                  <p className="text-xl font-bold text-gray-900 mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-blue-600/90 hover:bg-blue-700/90 text-white px-4 py-2 rounded-md font-medium transition-all cursor-pointer duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default ProductList;
