import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUtensils, FaClock, FaAward } from 'react-icons/fa';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const features = [
    { icon: <FaUtensils />, title: 'Exquisite Cuisine', desc: 'Crafted by master chefs' },
    { icon: <FaClock />, title: 'Open Daily', desc: '11 AM - 11 PM' },
    { icon: <FaAward />, title: 'Award Winning', desc: 'Best Restaurant 2024' }
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Menu Items' },
    { number: '10+', label: 'Years Experience' },
    { number: '5⭐', label: 'Rating' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920)',
            filter: 'brightness(0.35)',
            y: y1
          }}
        />

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10"
          style={{ opacity }}
        />

        {/* ── BACKGROUND ANIMATIONS ── */}

        {/* Radial gold glow in center */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.18) 0%, transparent 70%)'
          }}
        />

        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Slow-rotating large ring */}
        <motion.div
          className="absolute z-10 pointer-events-none rounded-full border border-gold-400/10"
          style={{ width: 700, height: 700, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute z-10 pointer-events-none rounded-full border border-gold-400/10"
          style={{ width: 500, height: 500, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating orbs */}
        {[
          { size: 300, x: '10%', y: '20%', dur: 18 },
          { size: 200, x: '80%', y: '15%', dur: 22 },
          { size: 250, x: '70%', y: '70%', dur: 20 },
          { size: 180, x: '15%', y: '75%', dur: 25 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none z-10"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}

        {/* Small rising sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute z-10 pointer-events-none rounded-full bg-gold-400"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              left: `${8 + i * 7.5}%`,
              bottom: '5%',
            }}
            animate={{ y: [0, -(120 + i * 20)], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 text-center px-4"
        >
          {/* Animated Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-playfair font-bold text-gold-400 mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Samridhii
          </motion.h1>

          {/* Punchline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-gold-400/80 text-sm md:text-base tracking-[0.3em] uppercase mb-3 font-light"
          >
            Where Every Bite Tells a Story
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-16 bg-gold-400/40" />
            <span className="text-gold-400/60 text-xs">✦</span>
            <div className="h-px w-16 bg-gold-400/40" />
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
          </motion.p>

          {/* CTA Buttons with Hover Effects */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="px-8 py-4 bg-gold-600 text-black font-semibold rounded-lg hover:bg-gold-500 transition transform hover:shadow-2xl hover:shadow-gold-600/50"
              >
                View Menu
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/booking"
                className="px-8 py-4 border-2 border-gold-600 text-gold-400 font-semibold rounded-lg hover:bg-gold-600 hover:text-black transition transform hover:shadow-2xl hover:shadow-gold-600/50"
              >
                Reserve Table
              </Link>
            </motion.div>
          </motion.div>


        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.h3
                  className="text-5xl font-bold text-gold-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features with 3D Effect */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-playfair font-bold text-gold-400 text-center mb-16"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="text-center p-8 bg-gradient-to-br from-black/50 to-gray-900/50 rounded-lg border border-gold-600/20 hover:border-gold-600/50 transition backdrop-blur-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className="text-5xl text-gold-400 mb-4 flex justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-playfair text-gold-400 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview with Parallax */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y: y2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-transparent" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-playfair font-bold text-gold-400 mb-6">
                Our Story
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Samridhii represents the pinnacle of fine dining, where tradition meets innovation. 
                Our culinary journey began with a simple vision: to create unforgettable dining 
                experiences that celebrate the art of gastronomy.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Every dish is crafted with passion, using the finest ingredients sourced from 
                local farms and international markets.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-block px-6 py-3 border border-gold-600 text-gold-400 rounded hover:bg-gold-600 hover:text-black transition"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[
            { left: '5%',  top: '10%', dur: 3.2, delay: 0.0 },
            { left: '20%', top: '70%', dur: 4.1, delay: 0.3 },
            { left: '40%', top: '30%', dur: 3.8, delay: 0.7 },
            { left: '60%', top: '80%', dur: 4.5, delay: 1.1 },
            { left: '75%', top: '15%', dur: 3.5, delay: 0.5 },
            { left: '85%', top: '55%', dur: 4.2, delay: 1.4 },
            { left: '15%', top: '45%', dur: 3.9, delay: 0.2 },
            { left: '50%', top: '60%', dur: 4.0, delay: 0.9 },
            { left: '30%', top: '85%', dur: 3.3, delay: 1.6 },
            { left: '90%', top: '35%', dur: 4.8, delay: 0.4 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 border border-gold-400 rounded-full"
              style={{ left: orb.left, top: orb.top }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: orb.dur, repeat: Infinity, delay: orb.delay }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4 relative z-10"
        >
          <motion.h2 
            className="text-5xl font-playfair font-bold text-gold-400 mb-6"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(212, 175, 55, 0.5)",
                "0 0 40px rgba(212, 175, 55, 0.8)",
                "0 0 20px rgba(212, 175, 55, 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ready for an Unforgettable Experience?
          </motion.h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your table now and indulge in culinary excellence
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/booking"
              className="inline-block px-10 py-4 bg-gold-600 text-black font-semibold text-lg rounded-lg hover:bg-gold-500 transition transform hover:shadow-2xl hover:shadow-gold-600/50"
            >
              Make a Reservation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
