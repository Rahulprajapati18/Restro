import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', details: '123 MG Road, Connaught Place, New Delhi - 110001', color: 'from-red-500/20' },
    { icon: <FaPhone />, title: 'Phone', details: '+91 98765 43210', color: 'from-green-500/20' },
    { icon: <FaEnvelope />, title: 'Email', details: 'info@samridhii.com', color: 'from-blue-500/20' },
    { icon: <FaClock />, title: 'Hours', details: 'Mon–Sun: 11:00 AM – 11:00 PM', color: 'from-purple-500/20' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div ref={containerRef} className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 0.8 }}
            className="absolute w-2 h-2 bg-gold-400 rounded-full"
            style={{ left: `${10 + i * 15}%`, top: `${20 + i * 10}%` }}
          />
        ))}
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-playfair font-bold mb-4"
          >
            <span className="text-white">Get in </span>
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300"
          >
            We'd love to hear from you
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8, boxShadow: '0 20px 40px rgba(212,175,55,0.15)' }}
              className={`bg-black/50 p-6 rounded-xl border border-gold-600/20 text-center group cursor-pointer relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${info.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                transition={{ duration: 0.5 }}
                className="text-4xl text-gold-400 mb-4 flex justify-center relative z-10"
              >
                {info.icon}
              </motion.div>
              <h3 className="text-xl font-playfair text-gold-400 mb-2 relative z-10">{info.title}</h3>
              <p className="text-gray-300 text-sm relative z-10">{info.details}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/50 rounded-xl p-8 border border-gold-600/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-playfair text-gold-400 mb-8 relative z-10"
            >
              Send us a Message
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Subject', name: 'subject', type: 'text' }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  animate={{ scale: focused === field.name ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-gold-400 mb-2 text-sm font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused('')}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all duration-300"
                  />
                </motion.div>
              ))}

              <motion.div
                animate={{ scale: focused === 'message' ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-gold-400 mb-2 text-sm font-medium">Message</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all duration-300 resize-none"
                />
              </motion.div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
                >
                  ✅ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg flex items-center justify-center gap-3 transition-all duration-300"
              >
                <FaPaperPlane />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden border border-gold-600/20 relative group"
          >
            <div className="absolute inset-0 border-2 border-gold-600/0 group-hover:border-gold-600/30 rounded-xl transition-all duration-500 z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2090!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen=""
              loading="lazy"
              title="Samridhii Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
