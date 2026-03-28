import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';

export const UserOrders = () => {
  const { isAuthenticated, user } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();

  // Protect route
  if (!isAuthenticated || user?.role !== 'user') {
    return <Navigate to="/login" replace state={{ from: { pathname: '/orders' } }} />;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-teal-700';
      case 'Processing': return 'text-orange-600';
      case 'Shipped': return 'text-blue-600';
      default: return 'text-slate-600';
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <h2 className="text-xl font-medium text-dark mb-4">You have no past orders.</h2>
            <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-teal text-white rounded-lg font-bold">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Order Header (Amazon style) */}
                <div className="bg-slate-100/50 p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between sm:items-center text-sm">
                  <div className="flex flex-wrap gap-6 sm:gap-12 w-full sm:w-auto">
                    <div>
                      <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Order Placed</p>
                      <p className="font-medium text-slate-700">{formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Total</p>
                      <p className="font-medium text-slate-700">₹{order.total}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Ship To</p>
                      <p className="font-medium text-teal hover:underline cursor-pointer">{user.name}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto text-left sm:text-right">
                    <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Order #</p>
                    <p className="font-medium text-slate-700 uppercase">{order.id}</p>
                  </div>
                </div>

                {/* Order Status & Items */}
                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className={`font-bold text-lg ${getStatusColor(order.status)}`}>
                      Status: {order.status}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 flex flex-col sm:flex-row justify-between">
                          <div>
                            <h4 className="font-bold text-dark sm:text-lg mb-1">{item.product.name}</h4>
                            <p className="text-sm text-slate-500 mb-1">Variant: <span className="font-medium text-slate-700">{item.variant}</span></p>
                            <p className="text-sm font-medium bg-slate-100 inline-block px-2 py-0.5 rounded text-slate-600 mt-2">Qty: {item.quantity}</p>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex flex-col gap-2 shrink-0 sm:w-48">
                            <button className="w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-lg font-medium text-sm transition-colors shadow-sm">
                              Track package
                            </button>
                            <button className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 text-sm transition-colors shadow-sm">
                              Buy it again
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
