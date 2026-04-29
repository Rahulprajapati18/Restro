import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaCheckCircle, FaSearch, FaFire } from 'react-icons/fa';
import UPIPayment from '../components/UPIPayment';

// ── reuse same menu data ──────────────────────────────────────────
const MENU = [
  { id:1,  name:'Mushroom Pakoda',     category:'Veg',       price:59,  veg:true },
  { id:2,  name:'Crispy Paneer',       category:'Veg',       price:79,  veg:true, best:true },
  { id:3,  name:'Paneer Stick',        category:'Veg',       price:79,  veg:true },
  { id:4,  name:'Paneer Strenge',      category:'Veg',       price:79,  veg:true },
  { id:5,  name:'Balie Paneer',        category:'Veg',       price:79,  veg:true },
  { id:6,  name:'Chicken Chili',       category:'Non-Veg',   price:109, veg:false, best:true },
  { id:7,  name:'Garlic Chicken',      category:'Non-Veg',   price:119, veg:false },
  { id:8,  name:'Ginger Chicken',      category:'Non-Veg',   price:119, veg:false },
  { id:9,  name:'Chicken 65',          category:'Non-Veg',   price:119, veg:false },
  { id:10, name:'Chicken Manchurian',  category:'Non-Veg',   price:119, veg:false, best:true },
  { id:11, name:'Egg Chowmein',        category:'Chowmein',  price:59,  veg:false },
  { id:12, name:'Chicken Chowmein',    category:'Chowmein',  price:59,  veg:false, best:true },
  { id:13, name:'Egg Chicken Chowmein',category:'Chowmein',  price:69,  veg:false },
  { id:14, name:'Egg Chicken Pan Fried',category:'Chowmein', price:129, veg:false },
  { id:15, name:'Hakka Noodles',       category:'Chowmein',  price:79,  veg:false, best:true },
  { id:16, name:'Garlic Noodles',      category:'Chowmein',  price:89,  veg:false },
  { id:17, name:'Paneer Chowmein',     category:'Chowmein',  price:59,  veg:true },
  { id:18, name:'Mushroom Chowmein',   category:'Chowmein',  price:69,  veg:true },
  { id:19, name:'Mixed Chowmein',      category:'Chowmein',  price:69,  veg:true },
  { id:20, name:'Pan Fried Noodles',   category:'Chowmein',  price:119, veg:true },
  { id:200,name:'Veg Biryani',         category:'Biryani',   price:149, veg:true },
  { id:201,name:'Paneer Biryani',      category:'Biryani',   price:169, veg:true, best:true },
  { id:202,name:'Mushroom Biryani',    category:'Biryani',   price:159, veg:true },
  { id:204,name:'Chicken Biryani',     category:'Biryani',   price:179, veg:false, best:true },
  { id:205,name:'Chicken Dum Biryani', category:'Biryani',   price:199, veg:false, best:true },
  { id:206,name:'Egg Biryani',         category:'Biryani',   price:159, veg:false },
  { id:207,name:'Mutton Biryani',      category:'Biryani',   price:249, veg:false, best:true },
  { id:22, name:'Egg Roll',            category:'Rolls',     price:59,  veg:false },
  { id:23, name:'Egg Chicken Roll',    category:'Rolls',     price:69,  veg:false },
  { id:25, name:'Crispy Chicken Roll', category:'Rolls',     price:89,  veg:false, best:true },
  { id:28, name:'Paneer Roll',         category:'Rolls',     price:59,  veg:true },
  { id:30, name:'Veg Mix Roll',        category:'Rolls',     price:69,  veg:true, best:true },
  { id:31, name:'Egg Fried Rice',      category:'Rice',      price:79,  veg:false },
  { id:32, name:'Egg Chicken Fried Rice',category:'Rice',    price:89,  veg:false, best:true },
  { id:34, name:'Steam Rice',          category:'Rice',      price:59,  veg:true },
  { id:38, name:'Mixed Fried Rice',    category:'Rice',      price:89,  veg:true, best:true },
  { id:41, name:'Paneer Manchurian',   category:'Manchurian',price:89,  veg:true },
  { id:44, name:'Paneer Chili',        category:'Manchurian',price:89,  veg:true, best:true },
  { id:53, name:'Paneer Butter Masala',category:'Veg Curry', price:99,  veg:true, best:true },
  { id:54, name:'Kadhai Paneer',       category:'Veg Curry', price:109, veg:true, best:true },
  { id:61, name:'Paneer Tikka Masala', category:'Veg Curry', price:129, veg:true, best:true },
  { id:67, name:'Mushroom Masala',     category:'Veg Curry', price:99,  veg:true, best:true },
  { id:75, name:'Dal Fry',             category:'Veg Curry', price:69,  veg:true },
  { id:83, name:'Chicken Curry',       category:'Chicken',   price:109, veg:false, best:true },
  { id:85, name:'Chicken Butter Masala',category:'Chicken',  price:109, veg:false, best:true },
  { id:93, name:'Chicken Tikka Masala',category:'Chicken',   price:139, veg:false, best:true },
  { id:98, name:'Hariyali Chicken',    category:'Chicken',   price:129, veg:false, best:true },
  { id:48, name:'Tawa Roti',           category:'Breads',    price:8,   veg:true },
  { id:49, name:'Lachha Paratha',      category:'Breads',    price:20,  veg:true, best:true },
  { id:50, name:'Paneer Paratha',      category:'Breads',    price:35,  veg:true },
  { id:80, name:'Manchow Soup',        category:'Soup',      price:69,  veg:true, best:true },
  { id:111,name:'Lemon Mojito',        category:'Beverages', price:59,  veg:true, best:true },
  { id:117,name:'Oreo Shake',          category:'Beverages', price:89,  veg:true, best:true },
  { id:118,name:'KitKat Shake',        category:'Beverages', price:99,  veg:true },
  { id:120,name:'Masala Cold Drink',   category:'Beverages', price:39,  veg:true },
];

const CATS = ['All','Veg','Non-Veg','Biryani','Chicken','Veg Curry','Chowmein','Manchurian','Rolls','Rice','Breads','Soup','Beverages'];

const Order = () => {
  const { user } = useContext(AuthContext);
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]); // [{...item, qty, modification}]
  const [addOnMessage, setAddOnMessage] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'online'
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' | 'card'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPayGateway, setShowPayGateway] = useState(false);
  const [error, setError] = useState('');
  const [modItem, setModItem] = useState(null); // item being modified
  const [modText, setModText] = useState('');

  const filtered = MENU.filter(item =>
    (cat === 'All' || item.category === cat) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1, modification: '' }];
    });
  };

  const changeQty = (id, delta) => {
    setCart(prev => prev
      .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
      .filter(c => c.qty > 0)
    );
  };

  const removeItem = (id) => setCart(prev => prev.filter(c => c.id !== id));

  const saveModification = () => {
    setCart(prev => prev.map(c => c.id === modItem.id ? { ...c, modification: modText } : c));
    setModItem(null); setModText('');
  };

  // Saves order to DB after payment confirmed
  const placeOrder = async (paymentDetail) => {
    setLoading(true); setError('');
    try {
      const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      await axios.post('/api/orders', {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        items: cart.map(c => ({
          name: c.name, category: c.category,
          price: Number(c.price), quantity: Number(c.qty),
          modification: c.modification || ''
        })),
        totalAmount: total,
        orderType,
        addOnMessage: addOnMessage || '',
        deliveryAddress: deliveryAddress || '',
        paymentMethod,
        paymentDetail: paymentDetail || 'Cash on Delivery'
      }, config);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Order failed. Please try again.';
      setError(msg);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) { setError('Add at least one item.'); return; }
    if (!/^[0-9]{10}$/.test(customerPhone)) { setError('Enter a valid 10-digit phone number.'); return; }
    setError('');

    if (paymentMethod === 'online') {
      // Show UPI payment gateway — order saved after payment confirmed
      setShowPayGateway(true);
      return;
    }
    // COD — save directly
    placeOrder('Cash on Delivery');
  };

  if (success) return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} className="bg-black/60 border border-gold-600/20 rounded-2xl p-12 text-center max-w-md w-full">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.2 }} className="text-7xl text-green-400 flex justify-center mb-6"><FaCheckCircle /></motion.div>
        <h2 className="text-4xl font-playfair text-gold-400 mb-2">Order Placed Successfully!</h2>
        <p className="text-gold-400/70 text-sm mb-4">Thank you for your order 🙏</p>
        <p className="text-gray-400 mb-2">We'll call you on <span className="text-gold-400">{customerPhone}</span> to confirm.</p>
        <p className="text-gray-500 text-sm mb-8">Total: <span className="text-gold-400 font-bold">₹{cartTotal}</span></p>
        <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
          onClick={() => { setSuccess(false); setCart([]); setAddOnMessage(''); }}
          className="px-8 py-3 bg-gold-600 text-black font-bold rounded-lg">
          Order More
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* UPI Payment Gateway Modal */}
      <AnimatePresence>
        {showPayGateway && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <UPIPayment
                amount={cart.reduce((s, i) => s + i.price * i.qty, 0)}
                orderNote={`Order by ${customerName}`}
                onSuccess={(senderUpi) => {
                  setShowPayGateway(false);
                  placeOrder(senderUpi ? `Online UPI | Paid from: ${senderUpi}` : 'Online UPI Payment');
                }}
                onCancel={() => setShowPayGateway(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modification modal */}
      <AnimatePresence>
        {modItem && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
            onClick={() => setModItem(null)}>
            <motion.div initial={{ scale:0.8 }} animate={{ scale:1 }} exit={{ scale:0.8 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 border border-gold-600/30 rounded-xl p-6 w-full max-w-sm">
              <h3 className="text-gold-400 font-playfair text-xl mb-1">Modification</h3>
              <p className="text-gray-400 text-sm mb-4">{modItem.name}</p>
              <textarea rows={3} value={modText} onChange={e => setModText(e.target.value)}
                placeholder="e.g. Less spicy, no onion, extra sauce..."
                className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 resize-none mb-4" />
              <div className="flex gap-3">
                <button onClick={saveModification} className="flex-1 py-2 bg-gold-600 text-black font-bold rounded-lg text-sm">Save</button>
                <button onClick={() => setModItem(null)} className="flex-1 py-2 border border-gold-600/30 text-gray-400 rounded-lg text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-2">
            <span className="text-white">Order </span>
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Online</span>
          </h1>
          <p className="text-gray-400">Pick your favourites, we'll handle the rest</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: Menu ── */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input type="text" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 text-sm" />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${cat === c ? 'bg-gold-600 text-black' : 'bg-black/50 text-gold-400 border border-gold-600/20 hover:bg-gold-600/10'}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map(item => {
                const inCart = cart.find(c => c.id === item.id);
                return (
                  <motion.div key={item.id} whileHover={{ y:-4, boxShadow:'0 12px 30px rgba(212,175,55,0.12)' }}
                    className="bg-black/60 border border-white/5 hover:border-gold-600/30 rounded-xl p-3 flex flex-col gap-2 transition-all">
                    <div className="flex items-center justify-between">
                      <span className={`w-3 h-3 rounded-sm border-2 flex-shrink-0 ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                        <span className={`block w-1.5 h-1.5 rounded-sm m-auto mt-0.5 ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                      </span>
                      {item.best && <FaFire className="text-orange-400 text-xs" />}
                    </div>
                    <p className="text-white text-xs font-medium leading-snug">{item.name}</p>
                    <p className="text-gray-500 text-[10px]">{item.category}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gold-400 font-bold text-sm">₹{item.price}</span>
                      {inCart ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 bg-gold-600/20 text-gold-400 rounded flex items-center justify-center hover:bg-gold-600/40 transition"><FaMinus className="text-[10px]" /></button>
                          <span className="text-white text-xs w-4 text-center">{inCart.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 bg-gold-600 text-black rounded flex items-center justify-center hover:bg-gold-500 transition"><FaPlus className="text-[10px]" /></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="w-6 h-6 bg-gold-600 text-black rounded flex items-center justify-center hover:bg-gold-500 transition"><FaPlus className="text-[10px]" /></button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Cart + Order Form ── */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Cart */}
              <div className="bg-black/60 border border-gold-600/20 rounded-xl p-5">
                <h2 className="text-gold-400 font-playfair text-xl mb-4 flex items-center gap-2">
                  <FaShoppingCart /> Your Order
                  {cartCount > 0 && <span className="ml-auto text-xs bg-gold-600 text-black px-2 py-0.5 rounded-full">{cartCount} items</span>}
                </h2>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">No items added yet</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">{item.name}</p>
                          {item.modification && <p className="text-gold-400/60 text-[10px] italic mt-0.5">"{item.modification}"</p>}
                          <button onClick={() => { setModItem(item); setModText(item.modification); }}
                            className="text-[10px] text-gray-500 hover:text-gold-400 transition mt-0.5">
                            {item.modification ? '✏️ Edit note' : '+ Add note'}
                          </button>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => changeQty(item.id, -1)} className="w-5 h-5 bg-gold-600/20 text-gold-400 rounded flex items-center justify-center"><FaMinus className="text-[9px]" /></button>
                          <span className="text-white text-xs w-4 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="w-5 h-5 bg-gold-600 text-black rounded flex items-center justify-center"><FaPlus className="text-[9px]" /></button>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-gold-400 text-xs font-bold">₹{item.price * item.qty}</p>
                          <button onClick={() => removeItem(item.id)} className="text-red-400/50 hover:text-red-400 transition mt-1"><FaTrash className="text-[10px]" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="border-t border-gold-600/10 mt-4 pt-3 flex justify-between">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-gold-400 font-bold text-lg">₹{cartTotal}</span>
                  </div>
                )}
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="bg-black/60 border border-gold-600/20 rounded-xl p-5 space-y-4">
                <h2 className="text-gold-400 font-playfair text-xl">Your Details</h2>

                <div>
                  <label className="text-gold-400 text-xs mb-1 block">Name *</label>
                  <input value={customerName} onChange={e => setCustomerName(e.target.value)} required
                    className="w-full px-3 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 transition" />
                </div>

                <div>
                  <label className="text-gold-400 text-xs mb-1 block">Phone * <span className="text-gray-500">(10 digits)</span></label>
                  <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} required maxLength={10} placeholder="9876543210"
                    className="w-full px-3 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 transition" />
                  {customerPhone && !/^[0-9]{10}$/.test(customerPhone) && <p className="text-red-400 text-xs mt-1">Enter valid 10-digit number</p>}
                </div>

                <div>
                  <label className="text-gold-400 text-xs mb-1 block">Email <span className="text-gray-500">(optional)</span></label>
                  <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 transition" />
                </div>

                {/* Order type */}
                <div>
                  <label className="text-gold-400 text-xs mb-2 block">Order Type</label>
                  <div className="flex gap-2">
                    {['dine-in','takeaway','delivery'].map(t => (
                      <button key={t} type="button" onClick={() => setOrderType(t)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition ${orderType === t ? 'bg-gold-600 text-black' : 'bg-black/50 border border-gold-600/20 text-gray-400 hover:border-gold-600/40'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-gold-400 text-xs mb-1 block">Delivery Address *</label>
                    <textarea value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} required rows={2} placeholder="Full address..."
                      className="w-full px-3 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 resize-none transition" />
                  </div>
                )}

                {/* Add-on message */}
                <div>
                  <label className="text-gold-400 text-xs mb-1 block">Add-on Message <span className="text-gray-500">(optional)</span></label>
                  <textarea value={addOnMessage} onChange={e => setAddOnMessage(e.target.value)} rows={2}
                    placeholder="Any special instructions for the kitchen..."
                    className="w-full px-3 py-2.5 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 resize-none transition" />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-gold-400 text-xs mb-2 block">Payment Method</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setPaymentMethod('cod')}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-2 ${
                        paymentMethod === 'cod'
                          ? 'bg-gold-600 text-black'
                          : 'bg-black/50 border border-gold-600/20 text-gray-400 hover:border-gold-600/40'
                      }`}>
                      💵 Cash on Delivery
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('online')}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-2 ${
                        paymentMethod === 'online'
                          ? 'bg-gold-600 text-black'
                          : 'bg-black/50 border border-gold-600/20 text-gray-400 hover:border-gold-600/40'
                      }`}>
                      💳 Pay Online
                    </button>
                  </div>

                  {paymentMethod === 'cod' && (
                    <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }}
                      className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2.5 text-green-400 text-xs">
                      ✅ Pay with cash when your order arrives
                    </motion.div>
                  )}
                  {paymentMethod === 'online' && (
                    <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }}
                      className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2.5 text-blue-400 text-xs">
                      🔒 You'll be shown a UPI QR / app options after confirming
                    </motion.div>
                  )}
                </div>

                {error && (
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </motion.p>
                )}

                <motion.button type="submit" disabled={loading || cart.length === 0}
                  whileHover={{ scale: 1.02, boxShadow:'0 0 20px rgba(212,175,55,0.3)' }}
                  whileTap={{ scale:0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg disabled:opacity-40 transition-all">
                  {loading ? 'Placing Order...' : `Place Order · ₹${cartTotal}`}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
