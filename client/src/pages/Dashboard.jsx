import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import {
  FaUtensils, FaCalendarAlt, FaShoppingBag, FaTrash,
  FaCheck, FaTimes, FaChartBar, FaUsers, FaRupeeSign,
  FaUserCircle, FaCrown, FaStar, FaCommentAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [menuItems, setMenuItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [menuRes, bookingsRes, ordersRes] = await Promise.all([
        axios.get('/api/menu', config),
        axios.get('/api/bookings/all', config),
        axios.get('/api/orders/all', config)
      ]);
      setMenuItems(menuRes.data);
      setBookings(bookingsRes.data);
      setOrders(ordersRes.data);
      try {
        const usersRes = await axios.get('/api/auth/users', config);
        // Handle both array and {data: [...]} response shapes
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.data || []);
      } catch (e) { console.error('Users fetch error:', e.message); setUsers([]); }
      try {
        const fbRes = await axios.get('/api/feedback/all', config);
        setFeedbacks(fbRes.data);
      } catch { setFeedbacks([]); }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const tabs = [
    { id: 'overview',  label: 'Overview',  icon: <FaChartBar /> },
    { id: 'users',     label: 'Users',     icon: <FaUsers /> },
    { id: 'bookings',  label: 'Bookings',  icon: <FaCalendarAlt /> },
    { id: 'orders',    label: 'Orders',    icon: <FaShoppingBag /> },
    { id: 'feedback',  label: 'Feedback',  icon: <FaCommentAlt /> },
    { id: 'menu',      label: 'Menu',      icon: <FaUtensils /> },
  ];

  const stats = [
    { label: 'Menu Items',       value: menuItems.length,                                    icon: <FaUtensils />,    color: 'from-gold-600/20 to-gold-600/5' },
    { label: 'Registered Users', value: users.length,                                        icon: <FaUsers />,       color: 'from-purple-600/20 to-purple-600/5' },
    { label: 'Total Bookings',   value: bookings.length,                                     icon: <FaCalendarAlt />, color: 'from-blue-600/20 to-blue-600/5' },
    { label: 'Total Orders',     value: orders.length,                                       icon: <FaShoppingBag />, color: 'from-green-600/20 to-green-600/5' },
    { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length, icon: <FaCalendarAlt />, color: 'from-yellow-600/20 to-yellow-600/5' },
    { label: 'Total Feedback',   value: feedbacks.length,                                    icon: <FaCommentAlt />,  color: 'from-pink-600/20 to-pink-600/5' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gold-600/30 border-t-gold-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, {user?.name} — manage your restaurant</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-10 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl capitalize font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-black shadow-lg shadow-gold-600/20'
                  : 'bg-black/50 text-gold-400 border border-gold-600/30 hover:border-gold-600/60'
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(212,175,55,0.15)' }}
                    className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl border border-gold-600/20 cursor-pointer`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl text-gold-400 mb-3"
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                      className="text-4xl font-bold text-white mb-1"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Bookings Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/50 rounded-xl border border-gold-600/20 p-6"
              >
                <h2 className="text-2xl font-playfair text-gold-400 mb-6">Recent Bookings</h2>
                {bookings.slice(0, 5).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No bookings yet</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((b, i) => (
                      <motion.div
                        key={b._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gold-600/10"
                      >
                        <div>
                          <p className="text-white font-medium">{b.name}</p>
                          <p className="text-gray-400 text-sm">{new Date(b.date).toLocaleDateString('en-IN')} at {b.time} · {b.guests} guests</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          b.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {b.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-playfair text-gold-400 mb-6">
                Registered Users ({users.length})
              </h2>
              {users.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <FaUsers className="text-6xl mx-auto mb-4 text-gold-600/20" />
                  <p>No users registered yet</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-3"
                >
                  {users.map((u, i) => (
                    <motion.div
                      key={u.id || u._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="bg-black/50 p-5 rounded-xl border border-gold-600/20 flex items-center gap-4"
                    >
                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                        u.role === 'admin' ? 'bg-gold-600/20 text-gold-400' : 'bg-gray-700/50 text-gray-400'
                      }`}>
                        {u.role === 'admin' ? <FaCrown /> : <FaUserCircle />}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium truncate">{u.name}</p>
                          {u.role === 'admin' && (
                            <span className="text-[10px] px-2 py-0.5 bg-gold-600/20 text-gold-400 border border-gold-600/30 rounded-full flex-shrink-0">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm truncate">{u.email}</p>
                      </div>

                      {/* Joined date */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-gray-500 text-xs">Joined</p>
                        <p className="text-gray-300 text-sm">
                          {new Date(u.created_at || u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      {/* Serial */}
                      <div className="w-8 h-8 rounded-full bg-black/40 border border-gold-600/10 flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                        {i + 1}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-playfair text-gold-400">
                  Customer Feedback ({feedbacks.length})
                </h2>
                {feedbacks.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gold-600/10 border border-gold-600/20 rounded-xl">
                    <FaStar className="text-gold-400" />
                    <span className="text-gold-400 font-bold text-lg">
                      {(feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">avg rating</span>
                  </div>
                )}
              </div>

              {feedbacks.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 text-gray-500">
                  <FaCommentAlt className="text-6xl mx-auto mb-4 text-gold-600/20" />
                  <p>No feedback received yet</p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {feedbacks.map((fb) => (
                    <motion.div
                      key={fb._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="bg-black/50 p-5 rounded-xl border border-gold-600/20 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-3 relative z-10">
                        {[1,2,3,4,5].map(s => (
                          <FaStar key={s} className={s <= fb.rating ? 'text-gold-400' : 'text-gray-700'} />
                        ))}
                        <span className="ml-auto text-gray-500 text-xs">
                          {new Date(fb.created_at || fb.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Message */}
                      {fb.message && (
                        <p className="text-gray-300 text-sm italic mb-3 relative z-10">
                          "{fb.message}"
                        </p>
                      )}

                      {/* Name */}
                      <div className="flex items-center gap-2 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-gold-600/20 border border-gold-600/30 flex items-center justify-center text-gold-400 text-xs font-bold">
                          {fb.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-400 text-sm">{fb.name}</span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                          fb.rating >= 4 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          fb.rating === 3 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {['','Poor','Fair','Good','Very Good','Excellent'][fb.rating]}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-playfair text-gold-400">Menu Items ({menuItems.length})</h2>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-3"
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="bg-black/50 p-5 rounded-xl border border-gold-600/20 flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold-600/10 rounded-lg flex items-center justify-center text-gold-400">
                        <FaUtensils />
                      </div>
                      <div>
                        <h3 className="text-lg text-gold-400 font-playfair flex items-center gap-2">
                          {item.name}
                          {item.isBestSeller && <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">🔥 Best Seller</span>}
                        </h3>
                        <p className="text-gray-400 text-sm">{item.category} · <span className="text-gold-500">₹{item.price}</span></p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => deleteMenuItem(item._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/40 transition opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-playfair text-gold-400 mb-6">Bookings ({bookings.length})</h2>
              {bookings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-gray-500"
                >
                  <FaCalendarAlt className="text-6xl mx-auto mb-4 text-gold-600/20" />
                  <p>No bookings yet</p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4"
                >
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="bg-black/50 p-6 rounded-xl border border-gold-600/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl text-gold-400 font-playfair">{booking.name}</h3>
                          <p className="text-gray-400 text-sm">{booking.email}{booking.phone ? ` · ${booking.phone}` : ''}</p>
                          <p className="text-gray-300 mt-2">
                            📅 {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at {booking.time}
                          </p>
                          <p className="text-gray-300">👥 {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                          {booking.specialRequests && (
                            <p className="text-gray-400 text-sm mt-2 italic">"{booking.specialRequests}"</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg hover:bg-green-600/40 transition text-sm"
                        >
                          <FaCheck /> Confirm
                        </motion.button>
                        <motion.button
                          onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/40 transition text-sm"
                        >
                          <FaTimes /> Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-playfair text-gold-400 mb-6">Orders ({orders.length})</h2>
              {orders.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 text-gray-500">
                  <FaShoppingBag className="text-6xl mx-auto mb-4 text-gold-600/20" />
                  <p>No orders yet</p>
                </motion.div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.005 }}
                      className="bg-black/50 p-6 rounded-xl border border-gold-600/20"
                    >
                      {/* Header row */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl text-gold-400 font-playfair">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </h3>
                          <p className="text-gray-400 text-sm mt-0.5">
                            👤 {order.customerName} · 📞 {order.customerPhone}
                          </p>
                          {order.customerEmail && (
                            <p className="text-gray-500 text-xs">{order.customerEmail}</p>
                          )}
                          <p className="text-gray-400 text-sm mt-1 capitalize">
                            🛵 {order.orderType}
                            {order.deliveryAddress && ` · ${order.deliveryAddress}`}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          order.status === 'delivered'  ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          order.status === 'confirmed'  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          order.status === 'preparing'  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          order.status === 'cancelled'  ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Items list */}
                      <div className="bg-black/30 rounded-lg p-3 mb-4 space-y-1.5">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
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
                        <div className="border-t border-gold-600/10 pt-2 flex justify-between font-bold">
                          <span className="text-gray-300">Total</span>
                          <span className="text-gold-400">₹{order.totalAmount}</span>
                        </div>
                      </div>

                      {/* Add-on message */}
                      {order.addOnMessage && (
                        <p className="text-gray-400 text-xs italic mb-4">
                          📝 "{order.addOnMessage}"
                        </p>
                      )}

                      {/* Payment info */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.paymentMethod === 'online'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {order.paymentMethod === 'online' ? '💳 Online' : '💵 Cash on Delivery'}
                        </span>
                        {order.paymentDetail && (
                          <span className="text-gray-500 text-xs">{order.paymentDetail}</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Payment Pending'}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          onClick={() => updateOrderStatus(order._id, 'confirmed')}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg hover:bg-green-600/40 transition text-sm"
                        >
                          <FaCheck /> Accept
                        </motion.button>
                        <motion.button
                          onClick={() => updateOrderStatus(order._id, 'preparing')}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded-lg hover:bg-yellow-600/40 transition text-sm"
                        >
                          🍳 Preparing
                        </motion.button>
                        <motion.button
                          onClick={() => updateOrderStatus(order._id, 'delivered')}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/40 transition text-sm"
                        >
                          ✅ Delivered
                        </motion.button>
                        <motion.button
                          onClick={() => updateOrderStatus(order._id, 'cancelled')}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/40 transition text-sm"
                        >
                          <FaTimes /> Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
