// SearchBar.js
import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 11a4 4 0 100-8 4 4 0 000 8zm0 0c2.21 0 4 1.79 4 4v4m-8 0v-4c0-2.21 1.79-4 4-4z"
            />
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="q"
        className="py-2 text-sm text-gray-900 bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
        placeholder="Search refillable groceries"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
