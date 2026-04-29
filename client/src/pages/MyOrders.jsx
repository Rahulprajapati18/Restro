import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaShoppingBag, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const statusColor = (s) => {
  if (s === 'delivered')  return 'bg-green-500/20 text-green-400 border-green-500/30';
  if (s === 'confirmed')  return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  if (s === 'preparing')  return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  if (s === 'cancelled')  return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-black">
      <motion.div animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-gold-600/30 border-t-gold-600 rounded-full" />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-5xl font-playfair font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-1">
            My Orders
          </h1>
          <p className="text-gray-500 text-sm">All orders placed by you</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24">
            <FaShoppingBag className="text-6xl mx-auto mb-4 text-gold-600/20" />
            <p className="text-gold-400 text-xl font-playfair mb-2">No orders yet</p>
            <p className="text-gray-500 text-sm mb-6">Looks like you haven't ordered anything</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/order')}
              className="px-6 py-3 bg-gold-600 text-black font-bold rounded-lg text-sm">
              Order Now
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div key={order._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-black/60 border border-gold-600/20 rounded-xl overflow-hidden">

                {/* Header row — always visible */}
                <button onClick={() => toggle(order._id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gold-600/5 transition">
                  <div className="w-10 h-10 rounded-full bg-gold-600/10 border border-gold-600/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <FaShoppingBag />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                      {' · '}<span className="text-gold-400 font-semibold">₹{order.totalAmount}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border capitalize ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {expanded === order._id ? <FaChevronUp className="text-gray-500 text-xs" /> : <FaChevronDown className="text-gray-500 text-xs" />}
                  </div>
                </button>

                {/* Expanded details */}
                <AnimatePresence>
                  {expanded === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-gold-600/10 pt-4 space-y-4">

                        {/* Items */}
                        <div className="bg-black/40 rounded-lg p-3 space-y-2">
                          {order.items?.map((item, j) => (
                            <div key={j} className="flex justify-between text-sm">
                              <span className="text-gray-300">
                                {item.name}
                                <span className="text-gray-500 ml-1">×{item.quantity}</span>
                                {item.modification && (
                                  <span className="text-gold-400/60 italic text-xs ml-2">({item.modification})</span>
                                )}
                              </span>
                              <span className="text-gold-400 font-medium">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                          <div className="border-t border-gold-600/10 pt-2 flex justify-between font-bold text-sm">
                            <span className="text-gray-300">Total</span>
                            <span className="text-gold-400">₹{order.totalAmount}</span>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-black/30 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Order Type</p>
                            <p className="text-white capitalize">{order.orderType}</p>
                          </div>
                          <div className="bg-black/30 rounded-lg p-3">
                            <p className="text-gray-500 mb-1">Payment</p>
                            <p className="text-white">
                              {order.paymentMethod === 'online' ? '💳 Online' : '💵 Cash on Delivery'}
                            </p>
                            {order.paymentStatus && (
                              <p className={`text-[10px] mt-0.5 ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}
                              </p>
                            )}
                          </div>
                          {order.deliveryAddress && (
                            <div className="bg-black/30 rounded-lg p-3 col-span-2">
                              <p className="text-gray-500 mb-1">Delivery Address</p>
                              <p className="text-white">{order.deliveryAddress}</p>
                            </div>
                          )}
                          {order.addOnMessage && (
                            <div className="bg-black/30 rounded-lg p-3 col-span-2">
                              <p className="text-gray-500 mb-1">Kitchen Note</p>
                              <p className="text-gray-300 italic">"{order.addOnMessage}"</p>
                            </div>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
