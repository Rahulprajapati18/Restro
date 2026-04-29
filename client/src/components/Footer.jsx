import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    try {
      await axios.post('/api/feedback', { name, rating, message: feedback });
    } catch (err) {
      console.error('Feedback error:', err.message);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback('');
      setName('');
    }, 4000);
  };

  return (
    <footer className="bg-black border-t border-gold-600/20">

      {/* ── Feedback Section ── */}
      <div className="border-b border-gold-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-playfair text-gold-400 mb-2"
            >
              Share Your Experience
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm mb-8"
            >
              Your feedback helps us serve you better
            </motion.p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10"
                >
                  <div className="text-5xl mb-4">🙏</div>
                  <p className="text-gold-400 text-xl font-playfair">Thank you for your feedback!</p>
                  <p className="text-gray-500 text-sm mt-2">We truly appreciate it.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Star Rating */}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="text-3xl transition-colors duration-150"
                      >
                        <FaStar className={
                          star <= (hovered || rating)
                            ? 'text-gold-400'
                            : 'text-gray-700'
                        } />
                      </motion.button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gold-400/70 text-xs"
                    >
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][rating]}
                    </motion.p>
                  )}

                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gold-600/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 text-sm transition"
                  />

                  {/* Message */}
                  <textarea
                    rows={3}
                    placeholder="Tell us about your experience..."
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gold-600/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 text-sm resize-none transition"
                  />

                  <motion.button
                    type="submit"
                    disabled={!rating}
                    whileHover={{ scale: rating ? 1.03 : 1, boxShadow: rating ? '0 0 20px rgba(212,175,55,0.3)' : 'none' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                  >
                    Submit Feedback
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl font-playfair font-bold text-gold-400 mb-4">Samridhii</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Experience the finest Indian dining with exquisite flavors and elegant ambiance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold-400 hover:text-gold-300 text-xl transition"><FaFacebook /></a>
              <a href="#" className="text-gold-400 hover:text-gold-300 text-xl transition"><FaInstagram /></a>
              <a href="#" className="text-gold-400 hover:text-gold-300 text-xl transition"><FaTwitter /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-playfair text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[['Home','/'],['Menu','/menu'],['Order Online','/order'],['Reservations','/booking'],['About Us','/about'],['Contact','/contact']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-gold-400 transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-playfair text-gold-400 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span>123 MG Road, Connaught Place, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-gold-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-gold-400 flex-shrink-0" />
                <span>info@samridhii.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-600/20 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Samridhii. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
