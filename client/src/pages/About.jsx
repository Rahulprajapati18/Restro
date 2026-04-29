import { motion, useScroll, useTransform } from 'framer-motion';
import { FaAward, FaUsers, FaHeart, FaUtensils, FaStar, FaTrophy } from 'react-icons/fa';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const values = [
    {
      icon: <FaAward />,
      title: 'Excellence',
      description: 'We strive for perfection in every dish we serve'
    },
    {
      icon: <FaUsers />,
      title: 'Community',
      description: 'Building connections through shared dining experiences'
    },
    {
      icon: <FaHeart />,
      title: 'Passion',
      description: 'Our love for food drives everything we do'
    }
  ];

  const stats = [
    { icon: <FaUtensils />, number: '10+', label: 'Years Experience' },
    { icon: <FaStar />, number: '50K+', label: 'Happy Customers' },
    { icon: <FaTrophy />, number: '25+', label: 'Awards Won' },
    { icon: <FaAward />, number: '100+', label: 'Menu Items' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div ref={containerRef} className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-playfair font-bold text-gold-400 mb-4"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
            >
              About
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"
            >
              Samridhii
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A journey of culinary excellence and timeless elegance
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black/50 p-6 rounded-lg border border-gold-600/20 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-4xl text-gold-400 mb-3 flex justify-center group-hover:text-gold-300"
              >
                {stat.icon}
              </motion.div>
              <motion.h3
                className="text-3xl font-bold text-gold-400 mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-playfair text-gold-400"
            >
              Our Story
            </motion.h2>
            {[
              "Founded in 2015, Samridhii has become a beacon of fine dining excellence. Our name, meaning 'prosperity' in Sanskrit, reflects our commitment to enriching lives through exceptional culinary experiences.",
              "Our master chefs combine traditional techniques with modern innovation, creating dishes that are both familiar and surprising. Every ingredient is carefully selected, every flavor meticulously balanced.",
              "We believe that dining is more than just eating—it's an experience that engages all the senses and creates lasting memories."
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.2 }}
                className="text-gray-300 leading-relaxed text-lg"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="relative h-96 rounded-lg overflow-hidden group"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800"
              alt="Chef preparing food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-playfair text-gold-400 text-center mb-12"
          >
            Our Values
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)"
                }}
                className="text-center p-8 bg-black/50 rounded-lg border border-gold-600/20 group cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl text-gold-400 mb-4 flex justify-center relative z-10 group-hover:text-gold-300"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl font-playfair text-gold-400 mb-3 relative z-10">{value.title}</h3>
                <p className="text-gray-400 relative z-10">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/50 rounded-lg p-12 border border-gold-600/20 text-center relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-playfair text-gold-400 mb-8 relative z-10"
          >
            Awards & Recognition
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 relative z-10"
          >
            {[
              { emoji: '⭐', title: 'Michelin Star - 2023', subtitle: 'Excellence in Fine Dining' },
              { emoji: '🏆', title: 'Best Restaurant - 2024', subtitle: 'City Culinary Awards' },
              { emoji: '👨‍🍳', title: 'Chef of the Year - 2023', subtitle: 'National Gastronomy Association' },
              { emoji: '🌟', title: '5-Star Rating', subtitle: 'Food Critics Association' }
            ].map((award, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 bg-black/30 rounded-lg border border-gold-600/10 cursor-pointer"
              >
                <motion.p
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  className="text-3xl mb-2"
                >
                  {award.emoji}
                </motion.p>
                <p className="text-xl mb-2 text-gold-400">{award.title}</p>
                <p className="text-sm text-gray-400">{award.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
