import React from 'react';

function Footer() {
  return (
    <footer className="#f0fdf4 text-dark py-4  bottom-0 w-full">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="text-center">
            &copy; {new Date().getFullYear()} H. All Rights Reserved.
          </div>
        </div>
      </div>  
    </footer>
  );
}

export default Footer;
