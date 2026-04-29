import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

// ── Custom SVG Logo ──────────────────────────────────────────────
const SamridhiiLogo = () => (
  <svg viewBox="0 0 260 52" width="220" height="44" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7e07a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#a07820" />
      </linearGradient>
      <linearGradient id="plateGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f7e07a" />
        <stop offset="100%" stopColor="#c8960c" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* ── Decorative left flourish ── */}
    <path d="M 4 26 Q 8 20 12 26 Q 16 32 20 26" stroke="url(#logoGold)" strokeWidth="1.2" fill="none" opacity="0.6" />
    <line x1="2" y1="26" x2="4" y2="26" stroke="url(#logoGold)" strokeWidth="1" opacity="0.5" />

    {/* ── Main wordmark "SAMRIDHII" ── */}
    <text
      x="130" y="33"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="24"
      fontWeight="bold"
      fill="url(#logoGold)"
      letterSpacing="4"
      textAnchor="middle"
      filter="url(#glow)"
    >
      SAMRIDHII
    </text>

    {/* ── Tagline ── */}
    <text
      x="130" y="45"
      fontFamily="'Trebuchet MS', Arial, sans-serif"
      fontSize="6.5"
      fill="#d4af37"
      letterSpacing="3.5"
      textAnchor="middle"
      opacity="0.75"
    >
      FINE INDIAN DINING
    </text>

    {/* ── Decorative right flourish ── */}
    <path d="M 240 26 Q 244 20 248 26 Q 252 32 256 26" stroke="url(#logoGold)" strokeWidth="1.2" fill="none" opacity="0.6" />
    <line x1="256" y1="26" x2="258" y2="26" stroke="url(#logoGold)" strokeWidth="1" opacity="0.5" />

    {/* ── Top thin rule ── */}
    <line x1="22" y1="14" x2="238" y2="14" stroke="url(#logoGold)" strokeWidth="0.5" opacity="0.4" />

    {/* ── Bottom thin rule ── */}
    <line x1="22" y1="50" x2="238" y2="50" stroke="url(#logoGold)" strokeWidth="0.5" opacity="0.4" />

    {/* ── Small diamond ornaments on rules ── */}
    <polygon points="130,11 132,14 130,17 128,14" fill="url(#logoGold)" opacity="0.7" />
    <polygon points="130,47 132,50 130,53 128,50" fill="url(#logoGold)" opacity="0.7" />

    {/* ── Left corner diamonds ── */}
    <polygon points="22,12 24,14 22,16 20,14" fill="url(#logoGold)" opacity="0.5" />
    <polygon points="238,12 240,14 238,16 236,14" fill="url(#logoGold)" opacity="0.5" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Order', path: '/order' },
    { name: 'Booking', path: '/booking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gold-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SamridhiiLogo />
            </motion.div>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-gold-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Logged-in user pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gold-600/10 border border-gold-600/20 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center text-black text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gold-400 text-sm font-medium">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="text-[10px] bg-gold-600 text-black px-1.5 py-0.5 rounded-full font-bold">Admin</span>
                  )}
                </div>

                <Link to="/my-orders"
                  className="px-3 py-2 text-gold-400 border border-gold-600/30 rounded hover:bg-gold-600/10 transition text-sm flex items-center gap-1">
                  📦 My Orders
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-gold-600 text-black rounded hover:bg-gold-500 transition"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gold-600 text-gold-400 rounded hover:bg-gold-600 hover:text-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-gold-600 text-black rounded hover:bg-gold-500 transition flex items-center gap-2"
              >
                <FaUser /> Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 border-t border-gold-600/20"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gold-400 transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                {/* Mobile logged-in indicator */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-gold-600/10 border border-gold-600/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center text-black font-bold flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gold-400 text-sm font-medium truncate">{user.name}</p>
                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <span className="text-[10px] bg-gold-600 text-black px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">Admin</span>
                  )}
                </div>
                {user.role === 'admin' && (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 bg-gold-600 text-black rounded text-center">
                    Dashboard
                  </Link>
                )}
                <Link to="/my-orders" onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 border border-gold-600/30 text-gold-400 rounded text-center text-sm">
                  📦 My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-gold-600 text-gold-400 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-gold-600 text-black rounded text-center"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
