import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <nav className="flex justify-center mb-4">
      <div className="px-2">
        {step1 ? (
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        ) : (
          <span className="text-gray-500">Login</span>
        )}
      </div>

      <div className="px-2">
        {step2 ? (
          <Link to="/shipping" className="text-blue-500 hover:text-blue-700">
            Shipping
          </Link>
        ) : (
          <span className="text-gray-500">Shipping</span>
        )}
      </div>

      <div className="px-2">
        {step3 ? (
          <Link to="/payment" className="text-blue-500 hover:text-blue-700">
            Payment
          </Link>
        ) : (
          <span className="text-gray-500">Payment</span>
        )}
      </div>

      <div className="px-2">
        {step4 ? (
          <Link to="/placeorder" className="text-blue-500 hover:text-blue-700">
            Place Order
          </Link>
        ) : (
          <span className="text-gray-500">Place Order</span>
        )}
      </div>
    </nav>
  );
}

export default CheckoutSteps;
