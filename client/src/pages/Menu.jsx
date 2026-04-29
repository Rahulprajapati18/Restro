import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaLeaf, FaFire, FaDrumstickBite } from 'react-icons/fa';

// ── STATIC MENU DATA ──────────────────────────────────────────────
const MENU = [
  // Veg Starters
  { id: 1,  name: 'Mushroom Pakoda',    category: 'Veg',  price: 59,  veg: true },
  { id: 2,  name: 'Crispy Paneer',      category: 'Veg',  price: 79,  veg: true, best: true },
  { id: 3,  name: 'Paneer Stick',       category: 'Veg',  price: 79,  veg: true },
  { id: 4,  name: 'Paneer Strenge',     category: 'Veg',  price: 79,  veg: true },
  { id: 5,  name: 'Balie Paneer',       category: 'Veg',  price: 79,  veg: true },

  // Non-Veg Starters
  { id: 6,  name: 'Chicken Chili',      category: 'Non-Veg',  price: 109, veg: false, best: true },
  { id: 7,  name: 'Garlic Chicken',     category: 'Non-Veg',  price: 119, veg: false },
  { id: 8,  name: 'Ginger Chicken',     category: 'Non-Veg',  price: 119, veg: false },
  { id: 9,  name: 'Chicken 65',         category: 'Non-Veg',  price: 119, veg: false },
  { id: 10, name: 'Chicken Manchurian', category: 'Non-Veg',  price: 119, veg: false, best: true },

  // Chowmein (Non-Veg)
  { id: 11, name: 'Egg Chowmein',           category: 'Chowmein',    price: 59,  veg: false },
  { id: 12, name: 'Chicken Chowmein',       category: 'Chowmein',    price: 59,  veg: false, best: true },
  { id: 13, name: 'Egg Chicken Chowmein',   category: 'Chowmein',    price: 69,  veg: false },
  { id: 14, name: 'Egg Chicken Pan Fried',  category: 'Chowmein',    price: 129, veg: false },
  { id: 15, name: 'Hakka Noodles',          category: 'Chowmein',    price: 79,  veg: false, best: true },
  { id: 16, name: 'Garlic Noodles',         category: 'Chowmein',    price: 89,  veg: false },
  // Veg Chowmein
  { id: 17, name: 'Paneer Chowmein',        category: 'Chowmein',    price: 59,  veg: true },
  { id: 18, name: 'Mushroom Chowmein',      category: 'Chowmein',    price: 69,  veg: true },

  // Biryani
  { id: 200, name: 'Veg Biryani',             category: 'Biryani', price: 149, veg: true },
  { id: 201, name: 'Paneer Biryani',          category: 'Biryani', price: 169, veg: true, best: true },
  { id: 202, name: 'Mushroom Biryani',        category: 'Biryani', price: 159, veg: true },
  { id: 203, name: 'Soya Biryani',            category: 'Biryani', price: 149, veg: true },
  { id: 204, name: 'Chicken Biryani',         category: 'Biryani', price: 179, veg: false, best: true },
  { id: 205, name: 'Chicken Dum Biryani',     category: 'Biryani', price: 199, veg: false, best: true },
  { id: 206, name: 'Egg Biryani',             category: 'Biryani', price: 159, veg: false },
  { id: 207, name: 'Mutton Biryani',          category: 'Biryani', price: 249, veg: false, best: true },
  { id: 208, name: 'Hyderabadi Biryani',      category: 'Biryani', price: 219, veg: false },
  { id: 209, name: 'Schezwan Chicken Biryani',category: 'Biryani', price: 209, veg: false },
  { id: 19, name: 'Mixed Chowmein',         category: 'Chowmein',    price: 69,  veg: true },
  { id: 20, name: 'Pan Fried Noodles',      category: 'Chowmein',    price: 119, veg: true },
  { id: 21, name: 'Gravy Noodles',          category: 'Chowmein',    price: 79,  veg: true },

  // Rolls
  { id: 22, name: 'Egg Roll',               category: 'Rolls',       price: 59,  veg: false },
  { id: 23, name: 'Egg Chicken Roll',       category: 'Rolls',       price: 69,  veg: false },
  { id: 24, name: 'Double Egg Chicken Roll',category: 'Rolls',       price: 79,  veg: false },
  { id: 25, name: 'Crispy Chicken Roll',    category: 'Rolls',       price: 89,  veg: false, best: true },
  { id: 26, name: 'Chicken Tikka Roll',     category: 'Rolls',       price: 89,  veg: false },
  { id: 27, name: 'Pop Corn Roll',          category: 'Rolls',       price: 99,  veg: false },
  { id: 28, name: 'Paneer Roll',            category: 'Rolls',       price: 59,  veg: true },
  { id: 29, name: 'Mushroom Roll',          category: 'Rolls',       price: 69,  veg: true },
  { id: 30, name: 'Veg Mix Roll',           category: 'Rolls',       price: 69,  veg: true, best: true },

  // Rice
  { id: 31, name: 'Egg Fried Rice',              category: 'Rice', price: 79,  veg: false },
  { id: 32, name: 'Egg Chicken Fried Rice',      category: 'Rice', price: 89,  veg: false, best: true },
  { id: 33, name: 'Schezwan Egg Chicken Fried Rice', category: 'Rice', price: 99, veg: false },
  { id: 34, name: 'Steam Rice',             category: 'Rice', price: 59,  veg: true },
  { id: 35, name: 'Fried Rice',             category: 'Rice', price: 69,  veg: true },
  { id: 36, name: 'Paneer Fried Rice',      category: 'Rice', price: 79,  veg: true },
  { id: 37, name: 'Mushroom Fried Rice',    category: 'Rice', price: 79,  veg: true },
  { id: 38, name: 'Mixed Fried Rice',       category: 'Rice', price: 89,  veg: true, best: true },
  { id: 39, name: 'Jeera Rice',             category: 'Rice', price: 79,  veg: true },
  { id: 40, name: 'Lemon Rice',             category: 'Rice', price: 89,  veg: true },

  // Manchurian
  { id: 41, name: 'Paneer Manchurian',   category: 'Manchurian', price: 89,  veg: true },
  { id: 42, name: 'Veg Manchurian',      category: 'Manchurian', price: 89,  veg: true },
  { id: 43, name: 'Mushroom Manchurian', category: 'Manchurian', price: 89,  veg: true },
  { id: 44, name: 'Paneer Chili',        category: 'Manchurian', price: 89,  veg: true, best: true },
  { id: 45, name: 'Mushroom Chili',      category: 'Manchurian', price: 89,  veg: true },
  { id: 46, name: 'Gobhi Chili',         category: 'Manchurian', price: 89,  veg: true },
  { id: 47, name: 'Baby Corn Chili',     category: 'Manchurian', price: 89,  veg: true },

  // Breads
  { id: 48, name: 'Tawa Roti',       category: 'Breads', price: 8,   veg: true },
  { id: 49, name: 'Lachha Paratha',  category: 'Breads', price: 20,  veg: true, best: true },
  { id: 50, name: 'Paneer Paratha',  category: 'Breads', price: 35,  veg: true },
  { id: 51, name: 'Mushroom Paratha',category: 'Breads', price: 35,  veg: true },
  { id: 52, name: 'Tawa Paratha',    category: 'Breads', price: 15,  veg: true },

  // Veg Curries (Herbivores Main)
  { id: 53, name: 'Paneer Butter Masala',   category: 'Veg Curry', price: 99,  veg: true, best: true },
  { id: 54, name: 'Kadhai Paneer',          category: 'Veg Curry', price: 109, veg: true, best: true },
  { id: 55, name: 'Paneer Do Pyaza',        category: 'Veg Curry', price: 109, veg: true },
  { id: 56, name: 'Paneer Hyderabadi',      category: 'Veg Curry', price: 119, veg: true },
  { id: 57, name: 'Paneer Punjabi',         category: 'Veg Curry', price: 109, veg: true },
  { id: 58, name: 'Paneer Curry',           category: 'Veg Curry', price: 99,  veg: true },
  { id: 59, name: 'Mutter Paneer',          category: 'Veg Curry', price: 99,  veg: true },
  { id: 60, name: 'Paneer Lababdar',        category: 'Veg Curry', price: 109, veg: true },
  { id: 61, name: 'Paneer Tikka Masala',    category: 'Veg Curry', price: 129, veg: true, best: true },
  { id: 62, name: 'Paneer Tikka Lababdar',  category: 'Veg Curry', price: 129, veg: true },
  { id: 63, name: 'Paneer Lachhedaar',      category: 'Veg Curry', price: 119, veg: true },
  { id: 64, name: 'Paneer Bharta',          category: 'Veg Curry', price: 109, veg: true },
  { id: 65, name: 'Paneer Hariyali',        category: 'Veg Curry', price: 119, veg: true },
  { id: 66, name: 'Mushroom Curry',         category: 'Veg Curry', price: 119, veg: true },
  { id: 67, name: 'Mushroom Masala',        category: 'Veg Curry', price: 99,  veg: true, best: true },
  { id: 68, name: 'Mushroom Butter Masala', category: 'Veg Curry', price: 99,  veg: true },
  { id: 69, name: 'Kadai Mushroom',         category: 'Veg Curry', price: 109, veg: true },
  { id: 70, name: 'Mushroom Do Pyaza',      category: 'Veg Curry', price: 109, veg: true },
  { id: 71, name: 'Mushroom Hyderabadi',    category: 'Veg Curry', price: 129, veg: true },
  { id: 72, name: 'Mushroom Punjabi',       category: 'Veg Curry', price: 109, veg: true },
  { id: 73, name: 'Mix Veg Curry',          category: 'Veg Curry', price: 99,  veg: true },
  { id: 74, name: 'Gobhi Masala',           category: 'Veg Curry', price: 99,  veg: true },
  { id: 75, name: 'Dal Fry',               category: 'Veg Curry', price: 69,  veg: true },
  { id: 76, name: 'Kasturi Paneer',         category: 'Veg Curry', price: 119, veg: true },
  { id: 77, name: 'Veg Kofta',             category: 'Veg Curry', price: 109, veg: true },
  { id: 78, name: 'Kemma Veg',             category: 'Veg Curry', price: 99,  veg: true },
  { id: 79, name: 'Green Peas Masala',     category: 'Veg Curry', price: 89,  veg: true },

  // Veg Soup
  { id: 80, name: 'Hot and Shower Soup',   category: 'Soup', price: 69,  veg: true },
  { id: 81, name: 'Manchow Soup',          category: 'Soup', price: 69,  veg: true, best: true },
  { id: 82, name: 'Lemon Coriander Soup',  category: 'Soup', price: 59,  veg: true },

  // Chicken Curries (Carnivores Main)
  { id: 83, name: 'Chicken Curry',          category: 'Chicken', price: 109, veg: false, best: true },
  { id: 84, name: 'Chicken Masala',         category: 'Chicken', price: 109, veg: false },
  { id: 85, name: 'Chicken Butter Masala',  category: 'Chicken', price: 109, veg: false, best: true },
  { id: 86, name: 'Chicken Dopyaza',        category: 'Chicken', price: 119, veg: false },
  { id: 87, name: 'Chicken Punjabi',        category: 'Chicken', price: 119, veg: false },
  { id: 88, name: 'Chicken Hyderabadi',     category: 'Chicken', price: 129, veg: false },
  { id: 89, name: 'Kasturi Chicken',        category: 'Chicken', price: 129, veg: false },
  { id: 90, name: 'Kadhai Chicken',         category: 'Chicken', price: 119, veg: false },
  { id: 91, name: 'Chicken Mughlai',        category: 'Chicken', price: 129, veg: false },
  { id: 92, name: 'Chicken Lababdar',       category: 'Chicken', price: 129, veg: false },
  { id: 93, name: 'Chicken Tikka Masala',   category: 'Chicken', price: 139, veg: false, best: true },
  { id: 94, name: 'Chicken Tikka Lababdar', category: 'Chicken', price: 139, veg: false },
  { id: 95, name: 'Chicken Patiala',        category: 'Chicken', price: 139, veg: false },
  { id: 96, name: 'Dum ka Murg',            category: 'Chicken', price: 189, veg: false },
  { id: 97, name: 'Chicken Begam Bahar',    category: 'Chicken', price: 139, veg: false },
  { id: 98, name: 'Hariyali Chicken',       category: 'Chicken', price: 129, veg: false, best: true },
  { id: 99, name: 'Chicken Bharta',         category: 'Chicken', price: 119, veg: false },
  { id: 100,name: 'Chicken Korma',          category: 'Chicken', price: 149, veg: false },
  { id: 101,name: 'Chicken Kali Mirch',     category: 'Chicken', price: 129, veg: false },
  { id: 102,name: 'Chicken Rogan Juice',    category: 'Chicken', price: 129, veg: false },
  { id: 103,name: 'Chicken Raharaa',        category: 'Chicken', price: 139, veg: false },
  { id: 104,name: 'Egg Omlette Curry',      category: 'Chicken', price: 89,  veg: false },
  { id: 105,name: 'Chicken Barishta Masala',category: 'Chicken', price: 129, veg: false },
  { id: 106,name: 'Chicken Kofta Masala',   category: 'Chicken', price: 129, veg: false },

  // Chicken Soup
  { id: 107,name: 'Chicken Hot and Shower', category: 'Soup', price: 69,  veg: false },
  { id: 108,name: 'Chicken Manchow',        category: 'Soup', price: 69,  veg: false },
  { id: 109,name: 'Chicken Lemon Coriander',category: 'Soup', price: 69,  veg: false },

  // Mojito
  { id: 110,name: 'Blue Lagoon Mojito',  category: 'Beverages', price: 59,  veg: true },
  { id: 111,name: 'Lemon Mojito',        category: 'Beverages', price: 59,  veg: true, best: true },
  { id: 112,name: 'Orange Mojito',       category: 'Beverages', price: 59,  veg: true },
  { id: 113,name: 'Black Currant Mojito',category: 'Beverages', price: 59,  veg: true },
  { id: 114,name: 'Green Apple Mojito',  category: 'Beverages', price: 59,  veg: true },
  { id: 115,name: 'Blue Berry Mojito',   category: 'Beverages', price: 69,  veg: true },
  { id: 116,name: 'Virgin Mojito',       category: 'Beverages', price: 59,  veg: true },
  // Shakes
  { id: 117,name: 'Oreo Shake',          category: 'Beverages', price: 89,  veg: true, best: true },
  { id: 118,name: 'KitKat Shake',        category: 'Beverages', price: 99,  veg: true },
  { id: 119,name: 'Vanilla Shake',       category: 'Beverages', price: 79,  veg: true },
  { id: 120,name: 'Masala Cold Drink',   category: 'Beverages', price: 39,  veg: true },
  { id: 121,name: 'Water',               category: 'Beverages', price: 20,  veg: true },
];

const CATEGORIES = [
  'All',
  'Veg',
  'Non-Veg',
  'Veg Curry',
  'Chicken',
  'Biryani',
  'Chowmein',
  'Manchurian',
  'Rolls',
  'Rice',
  'Breads',
  'Soup',
  'Beverages',
];

const categoryEmoji = {
  Veg: '🥦', 'Non-Veg': '🍗', 'Veg Curry': '🍛',
  Chicken: '🍖', Biryani: '🍚', Chowmein: '🍜', Manchurian: '🥘',
  Rolls: '🌯', Rice: '🍙', Breads: '🫓', Soup: '🍲', Beverages: '🥤',
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBestOnly, setShowBestOnly] = useState(false);

  const filtered = MENU.filter(item => {
    const matchCat  = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBest = !showBestOnly || item.best;
    return matchCat && matchSearch && matchBest;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl font-playfair font-bold text-gold-400 mb-3">Our Menu</h1>
          <p className="text-gray-400 text-lg">Charming Chinese · Indian Proud to Be</p>
          <div className="flex justify-center gap-6 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> Veg</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Non-Veg</span>
            <span className="flex items-center gap-1"><FaFire className="text-orange-400" /> Best Seller</span>
          </div>
        </motion.div>

        {/* Search + Best Seller toggle */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 text-sm transition"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBestOnly(!showBestOnly)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
              showBestOnly
                ? 'bg-orange-500 text-white'
                : 'bg-black/60 border border-gold-600/30 text-gold-400 hover:bg-gold-600/10'
            }`}
          >
            <FaFire /> {showBestOnly ? 'Best Sellers' : 'Best Sellers'}
          </motion.button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-gold-600 text-black shadow-md shadow-gold-600/30'
                  : 'bg-black/50 text-gold-400 border border-gold-600/20 hover:bg-gold-600/10'
              }`}
            >
              {cat !== 'All' && categoryEmoji[cat]} {cat}
            </motion.button>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-gray-500 text-sm mb-6">
          Showing <span className="text-gold-400 font-semibold">{filtered.length}</span> items
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchTerm + showBestOnly}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filtered.map(item => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  boxShadow: item.veg
                    ? '0 12px 30px rgba(34,197,94,0.15)'
                    : '0 12px 30px rgba(239,68,68,0.15)'
                }}
                className="relative bg-black/70 border border-white/5 rounded-xl p-3 flex flex-col gap-2 cursor-pointer group overflow-hidden transition-all duration-300 hover:border-gold-600/40"
              >
                {/* Glow bg on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
                  item.veg ? 'bg-green-500/5' : 'bg-red-500/5'
                }`} />

                {/* Veg / Non-veg dot */}
                <div className="flex items-center justify-between relative z-10">
                  <span className={`w-3 h-3 rounded-sm border-2 flex-shrink-0 ${
                    item.veg ? 'border-green-500' : 'border-red-500'
                  }`}>
                    <span className={`block w-1.5 h-1.5 rounded-sm m-auto mt-0.5 ${
                      item.veg ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </span>
                  {item.best && (
                    <motion.span
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      className="text-orange-400 text-xs"
                    >
                      <FaFire />
                    </motion.span>
                  )}
                </div>

                {/* Name */}
                <p className="text-white text-xs font-medium leading-snug relative z-10 group-hover:text-gold-300 transition-colors duration-200">
                  {item.name}
                </p>

                {/* Category tag */}
                <span className="text-[10px] text-gray-500 relative z-10">{item.category}</span>

                {/* Price */}
                <div className="mt-auto relative z-10">
                  <span className="text-gold-400 font-bold text-sm">₹{item.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gold-400 text-xl mb-1">No items found</p>
            <p className="text-gray-500 text-sm">Try a different search or category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
