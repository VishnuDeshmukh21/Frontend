import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCarthandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/shipping`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.product} className="flex items-center space-x-4">
                <img
                  src={item.detailImage}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">
                    {item.name}
                  </Link>
                </div>
                <div className="text-lg">₹{item.price}</div>
                <div>
                  <select
                    value={item.qty}
                    className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.quantityAvailable).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCarthandler(item.product)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full md:w-1/3">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl mb-4">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <div className="text-lg mb-4">
            ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
