import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader'
import { getUserDetails, updateProfile } from '../actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';

function ProfileScreen() {
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setFirstName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, user, userInfo, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateProfile({
          id: user._id,
          first_name: first_name,
          email: email,
          password: password
        })
      );
      setUpdated(true);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-md">
        <FormContainer>
          <h1 className="text-2xl mb-6 font-semibold">Profile</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <div className="py-3"><Loader /></div>}

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="checkbox"
                className="mr-2"
                required
              />
              <label htmlFor="checkbox" className="text-sm text-gray-700">Agree to Changes</label>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
          </form>

          {updated && <Message variant="success">Update Successful</Message>}
        </FormContainer>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-semibold">My Orders</h2>
        {/* Add your orders component or content here */}
      </div>
    </div>
  );
}

export default ProfileScreen;
