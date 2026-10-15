import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

import { INITIAL_FOOD_ITEMS } from './data/foodData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import FoodDetailModal from './components/FoodDetailModal';
import ListSurplusModal from './components/ListSurplusModal';

import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import DashboardPage from './pages/DashboardPage';
import ProviderPage from './pages/ProviderPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Nearest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [claimedSuccess, setClaimedSuccess] = useState(false);
  const [savedIds, setSavedIds] = useState([1, 4]);

  // User Profile state
  const [userStats, setUserStats] = useState({
    mealsSaved: 12,
    wastePreventedKg: 8.4,
    moneySavedRp: 186000,
    impactScore: 92
  });

  // Toggle Saved Food
  const toggleSave = (id, e) => {
    if (e) e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredFoodItems = useMemo(() => {
    return foodItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Lowest Price') return a.kasePrice - b.kasePrice;
      if (sortBy === 'Most Saved') return (b.originalPrice - b.kasePrice) - (a.originalPrice - a.kasePrice);
      return 0;
    });
  }, [foodItems, selectedCategory, searchQuery, sortBy]);

  // Claim food handler
  const handleClaimFood = (food, portionsClaimed = 1) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Deduct portions in state
    setFoodItems(prev => prev.map(item => {
      if (item.id === food.id) {
        return { ...item, portionsLeft: Math.max(0, item.portionsLeft - portionsClaimed) };
      }
      return item;
    }));

    // Update user impact metrics
    setUserStats(prev => ({
      ...prev,
      mealsSaved: prev.mealsSaved + portionsClaimed,
      wastePreventedKg: parseFloat((prev.wastePreventedKg + (0.4 * portionsClaimed)).toFixed(1)),
      moneySavedRp: prev.moneySavedRp + ((food.originalPrice - food.kasePrice) * portionsClaimed),
      impactScore: Math.min(100, prev.impactScore + 2)
    }));

    setClaimedSuccess(true);
  };

  // Add new food item (List surplus)
  const handleAddNewSurplus = (newItem) => {
    const created = {
      ...newItem,
      id: Date.now(),
      rating: 5.0,
      distance: "0.2 km",
      saved: false,
      badge: "Baru Diupload"
    };
    setFoodItems([created, ...foodItems]);
    setIsListModalOpen(false);
  };

  // =========================================================
  // FUNGSI MANAGEMENT MERCHANT (EDIT & HAPUS MAKANAN)
  // =========================================================
  
  // Update data / porsi makanan
  const handleUpdateFood = (updatedFood) => {
    setFoodItems(prev => prev.map(item => item.id === updatedFood.id ? updatedFood : item));
  };

  // Hapus makanan dari listing
  const handleDeleteFood = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus makanan ini dari listing?")) {
      setFoodItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F8] text-[#0D0D0D] relative">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsListModalOpen={setIsListModalOpen}
        savedCount={savedIds.length}
      />

      {/* Main Pages */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'landing' && (
          <LandingPage 
            foodItems={foodItems}
            onDiscoverClick={() => setActiveTab('discover')}
            onListClick={() => setIsListModalOpen(true)}
            onSelectFood={(food) => { setSelectedFood(food); setIsClaimModalOpen(true); }}
            toggleSave={toggleSave}
            savedIds={savedIds}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverPage 
            foodItems={filteredFoodItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectFood={(food) => { setSelectedFood(food); setIsClaimModalOpen(true); }}
            toggleSave={toggleSave}
            savedIds={savedIds}
          />
        )}

        {activeTab === 'how' && (
          <HowItWorksPage onStartClick={() => setActiveTab('discover')} />
        )}

        {activeTab === 'impact' && (
          <ImpactPage />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage userStats={userStats} />
        )}

        {/* PERUBAHAN PADA PROVIDER PAGE (DITAMBAHKAN PROPS PROPORTION & ACTION HANDLERS) */}
        {activeTab === 'provider' && (
          <ProviderPage 
            foodItems={foodItems}
            onOpenListModal={() => setIsListModalOpen(true)}
            onUpdateFood={handleUpdateFood}
            onDeleteFood={handleDeleteFood}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage userStats={userStats} savedCount={savedIds.length} />
        )}
      </main>

      {/* Floating Corner Arrow Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab('discover')}
        className="fixed bottom-20 md:bottom-8 right-6 z-30 w-14 h-14 bg-kaseDark text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border border-white/20 group"
        title="Jelajahi Makanan"
      >
        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform text-kaseAmber" />
      </motion.button>

      {/* Mobile Translucent Bottom Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Food Detail & Claim Modal */}
      <AnimatePresence>
        {isClaimModalOpen && selectedFood && (
          <FoodDetailModal 
            food={selectedFood}
            onClose={() => {
              setIsClaimModalOpen(false);
              setClaimedSuccess(false);
            }}
            onClaim={(portions) => handleClaimFood(selectedFood, portions)}
            isSuccess={claimedSuccess}
          />
        )}
      </AnimatePresence>

      {/* List Surplus Form Modal */}
      <AnimatePresence>
        {isListModalOpen && (
          <ListSurplusModal 
            onClose={() => setIsListModalOpen(false)}
            onSubmit={handleAddNewSurplus}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}