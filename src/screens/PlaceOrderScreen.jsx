import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

function PlaceOrderScreen() {
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, error, success } = orderCreate;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 25).toFixed(2);
  cart.taxPrice = (0.08 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }

    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: CART_CLEAR_ITEMS });
    }
  }, [success, navigate]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-8/12 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 p-3">Shipping</h2>
            <div className="p-4">
              <p className="text-sm text-gray-700">
                <strong>Shipping:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
            <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 p-3">Payment Method</h2>
            <div className="p-4">
              <p className="text-sm text-gray-700">
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
            <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 p-3">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message variant="info">Your Cart is Empty</Message>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.detailImage} alt={item.name} className="w-12 h-12 object-cover rounded-full" />
                      <Link to={`/product/${item.product}`} className="ml-4 text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div className="ml-4">
                      {item.qty} X ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-4/12 px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4 flex justify-between">
                <div>Items:</div>
                <div>₹{cart.itemsPrice}</div>
              </div>
              <div className="p-4 flex justify-between">
                <div>Shipping:</div>
                <div>₹{cart.shippingPrice}</div>
              </div>
              <div className="p-4 flex justify-between">
                <div>Tax:</div>
                <div>₹{cart.taxPrice}</div>
              </div>
              <div className="p-4 flex justify-between">
                <div>Total Price:</div>
                <div>₹{cart.totalPrice}</div>
              </div>
              <div className="p-4">
                {error && <Message variant="danger">{error}</Message>}
              </div>
              <div className="p-4">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  disabled={cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
