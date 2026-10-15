import React from 'react';
import { Search, X, MapPin, SearchX } from 'lucide-react';
import FoodCard from '../components/FoodCard';

export default function DiscoverPage({ 
  foodItems, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy, 
  searchQuery, 
  setSearchQuery, 
  onSelectFood, 
  toggleSave, 
  savedIds 
}) {
  const categories = ['All', 'Meals', 'Bakery', 'Salads', 'Fruits', 'Drinks'];
  const sortOptions = ['Nearest', 'Lowest Price', 'Most Saved'];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-kaseDark to-gray-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-kaseGreen/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-xl relative z-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-kaseAmber">Penyelamatan Surplus Hari Ini</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Find food. Save value.</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Temukan makanan lezat berkualitas dari cafe, restoran, dan bakery terdekat dengan harga miring hingga 60%.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-[2rem] p-4 shadow-soft border border-black/[0.04] space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari makanan, restoran, bakery, salad..."
              className="w-full pl-11 pr-4 py-3 text-xs bg-[#F4F5F8] border-none rounded-2xl focus:ring-2 focus:ring-kaseGreen outline-none text-kaseDark placeholder-gray-400 font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kaseDark"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-2 bg-[#F4F5F8] px-4 py-3 rounded-2xl text-xs font-semibold text-gray-700 w-full md:w-auto shrink-0">
            <MapPin size={16} className="text-kaseRed" />
            <span>Manado, Sulawesi Utara</span>
          </div>
        </div>

        {/* Category Pills & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto hide-scrollbar pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-kaseDark text-white shadow-sm' 
                    : 'bg-[#F4F5F8] text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Chips */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold">
            <span className="text-gray-400 text-[11px]">Urutkan:</span>
            {sortOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                  sortBy === opt 
                    ? 'border-kaseGreen text-kaseGreen bg-kaseMint/50 font-bold' 
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      {foodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onSelect={() => onSelectFood(food)} 
              onToggleSave={(e) => toggleSave(food.id, e)}
              isSaved={savedIds.includes(food.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] p-12 text-center space-y-4 max-w-md mx-auto shadow-soft">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <SearchX size={32} />
          </div>
          <h3 className="font-bold text-base text-kaseDark">Makanan Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori makanan yang lain.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="bg-kaseDark text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-gray-800"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}