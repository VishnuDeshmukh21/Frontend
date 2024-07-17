import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
  return (
    <div className=" bg-dark shadow-lg rounded-lg overflow-hidden my-3 ">
      <Link to={`/product/${product._id}`}>
        <img src={product.detailImage} alt={product.name} className="w-full h-60 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-gray-800 text-lg font-semibold mb-2">{product.name}</h2>
        </Link>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">₹{product.price}</span>
        </div>
        <div className="flex items-center">
          <Rating value={product.rating} text={`(${product.numReviews !== null ? product.numReviews : 0})`} color="#fae845" />
        </div>
      </div>
    </div>
  );
}

export default Product;
