import React, { useEffect } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;
  

  useEffect(() => {
    // Function to preload images and fetch products
    const fetchDataAndPreloadImages = async () => {
      try {
        dispatch(listProducts());
        // Preload images
        products.forEach(product => {
          if (product.detailImage) {
            const img = new Image();
            img.src = product.detailImage;
          }
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the combined function on component mount
    fetchDataAndPreloadImages();
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Handle error state
  if (error) {
    return <Message variant='danger'>{error}</Message>;
  }

  // Handle no products state
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  // Render the products grid
  return (
    <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold my-6">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 "  >
        {Array.isArray(products) && products.map(product => (
          <div key={product._id} className="">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
