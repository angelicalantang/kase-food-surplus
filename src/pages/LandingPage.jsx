import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight, Share2, Sparkles, Heart, Utensils, Store, TrendingUp } from 'lucide-react';
import FoodCard from '../components/FoodCard';

export default function LandingPage({ foodItems, onDiscoverClick, onListClick, onSelectFood, toggleSave, savedIds }) {
  const [activeFilterCategory, setActiveFilterCategory] = useState('Salads');

  const filteredHeroCards = useMemo(() => {
    return foodItems.filter(item => item.category === activeFilterCategory).slice(0, 4);
  }, [foodItems, activeFilterCategory]);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-kaseGreen/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-kaseAmber/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kaseMint border border-kaseGreen/20 text-kaseGreen text-xs font-bold tracking-wide uppercase"
            >
              <Leaf size={14} className="text-kaseGreen" />
              <span>FOOD SURPLUS • COMMUNITY • IMPACT</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-kaseDark leading-[1.1] tracking-tight"
            >
              Good food deserves <br />
              <span className="text-kaseGreen underline decoration-kaseAmber decoration-wavy decoration-2">another chance.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg font-normal"
            >
              KASE connects surplus food with people nearby — save delicious food, save money, and reduce environmental waste together.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button 
                onClick={onDiscoverClick}
                className="bg-kaseDark hover:bg-gray-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 group"
              >
                <span>Temukan Makanan</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-kaseAmber" />
              </button>

              <button 
                onClick={onListClick}
                className="bg-white hover:bg-gray-50 text-kaseDark border border-black/10 font-bold text-sm px-7 py-4 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <Share2 size={18} className="text-kaseGreen" />
                <span>Bagikan Surplus</span>
              </button>
            </motion.div>

            {/* Micro Trust Badge */}
            <div className="pt-4 flex items-center gap-3 text-xs text-gray-500">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <span>Bergabung dengan <b>2,850+</b> orang penyelamat makanan di Manado</span>
            </div>
          </div>

          {/* Center-Right Hero Composition */}
          <div className="lg:col-span-7 relative flex flex-col md:flex-row items-center justify-center gap-6 pt-6 lg:pt-0">
            {/* Center Visual Plate */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-64 sm:w-72 h-64 sm:h-72 rounded-full p-2 bg-white/60 backdrop-blur-md shadow-2xl border border-white flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh Bowl"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4 text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-kaseRed/90 px-2 py-0.5 rounded-full">Fresh Surplus</span>
                    <p className="text-xs font-semibold">100% Nutritious & Safe</p>
                  </div>
                </div>
              </div>

              {/* Floating Leaf Accents */}
              <motion.div 
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-3 -right-2 bg-white/90 p-2.5 rounded-full shadow-md text-kaseGreen border border-black/5"
              >
                <Sparkles size={20} className="text-kaseAmber" />
              </motion.div>
            </motion.div>

            {/* Category Pill Selector */}
            <div className="bg-white/80 backdrop-blur-md p-2 rounded-3xl border border-black/[0.05] shadow-sm flex flex-row md:flex-col gap-1.5">
              {['Salads', 'Soups', 'Drinks', 'Meals', 'Bakery'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilterCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between gap-3 ${
                    activeFilterCategory === cat 
                      ? 'bg-kaseDark text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100/80'
                  }`}
                >
                  <span>{cat}</span>
                  {activeFilterCategory === cat && (
                    <span className="w-2 h-2 rounded-full bg-kaseRed"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Staggered Cards Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 w-full max-w-xs">
              {filteredHeroCards.map((food) => (
                <motion.div
                  key={food.id}
                  whileHover={{ y: -4 }}
                  onClick={() => onSelectFood(food)}
                  className="bg-white rounded-3xl p-3.5 shadow-soft hover:shadow-hover border border-black/[0.04] cursor-pointer transition-all flex items-center gap-3 relative group"
                >
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-kaseDark truncate">{food.name}</h4>
                    <p className="text-[10px] text-gray-500 truncate">{food.provider}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-kaseGreen">
                        Rp {food.kasePrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        Rp {food.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => toggleSave(food.id, e)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-kaseRed transition-colors"
                  >
                    <Heart 
                      size={16} 
                      className={savedIds.includes(food.id) ? "fill-kaseRed text-kaseRed" : ""} 
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Impact Statistics Strip */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-gray-100">
          {[
            { value: "1,240+", label: "Meals Rescued", icon: Utensils },
            { value: "380+", label: "Food Partners", icon: Store },
            { value: "2,850 kg", label: "Food Saved", icon: Leaf },
            { value: "Rp 48M+", label: "Value Rescued", icon: TrendingUp }
          ].map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="p-2 space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-kaseMint text-kaseGreen mx-auto flex items-center justify-center mb-2">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-kaseDark">{stat.value}</h3>
                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: DISCOVER SURPLUS FOOD */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-kaseGreen uppercase tracking-wider">Fresh Deals Nearby</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-kaseDark">Food worth discovering.</h2>
            <p className="text-xs text-gray-500 mt-1">Good food. Better value. Less waste.</p>
          </div>

          <button 
            onClick={onDiscoverClick}
            className="text-xs font-bold text-kaseDark hover:text-kaseGreen flex items-center gap-1 group transition-colors"
          >
            <span>Lihat Semua ({foodItems.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.slice(0, 4).map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onSelect={() => onSelectFood(food)} 
              onToggleSave={(e) => toggleSave(food.id, e)}
              isSaved={savedIds.includes(food.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}