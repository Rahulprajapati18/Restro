import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

import Order from './pages/Order';
import MyOrders from './pages/MyOrders';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
        <Route path="/my-orders" element={<PageTransition><MyOrders /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
