import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Package, MapPin, CreditCard, LogOut, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

const mockOrders = [
  {
    id: 'AN-2024-8842',
    date: 'April 14, 2024',
    total: 890.00,
    status: 'Delivered',
    items: [
      { name: 'Nero Oxford', quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'AN-2024-7129',
    date: 'February 20, 2024',
    total: 1250.00,
    status: 'Delivered',
    items: [
      { name: 'Sienna Chelsea', quantity: 2, image: 'https://images.unsplash.com/photo-1638947481845-f0ee57954930?q=80&w=400&auto=format&fit=crop' }
    ]
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'details', label: 'Profile Details', icon: Settings },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-primary-bg font-sans">
      <div className="container-custom">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-16 border-b border-border">
          <div className="w-24 h-24 bg-secondary-bg rounded-full flex items-center justify-center text-3xl font-display border border-border">
            LM
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl font-display font-medium">Luca Moretti</h1>
              <div className="flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded text-[8px] font-bold text-accent uppercase tracking-widest">
                <Star className="w-2 h-2 fill-accent" /> Collector
              </div>
            </div>
            <p className="text-text-secondary text-sm">Member since 2022 â€¢ Florence, Italy</p>
          </div>
          <button className="md:ml-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'border-text-primary bg-text-primary text-white scale-[1.02]' 
                    : 'border-transparent text-text-secondary hover:border-border hover:bg-secondary-bg/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Content Area */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="bg-secondary-bg/30 border border-border p-8 group hover:border-accent transition-colors duration-500">
                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Order Reference</p>
                            <h3 className="text-lg font-display font-medium">{order.id}</h3>
                          </div>
                          <div className="space-y-1 md:text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Date</p>
                            <p className="text-sm font-medium">{order.date}</p>
                          </div>
                          <div className="space-y-1 md:text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total</p>
                            <p className="text-sm font-mono">${order.total.toFixed(2)}</p>
                          </div>
                          <div className="space-y-1 md:text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Status</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white border border-border inline-block">
                              {order.status}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-8 border-t border-border/50">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex gap-4 items-center">
                              <div className="w-16 h-20 bg-secondary-bg overflow-hidden border border-border">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{item.name}</p>
                                <p className="text-[10px] text-text-secondary uppercase tracking-widest">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                          <button className="ml-auto self-center flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] group-hover:text-accent transition-colors">
                            View Details <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-xl"
                >
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">First Name</label>
                        <input type="text" defaultValue="Luca" className="w-full bg-secondary-bg border-none px-6 py-4 text-sm font-medium focus:ring-1 focus:ring-accent outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Last Name</label>
                        <input type="text" defaultValue="Moretti" className="w-full bg-secondary-bg border-none px-6 py-4 text-sm font-medium focus:ring-1 focus:ring-accent outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                      <input type="email" defaultValue="luca.moretti@classic.it" className="w-full bg-secondary-bg border-none px-6 py-4 text-sm font-medium focus:ring-1 focus:ring-accent outline-none" />
                    </div>
                    <div className="pt-4">
                      <button className="bg-text-primary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
