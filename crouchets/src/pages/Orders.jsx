import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { TrackingBar } from '../components/TrackingBar';
import { PackageOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Orders = () => {
  const { user } = useAuth();
  const { orders, requestReturn } = useOrders();
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnModal, setReturnModal] = useState({ open: false, orderId: null, reason: 'Damaged Item' });

  // If user is logged in, show their orders. Otherwise show guest orders or prompt to login.
  // For simplicity since we use local storage, we'll just filter by userId if user exists
  const userOrders = user 
    ? orders.filter(o => o.userId === user.id)
    : orders.filter(o => o.userId === 'guest');

  const handleReturnRequest = () => {
    requestReturn(returnModal.orderId, returnModal.reason);
    setReturnModal({ open: false, orderId: null, reason: 'Damaged Item' });
    if(selectedOrder && selectedOrder.id === returnModal.orderId) {
       setSelectedOrder(orders.find(o => o.id === returnModal.orderId) || null)
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-6 py-24">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-dark opacity-50"><PackageOpen size={48} /></div>
        <h2 className="font-playfair text-3xl text-dark mb-4">No orders yet</h2>
        <p className="text-mid mb-8 max-w-sm text-center">Your order history is a blank canvas. Time to add some charming pieces!</p>
        <Link to="/shop" className="px-8 py-3 bg-dark text-white rounded-xl shadow-md hover:bg-black transition-colors">Start Shopping</Link>
      </div>
    );
  }

  // Detail View
  if (selectedOrder) {
    const freshOrder = orders.find(o => o.id === selectedOrder.id) || selectedOrder;
    return (
      <div className="min-h-screen bg-cream py-16 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-mid hover:text-dark font-medium mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Orders
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-warm/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-8 border-b border-warm/50 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-mid font-bold mb-2">Order ID • {freshOrder.id}</p>
                <h1 className="font-playfair text-3xl md:text-4xl text-dark">Order Tracker.</h1>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-mid mb-1">Placed on {new Date(freshOrder.createdAt).toLocaleDateString()}</p>
                <p className="font-bold text-xl text-teal">Total: ₹{freshOrder.total}</p>
              </div>
            </div>

            <TrackingBar steps={freshOrder.trackingSteps} />

            <div className="mt-16 pt-8 border-t border-warm/50">
              <h3 className="font-bold text-dark text-lg mb-6">Items Delivered</h3>
              <div className="space-y-4">
                {freshOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-cream p-4 rounded-2xl">
                    <img src={item.images[0]} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-dark">{item.name}</p>
                      <p className="text-sm text-mid">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-dark">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Returns logic */}
            {freshOrder.status === 'delivered' && !freshOrder.returnRequested && (
              <div className="mt-12 pt-8 border-t border-warm/50 flex justify-end">
                <button 
                  onClick={() => setReturnModal({ open: true, orderId: freshOrder.id, reason: 'Damaged Item' })}
                  className="px-6 py-3 border-2 border-red text-red rounded-xl font-bold hover:bg-red hover:text-white transition-colors"
                >
                  Request Return
                </button>
              </div>
            )}
            
            {freshOrder.returnRequested && (
              <div className="mt-12 p-6 bg-red/5 border-2 border-red/20 rounded-2xl">
                <p className="font-bold text-red uppercase tracking-wider text-sm mb-1">Return Requested</p>
                <p className="text-dark">Status: <span className="capitalize font-bold">{freshOrder.refundStatus}</span></p>
                {freshOrder.returnReason && <p className="text-sm text-mid mt-2">Reason: {freshOrder.returnReason}</p>}
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-cream py-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl font-bold text-dark mb-12">Your Orders.</h1>
        <div className="space-y-6">
          {userOrders.map(order => (
            <motion.div 
              layout 
              key={order.id} 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-warm/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-mid font-bold mb-2">Order • {order.id}</p>
                <div className="flex -space-x-3 mb-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.images[0]} className="w-12 h-12 rounded-full border-2 border-white object-cover bg-warm" />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-warm flex items-center justify-center text-xs font-bold text-dark">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-dark capitalize">Status: <span className="text-teal font-bold">{order.status.replace('_', ' ')}</span></p>
              </div>
              
              <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0">
                <p className="font-bold text-xl text-dark mb-4">₹{order.total}</p>
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="w-full md:w-auto px-6 py-3 bg-dark text-white rounded-xl text-sm font-bold shadow-md hover:bg-black transition-colors"
                >
                  Track Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Return Modal */}
      <AnimatePresence>
        {returnModal.open && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/40 backdrop-blur-sm p-4"
          >
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
                <h3 className="font-playfair text-2xl font-bold text-dark mb-4">Request Return</h3>
                <p className="text-sm text-mid mb-6 border-b border-warm/50 pb-4">Please select a reason for returning order {returnModal.orderId}.</p>
                <select 
                  className="w-full p-3 bg-cream border border-warm rounded-xl mb-6 outline-none focus:border-teal"
                  value={returnModal.reason}
                  onChange={e => setReturnModal({...returnModal, reason: e.target.value})}
                >
                  <option>Damaged Item</option>
                  <option>Wrong Item Received</option>
                  <option>Not as Expected</option>
                </select>
                <div className="flex gap-4">
                  <button onClick={() => setReturnModal({open: false, orderId: null})} className="flex-1 py-3 text-mid font-bold hover:bg-warm/30 rounded-xl transition-colors">Cancel</button>
                  <button onClick={handleReturnRequest} className="flex-1 py-3 bg-red text-white font-bold rounded-xl shadow-md hover:bg-red-600 transition-colors">Submit</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
