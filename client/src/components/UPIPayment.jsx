import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaCheckCircle, FaCopy, FaMobileAlt, FaQrcode } from 'react-icons/fa';

// ── Restaurant UPI config — change these to real values ──────────
const MERCHANT_UPI  = 'rahulkr1723@ybl';       // your UPI ID
const MERCHANT_NAME = 'Samridhii Restaurant';
// ─────────────────────────────────────────────────────────────────

const buildUPIString = (amount, note) =>
  `upi://pay?pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

const UPI_APPS = [
  {
    name: 'GPay',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png',
    scheme: (upiStr) => upiStr.replace('upi://', 'tez://upi/'),
  },
  {
    name: 'PhonePe',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png',
    scheme: (upiStr) => upiStr.replace('upi://', 'phonepe://'),
  },
  {
    name: 'Paytm',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png',
    scheme: (upiStr) => `paytmmp://pay?pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${upiStr.match(/am=([^&]+)/)?.[1]}&cu=INR`,
  },
  {
    name: 'BHIM',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/BHIM_logo.svg/512px-BHIM_logo.svg.png',
    scheme: (upiStr) => upiStr,
  },
];

const UPIPayment = ({ amount, orderNote = 'Food Order', onSuccess, onCancel }) => {
  const [tab, setTab] = useState('qr');           // 'qr' | 'apps' | 'id'
  const [copied, setCopied] = useState(false);
  const [manualUpi, setManualUpi] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [senderUpi, setSenderUpi] = useState(''); // UPI ID user paid from

  const upiString = buildUPIString(amount, orderNote);

  // Countdown timer for QR
  useEffect(() => {
    if (tab !== 'qr' || paid) return;
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [tab, paid]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  const copyUPI = () => {
    navigator.clipboard.writeText(MERCHANT_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openApp = (app) => {
    window.location.href = app.scheme(upiString);
    // After redirect attempt, show verify button
    setTimeout(() => setVerifying(true), 2000);
  };

  const handleVerify = () => {
    setPaid(true);
    setTimeout(() => onSuccess?.(senderUpi || 'UPI Payment'), 1500);
  };

  if (paid) return (
    <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
      className="text-center py-8">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.1 }}
        className="text-6xl text-green-400 flex justify-center mb-4">
        <FaCheckCircle />
      </motion.div>
      <p className="text-green-400 text-xl font-playfair">Payment Successful!</p>
      <p className="text-gray-400 text-sm mt-1">₹{amount} paid to {MERCHANT_NAME}</p>
    </motion.div>
  );

  return (
    <div className="bg-black/80 border border-gold-600/20 rounded-2xl overflow-hidden w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-600/20 to-gold-600/5 px-5 py-4 border-b border-gold-600/20">
        <p className="text-gray-400 text-xs">Amount to Pay</p>
        <p className="text-gold-400 text-3xl font-bold">₹{amount}</p>
        <p className="text-gray-500 text-xs mt-0.5">to {MERCHANT_NAME}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold-600/10">
        {[
          { id:'qr',   label:'QR Code',  icon:<FaQrcode /> },
          { id:'apps', label:'UPI Apps', icon:<FaMobileAlt /> },
          { id:'id',   label:'UPI ID',   icon:'#' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-1.5 transition ${
              tab === t.id
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">

          {/* QR Tab */}
          {tab === 'qr' && (
            <motion.div key="qr" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="flex flex-col items-center gap-4">
              <div className="bg-white p-3 rounded-xl">
                <QRCodeSVG value={upiString} size={180} level="H"
                  imageSettings={{ src: '', height:0, width:0, excavate:false }} />
              </div>
              <p className="text-gray-400 text-xs text-center">
                Scan with any UPI app — GPay, PhonePe, Paytm, BHIM
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Expires in</span>
                <span className={`font-mono font-bold ${countdown < 60 ? 'text-red-400' : 'text-gold-400'}`}>
                  {fmt(countdown)}
                </span>
              </div>
              <div className="w-full space-y-2">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Your UPI ID <span className="text-gray-600">(from which you paid)</span></label>
                  <input value={senderUpi} onChange={e => setSenderUpi(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 bg-black/60 border border-gold-600/20 rounded-lg text-white text-xs focus:outline-none focus:border-gold-500 transition" />
                </div>
                <motion.button onClick={handleVerify} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg text-sm">
                  I've Completed Payment
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Apps Tab */}
          {tab === 'apps' && (
            <motion.div key="apps" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="space-y-3">
              <p className="text-gray-400 text-xs text-center mb-4">
                Tap an app to open it and pay ₹{amount}
              </p>
              {UPI_APPS.map(app => (
                <motion.button key={app.name} onClick={() => openApp(app)}
                  whileHover={{ scale:1.02, x:4 }} whileTap={{ scale:0.98 }}
                  className="w-full flex items-center gap-4 px-4 py-3 bg-black/50 border border-gold-600/20 rounded-xl hover:border-gold-600/50 transition">
                  <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain rounded" />
                  <span className="text-white font-medium text-sm">{app.name}</span>
                  <span className="ml-auto text-gold-400 text-xs">Open →</span>
                </motion.button>
              ))}
              {verifying && (
                <div className="space-y-2 mt-2">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Your UPI ID <span className="text-gray-600">(from which you paid)</span></label>
                    <input value={senderUpi} onChange={e => setSenderUpi(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full px-3 py-2 bg-black/60 border border-gold-600/20 rounded-lg text-white text-xs focus:outline-none focus:border-gold-500 transition" />
                  </div>
                  <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }}
                    onClick={handleVerify} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                    className="w-full py-3 bg-green-600/20 border border-green-600/30 text-green-400 font-bold rounded-lg text-sm">
                    ✅ Payment Done — Confirm
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* UPI ID Tab */}
          {tab === 'id' && (
            <motion.div key="id" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="space-y-4">
              <p className="text-gray-400 text-xs text-center">
                Send ₹{amount} to this UPI ID from any app
              </p>

              {/* Merchant UPI ID */}
              <div className="bg-black/50 border border-gold-600/20 rounded-xl p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-gray-500 text-[10px] mb-0.5">UPI ID</p>
                  <p className="text-gold-400 font-mono font-bold text-lg">{MERCHANT_UPI}</p>
                </div>
                <motion.button onClick={copyUPI} whileTap={{ scale:0.9 }}
                  className="p-2 bg-gold-600/20 border border-gold-600/30 rounded-lg text-gold-400 hover:bg-gold-600/40 transition">
                  {copied ? '✅' : <FaCopy />}
                </motion.button>
              </div>

              <div className="text-center text-gray-500 text-xs">— or enter your UPI ID to pay —</div>

              {/* User enters their own UPI to initiate */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Your UPI ID</label>
                <input value={manualUpi} onChange={e => setManualUpi(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3 bg-black/60 border border-gold-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 transition" />
              </div>

              <motion.button
                onClick={() => {
                  if (!manualUpi.trim()) return;
                  window.location.href = upiString;
                  setTimeout(() => setVerifying(true), 2000);
                }}
                disabled={!manualUpi.trim()}
                whileHover={{ scale: manualUpi ? 1.03 : 1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-lg text-sm disabled:opacity-40">
                Pay ₹{amount}
              </motion.button>

              {verifying && (
                <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }}
                  onClick={handleVerify} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="w-full py-3 bg-green-600/20 border border-green-600/30 text-green-400 font-bold rounded-lg text-sm">
                  ✅ Payment Done — Confirm
                </motion.button>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Cancel */}
      <div className="px-5 pb-5">
        <button onClick={onCancel}
          className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs transition">
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default UPIPayment;
