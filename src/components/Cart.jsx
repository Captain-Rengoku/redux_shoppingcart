import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import {
  removeFromCart,
  updateTempQuantity,
  applyTempUpdate,
} from "../features/shopCart/cartSlice";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items: cartItems, tempItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateTempQuantity({ id, quantity }));
  };
  const handleApplyUpdate = (id) => {
    dispatch(applyTempUpdate(id));
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-slate-800 min-h-screen flex justify-center p-4 pt-28">
        <div className="w-full max-w-3xl">
          {cartItems.length === 0 ? (
            <div className="bg-slate-400 rounded-lg shadow-lg p-10 text-center">
              <h3 className="flex justify-center items-center gap-2 text-xl font-semibold mb-4 text-slate-800">
                Your Cart is Empty <ShoppingBag className="text-blue-700" size={20} />
              </h3>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600/90 cursor-pointer hover:bg-blue-700/90 text-white px-6 py-2 rounded-md font-medium transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="bg-slate-400 rounded-lg shadow-lg p-8 space-y-6">
              <h1 className="text-3xl font-bold mb-8 text-center underline underline-offset-4 text-slate-800">
                Your Cart
              </h1>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start border-b border-slate-950 pb-4 gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-800 mb-2">
                      Price: <span className="font-bold text-slate-950">${item.price.toFixed(2)}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={
                          tempItems.find((temp) => temp.id === item.id)
                            ?.quantity || item.quantity
                        }
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 border border-slate-400 bg-slate-100 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-orange-300"
                      />
                      <button
                        onClick={() => handleApplyUpdate(item.id)}
                        className="bg-blue-600/90 cursor-pointer font-bold hover:bg-blue-700/90 text-white px-3 py-1 rounded text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-600 hover:bg-red-700 font-bold cursor-pointer text-white px-3 py-1 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right font-bold text-xl text-slate-800">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600/90 cursor-pointer hover:bg-blue-700/90 text-white w-full py-2 rounded-md mt-4 font-medium transition-all duration-300"
              >
                Back to Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
