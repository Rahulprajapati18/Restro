import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => { setIsLogin(!isLogin); setError(''); setFormData({ name: '', email: '', password: '' }); };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 pointer-events-none">
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
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -25, 0], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
            className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full"
            style={{ left: `${15 + i * 18}%`, top: `${20 + i * 12}%` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-playfair font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Samridhii
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Fine Dining Experience</p>
        </motion.div>

        <div className="bg-black/60 rounded-2xl border border-gold-600/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />

          {/* Tab Toggle */}
          <div className="flex relative z-10">
            {['Login', 'Register'].map((tab, i) => (
              <motion.button
                key={tab}
                onClick={() => { setIsLogin(i === 0); setError(''); setFormData({ name: '', email: '', password: '' }); }}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  (isLogin && i === 0) || (!isLogin && i === 1)
                    ? 'text-black bg-gradient-to-r from-gold-600 to-gold-500'
                    : 'text-gray-400 hover:text-gold-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <div className="p-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-playfair font-bold text-gold-400 mb-6">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-gold-400 mb-2 text-sm font-medium">Full Name</label>
                        <div className={`relative transition-all ${focused === 'name' ? 'scale-[1.01]' : ''}`}>
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600/50 text-sm" />
                          <input
                            type="text" name="name" value={formData.name} onChange={handleChange}
                            onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                            required
                            placeholder="Your full name"
                            className="w-full pl-11 pr-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`transition-all ${focused === 'email' ? 'scale-[1.01]' : ''}`}>
                    <label className="block text-gold-400 mb-2 text-sm font-medium">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600/50 text-sm" />
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-11 pr-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className={`transition-all ${focused === 'password' ? 'scale-[1.01]' : ''}`}>
                    <label className="block text-gold-400 mb-2 text-sm font-medium">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600/50 text-sm" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password" value={formData.password} onChange={handleChange}
                        onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                        required minLength="6"
                        placeholder="Min. 6 characters"
                        className="w-full pl-11 pr-12 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-600/50 hover:text-gold-400 transition"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                      >
                        ⚠️ {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(212,175,55,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg disabled:opacity-50 transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      isLogin ? 'Login' : 'Create Account'
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={switchMode} className="text-gray-400 hover:text-gold-400 transition text-sm">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <span className="text-gold-400 font-medium underline underline-offset-2">
                      {isLogin ? 'Register' : 'Login'}
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
