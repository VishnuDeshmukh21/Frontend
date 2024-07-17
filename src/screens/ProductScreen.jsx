import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating.jsx';
import { listProductDetails } from '../actions/productActions.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetail;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2'>
            <img src={product.detailImage} alt={product.name} className='w-full h-auto rounded-lg' />
          </div>
          <div className='md:w-1/3'>
            <div className='space-y-4'>
              <div>
                <h3 className='text-2xl font-semibold'>{product.name}</h3>
              </div>
              <div>
                <Rating value={product.rating} text={`(${product.numReviews !== null ? product.numReviews : 0})`} color={'#fae845'} />
              </div>
              <div>
                <h5 className='text-lg font-medium'>Description:</h5>
                {typeof product.description === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className='md:w-1/3'>
            <div className='border border-gray-300 rounded-lg p-4 shadow-sm'>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Price:</span>
                  <span className='font-semibold'>₹{product.price}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Status:</span>
                  <span>{product.quantityAvailable > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                {product.quantityAvailable > 0 && (
                  <div className='flex justify-between'>
                    <span>QTY</span>
                    <select
                      value={qty}
                      className='form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.quantityAvailable).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={addToCartHandler}
                  className='w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50'
                  type='button'
                  disabled={product.quantityAvailable < 1}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
