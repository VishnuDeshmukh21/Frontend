import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'; // Optional: You can keep your custom CSS if needed
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <main className="py-3 ">
//         <div className="container mx-auto  lg:px-24 sm:px-10 "> {/* Tailwind container class */}
//           <Routes>
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/product/:id" element={<ProductScreen />} />
//             <Route path="/cart/:id?" element={<CartScreen />} />
//             <Route path="/login" element={<LoginScreen />} />
//             <Route path="/register" element={<RegisterScreen />} />
//             <Route path="/profile" element={<ProfileScreen />} />
//             <Route path="/shipping" element={<ShippingScreen />} />
//             <Route path="/payment" element={<PaymentScreen />} />
//             <Route path="/placeorder" element={<PlaceOrderScreen />} />
//           </Routes>
//         </div>
//       </main>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow py-3">
          <div className="container mx-auto lg:px-24 sm:px-10">
            {/* Tailwind container class */}
            <Routes>
              <Route path="/" element={<HomeScreen />} />
             <Route path="/product/:id" element={<ProductScreen />} />
           <Route path="/cart/:id?" element={<CartScreen />} />
             <Route path="/login" element={<LoginScreen />} />
             <Route path="/register" element={<RegisterScreen />} />
             <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
             <Route path="/payment" element={<PaymentScreen />} />
             <Route path="/placeorder" element={<PlaceOrderScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

