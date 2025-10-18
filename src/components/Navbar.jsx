import { Home, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <nav className="absolute w-full bg-slate-950 flex justify-center items-center">
      <div className="max-w-7xl min-w-7xl flex justify-between items-center px-8 py-4 shadow-md font-bold text-white">
        <Link to="/">
          <h1 className="text-2xl tracking-wide rounded-lg hover:text-slate-300 hover:shadow hover:shadow-blue-400 py-1 px-2">
            Shopping Cart
          </h1>
        </Link>
        <div className="flex gap-4 text-lg px-4">
          <Link
            to="/"
            className="relative flex items-center gap-2 transition-colors duration-300 bg-slate-700 hover:bg-slate-800 rounded-lg px-4 py-2"
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 transition-colors duration-300 bg-slate-700 hover:bg-slate-800 rounded-lg px-4 py-2"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>

            {/* Badge for item count */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
