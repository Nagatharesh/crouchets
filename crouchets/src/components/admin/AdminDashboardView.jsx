import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { AdminLayout } from './AdminLayout';

export const AdminDashboardView = () => {
  const { products } = useProducts();
  const { orders } = useCart(); // Dummy stats source

  const stats = {
    products: products.length,
    orders: orders.length,
    revenue: orders.reduce((sum, ord) => sum + ord.total, 0)
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Shop with Zosh Card */}
          <div className="col-span-1 bg-[#15152a] rounded-xl p-6 border border-white/[0.03] shadow-lg relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-1">Shop With Crouchets</h2>
            <p className="text-sm text-slate-400 mb-6">Congratulations 🥳</p>
            
            <div className="text-3xl font-black text-purple-400 tracking-tight mb-8">
              {(stats.revenue / 1000).toFixed(1)}k <span className="text-sm text-slate-500 font-medium tracking-normal">₹</span>
            </div>
            
            <button className="px-6 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-bold rounded shadow-lg shadow-purple-500/20 transition-colors">
              VIEW SALES
            </button>
            
            {/* Trophy Icon Mock */}
            <div className="absolute bottom-6 right-6 text-[80px] drop-shadow-2xl opacity-90 select-none pointer-events-none">
              🏆
            </div>
          </div>

          {/* Monthly Overview */}
          <div className="col-span-1 xl:col-span-2 bg-[#15152a] rounded-xl p-6 border border-white/[0.03] shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-2">Monthly Overview</h2>
                <p className="text-sm text-slate-400">Total <span className="text-white font-bold">48.5% growth</span> 😎 this month</p>
              </div>
              <button className="text-slate-500 hover:text-white">⋮</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-auto">
              {/* Sales */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#8b5cf6] text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Sales</p>
                  <p className="font-bold text-white text-lg">245k</p>
                </div>
              </div>
              {/* Customers */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Customers</p>
                  <p className="font-bold text-white text-lg">12.5k</p>
                </div>
              </div>
              {/* Products */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#f59e0b] text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Products</p>
                  <p className="font-bold text-white text-lg">{stats.products}</p>
                </div>
              </div>
              {/* Revenue */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Revenue</p>
                  <p className="font-bold text-white text-lg">₹{(stats.revenue / 1000).toFixed(1)}k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Overview - Chart Mock */}
          <div className="col-span-1 bg-[#15152a] rounded-xl p-6 border border-white/[0.03] shadow-lg flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-lg font-bold text-white">Weekly Overview</h2>
              <button className="text-slate-500 hover:text-white">⋮</button>
            </div>
            
            {/* Chart Area */}
            <div className="flex-1 min-h-[160px] flex items-end gap-2 sm:gap-4 justify-between relative mb-6">
              {[45, 60, 40, 90, 55, 30, 80].map((h, i) => (
                <div key={i} className="flex-1 flex justify-center group">
                  <div className={`w-full max-w-[12px] md:max-w-[16px] rounded-t-sm transition-all duration-300 group-hover:bg-[#8b5cf6] ${i === 3 ? 'bg-[#8b5cf6]' : 'bg-white/10'}`} style={{ height: `${h}%` }}></div>
                </div>
              ))}
              
              {/* Y Axis labels mock */}
              <div className="absolute left-0 inset-y-0 w-full flex flex-col justify-between items-start pointer-events-none text-[10px] text-slate-500 border-l border-b border-white/5 pb-0 pl-1">
                 <span className="bg-[#15152a] pr-1">90k</span>
                 <span className="bg-[#15152a] pr-1">60k</span>
                 <span className="bg-[#15152a] pr-1">30k</span>
                 <span className="bg-[#15152a] pr-1 mt-auto translate-y-2">0k</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              <span className="text-4xl font-black text-white">45%</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your sales performance is 45% 🤩 better compared to last month
              </p>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-bold rounded shadow-lg shadow-purple-500/20 transition-colors">
              DETAILS
            </button>
          </div>

          {/* Total Earning */}
          <div className="col-span-1 lg:col-span-2 bg-[#15152a] rounded-xl p-6 border border-white/[0.03] shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-bold text-white">Total Earning</h2>
              <button className="text-slate-500 hover:text-white">⋮</button>
            </div>
            
            <div className="mb-8">
              <div className="flex items-end gap-3 mb-1">
                <h3 className="text-3xl font-black text-white">₹{stats.revenue.toLocaleString()}</h3>
                <span className="text-[#10b981] text-sm font-bold pb-1 flex items-center">
                  <svg className="w-4 h-4 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  10%
                </span>
              </div>
              <p className="text-xs text-slate-400">Compared to ₹84,325 last year</p>
            </div>

            <div className="space-y-6">
              {[
                { img: 'https://images.unsplash.com/photo-1590005354167-6da97ce231ce?auto=format&fit=crop&q=80&w=100&h=100', cat: 'Keychains', type: 'Accessories', amnt: '₹24,895.65' },
                { img: 'https://images.unsplash.com/photo-1598502390979-99ffc71b694b?auto=format&fit=crop&q=80&w=100&h=100', cat: 'Charms', type: 'Bag attachments', amnt: '₹8,650.20' },
                { img: 'https://images.unsplash.com/photo-1618642784732-f15f037be6c3?auto=format&fit=crop&q=80&w=100&h=100', cat: 'Custom', type: 'Made to order', amnt: '₹1,245.80' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded shrink-0 overflow-hidden bg-white/5 relative">
                      <img src={row.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{row.cat}</h4>
                      <p className="text-xs text-slate-500">{row.type}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-300 text-sm group-hover:text-white transition-colors">{row.amnt}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* BOTTOM ROW WIDGETS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-[#15152a] rounded-xl p-5 border border-white/[0.03] shadow-lg flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-white font-bold mb-1">Total Profit</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-black text-white">₹25.6k</span>
                <span className="text-xs text-[#10b981] font-bold pb-0.5">+42%</span>
              </div>
              <p className="text-xs text-slate-500">Weekly Profit</p>
           </div>
           
           <div className="bg-[#15152a] rounded-xl p-5 border border-white/[0.03] shadow-lg flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-white font-bold mb-1">Refunds</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-black text-white">₹78</span>
                <span className="text-xs text-red-500 font-bold pb-0.5">-15%</span>
              </div>
              <p className="text-xs text-slate-500">Past Month</p>
           </div>
           
           <div className="bg-[#15152a] rounded-xl p-5 border border-white/[0.03] shadow-lg flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className="text-white font-bold mb-1">New Orders</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-black text-white">{stats.orders}</span>
                <span className="text-xs text-red-500 font-bold pb-0.5">-18%</span>
              </div>
              <p className="text-xs text-slate-500">Weekly Orders</p>
           </div>
           
           <div className="bg-[#15152a] rounded-xl p-5 border border-white/[0.03] shadow-lg flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-white font-bold mb-1">Sales Queries</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-black text-white">15</span>
                <span className="text-xs text-red-500 font-bold pb-0.5">-18%</span>
              </div>
              <p className="text-xs text-slate-500">Last Week</p>
           </div>
        </div>
        
      </div>
    </AdminLayout>
  );
};
