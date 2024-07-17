import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const itemsInCart = cart.cartItems.length


  const dropdownRef = useRef(null); // Ref to track dropdown element

  useEffect(() => {
    // Function to close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <header className='bg-white shadow-lg'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='text-green-700 font-bold text-4xl'>
              Homble
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <Link to='/cart' className='text-green-700 px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center'>
            <div className="relative ">
        <i className='fas fa-shopping-cart fa-lg  py-1'></i>
        {itemsInCart > 0 && (
          <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xxxs absolute -top-2 -right-2">
            {itemsInCart}
          </span>
        )}
      </div>

              
              <span className='hidden md:inline'>Cart</span>
            </Link>
            {userInfo ? (
              <div className='relative' ref={dropdownRef}>
                <button onClick={toggleDropdown} className='text-green-700 px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center '>
                  <i className='fas fa-user fa-lg p-1'></i>
                  <span className='hidden md:inline'>{userInfo.name}</span>
                </button>
                {dropdownOpen && (
                  <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Link
                        to='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to='/login'
                className='text-green-700 px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center'
              >
                <i className='fas fa-user fa-lg py-1'></i>
                <span className='hidden md:inline'>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
