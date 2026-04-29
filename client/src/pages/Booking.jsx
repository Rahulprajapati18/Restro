import { useState, useContext, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock, FaUsers, FaCheckCircle, FaUtensils } from 'react-icons/fa';

const Booking = () => {
  const { user } = useContext(AuthContext);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: new Date(),
    time: '19:00',
    guests: 2,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState('');
  const [step, setStep] = useState(1);

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const config = user
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};

      await axios.post('/api/bookings', formData, config);
      setSuccess(true);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'Booking failed. Please try again.';
      setMessage(errMsg);
      console.error('Booking error:', error.response?.data || error.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const features = [
    { icon: <FaUtensils />, text: 'Fine Dining Experience' },
    { icon: <FaUsers />, text: 'Up to 20 Guests' },
    { icon: <FaClock />, text: 'Flexible Time Slots' },
    { icon: <FaCalendarAlt />, text: 'Easy Rescheduling' }
  ];

  return (
    <div ref={containerRef} className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl"
        />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.02, 0.06, 0.02] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            style={{ left: `${5 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-playfair font-bold mb-4"
          >
            <span className="text-white">Reserve a </span>
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300"
          >
            Book your unforgettable dining experience
          </motion.p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-gold-600/20 rounded-full text-gold-400 text-sm"
            >
              <span className="text-gold-500">{f.icon}</span>
              {f.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Success State */}
        <AnimatePresence>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-black/50 rounded-xl p-12 border border-gold-600/20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-7xl text-green-400 flex justify-center mb-6"
              >
                <FaCheckCircle />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-playfair text-gold-400 mb-2"
              >
                Booking Confirmed!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mb-8"
              >
                We'll contact you on <span className="text-gold-400">{formData.phone}</span> to confirm your reservation.
              </motion.p>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black/60 border border-gold-600/20 rounded-xl p-6 mb-8 text-left max-w-sm mx-auto"
              >
                <h3 className="text-gold-400 font-playfair text-lg mb-4 text-center">Reservation Details</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: '👤 Name',    value: formData.name },
                    { label: '📧 Email',   value: formData.email },
                    { label: '📞 Phone',   value: formData.phone },
                    { label: '📅 Date',    value: new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    { label: '🕐 Time',    value: formData.time },
                    { label: '👥 Guests',  value: `${formData.guests} ${formData.guests === 1 ? 'Guest' : 'Guests'}` },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="text-white text-right">{row.value}</span>
                    </div>
                  ))}
                  {formData.specialRequests && (
                    <div className="pt-2 border-t border-gold-600/10">
                      <span className="text-gray-500 block mb-1">📝 Note</span>
                      <span className="text-gray-300 italic text-xs">"{formData.specialRequests}"</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSuccess(false); setMessage(''); setFormData({ ...formData, phone: '', specialRequests: '' }); }}
                className="px-8 py-3 bg-gold-600 text-black font-bold rounded-lg"
              >
                Make Another Booking
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-black/50 rounded-xl p-8 border border-gold-600/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                {/* Name */}
                <motion.div animate={{ scale: focused === 'name' ? 1.01 : 1 }}>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">Full Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div animate={{ scale: focused === 'email' ? 1.01 : 1 }}>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div animate={{ scale: focused === 'phone' ? 1.01 : 1 }}>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                  />
                  {formData.phone && !/^[0-9]{10}$/.test(formData.phone) && (
                    <p className="text-red-400 text-xs mt-1">Enter a valid 10-digit number</p>
                  )}
                </motion.div>

                {/* Guests */}
                <div>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">
                    <FaUsers className="inline mr-2" />Number of Guests
                  </label>
                  <select
                    name="guests" value={formData.guests} onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all"
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">
                    <FaCalendarAlt className="inline mr-2" />Date
                  </label>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-gold-400 mb-2 text-sm font-medium">
                    <FaClock className="inline mr-2" />Time Slot
                  </label>
                  <select
                    name="time" value={formData.time} onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <motion.div
                animate={{ scale: focused === 'special' ? 1.01 : 1 }}
                className="mb-6 relative z-10"
              >
                <label className="block text-gold-400 mb-2 text-sm font-medium">Special Requests</label>
                <textarea
                  name="specialRequests" value={formData.specialRequests} onChange={handleChange}
                  onFocus={() => setFocused('special')} onBlur={() => setFocused('')}
                  rows="4"
                  placeholder="Dietary restrictions, special occasions, seating preferences..."
                  className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all resize-none"
                />
              </motion.div>

              {message && !success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 relative z-10"
                >
                  {message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg text-lg disabled:opacity-50 transition-all relative z-10"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Processing...
                  </span>
                ) : (
                  'Confirm Reservation'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;
