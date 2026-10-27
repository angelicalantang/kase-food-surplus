import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

import { INITIAL_FOOD_ITEMS } from './data/foodData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import FoodDetailModal from './components/FoodDetailModal';
import ListSurplusModal from './components/ListSurplusModal';
import MapModal from './components/MapModal';

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import DashboardPage from './pages/DashboardPage';
import ProviderPage from './pages/ProviderPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('kase_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeTab, setActiveTab] = useState(() => {
    const savedUser = localStorage.getItem('kase_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.role === 'merchant' ? 'provider' : 'landing';
    }
    return 'landing';
  });

  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_ITEMS || []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Nearest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [mapFood, setMapFood] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [claimedSuccess, setClaimedSuccess] = useState(false);
  const [savedIds, setSavedIds] = useState([1, 4]);

  // State Riwayat Pesanan dengan pengaman array kosong
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 1729001234,
      orderCode: 'KASE-8821',
      buyerName: 'Anggie Pratama',
      foodName: 'Mix Organic Salad',
      provider: 'Nusantara Fresh & Green',
      portions: 2,
      totalPrice: 24000,
      paymentMethod: 'QRIS',
      deliveryMethod: 'pickup',
      status: 'Menunggu Pickup',
      date: 'Hari ini'
    }
  ]);

  // State Dompet Voucher Pengguna
  const [userVouchers, setUserVouchers] = useState([
    { id: 1, name: 'Voucher Potongan Rp 10.000', discountType: 'fixed', discountValue: 10000 }
  ]);

  const [userLocation, setUserLocation] = useState({
    lat: -5.147665,
    lng: 119.413204,
    cityName: 'Makassar, Sulawesi Selatan',
    isReal: false
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`);
            const data = await response.json();
            const detectedCity = data.address?.city || data.address?.town || data.address?.county || data.address?.state || "Lokasi Anda";

            setUserLocation({
              lat: lat,
              lng: lng,
              cityName: detectedCity,
              isReal: true
            });
          } catch (err) {
            setUserLocation({
              lat: lat,
              lng: lng,
              cityName: 'Lokasi Anda Saat Ini',
              isReal: true
            });
          }
        },
        (error) => {
          console.warn("Izin GPS tidak diberikan atau gagal:", error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  // User Profile state (Eco-Points & Gelar Pahlawan)
  const [userStats, setUserStats] = useState({
    mealsSaved: 12,
    wastePreventedKg: 8.4,
    moneySavedRp: 186000,
    ecoPoints: 600,
    ecoTitle: 'Food Guardian (Lv. 2)'
  });

  const calculateEcoTitle = (meals) => {
    if (meals >= 30) return { title: 'KASE Legend / Zero-Waste Ambassador', level: 'Lv. 4' };
    if (meals >= 16) return { title: 'Earth Protector', level: 'Lv. 3' };
    if (meals >= 6) return { title: 'Food Guardian', level: 'Lv. 2' };
    return { title: 'Seedling Saver', level: 'Lv. 1' };
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('kase_user', JSON.stringify(userData));
    if (userData.role === 'merchant') {
      setActiveTab('provider');
    } else {
      setActiveTab('landing');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kase_user');
    setActiveTab('landing');
  };

  const toggleSave = (id, e) => {
    if (e) e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFoodItems = useMemo(() => {
    const items = foodItems || [];
    return items.filter(item => {
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

  const handleClaimFood = (food, portionsClaimed = 1, checkoutDetails = {}) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setFoodItems(prev => (prev || []).map(item => {
      if (item.id === food.id) {
        return { ...item, portionsLeft: Math.max(0, item.portionsLeft - portionsClaimed) };
      }
      return item;
    }));

    setUserStats(prev => {
      const newMealsSaved = prev.mealsSaved + portionsClaimed;
      const newEcoPoints = prev.ecoPoints + (50 * portionsClaimed);
      const updatedBadge = calculateEcoTitle(newMealsSaved);

      return {
        ...prev,
        mealsSaved: newMealsSaved,
        wastePreventedKg: parseFloat((prev.wastePreventedKg + (0.4 * portionsClaimed)).toFixed(1)),
        moneySavedRp: prev.moneySavedRp + ((food.originalPrice - food.kasePrice) * portionsClaimed),
        ecoPoints: newEcoPoints,
        ecoTitle: `${updatedBadge.title} (${updatedBadge.level})`
      };
    });

    const randomOrderCode = `KASE-${Math.floor(1000 + Math.random() * 9000)}`;
    const initialStatus = checkoutDetails.deliveryMethod === 'instant' ? 'Dalam Perjalanan Kurir' : 'Menunggu Pickup';

    const newOrder = {
      id: Date.now(),
      orderCode: randomOrderCode,
      buyerName: currentUser?.name || 'Rescue Hero',
      foodName: food.name,
      provider: food.provider,
      portions: portionsClaimed,
      totalPrice: checkoutDetails.finalTotalPrice !== undefined ? checkoutDetails.finalTotalPrice : (food.kasePrice * portionsClaimed),
      paymentMethod: checkoutDetails.paymentMethod || 'QRIS',
      deliveryMethod: checkoutDetails.deliveryMethod || 'pickup',
      status: initialStatus,
      date: 'Baru saja'
    };

    setOrderHistory(prev => [newOrder, ...(prev || [])]);
    setClaimedSuccess(true);
  };

  const handleRedeemVoucher = (voucherName, pointsCost, discountType, discountValue) => {
    if (userStats.ecoPoints >= pointsCost) {
      setUserStats(prev => ({
        ...prev,
        ecoPoints: prev.ecoPoints - pointsCost
      }));

      const newVoucher = {
        id: Date.now(),
        name: voucherName,
        discountType,
        discountValue
      };

      setUserVouchers(prev => [newVoucher, ...(prev || [])]);
      alert(`Berhasil! Voucher "${voucherName}" ditambahkan ke dompet voucher kamu. 🎉`);
    } else {
      alert("Maaf, Eco-Points kamu belum mencukupi untuk menukar voucher ini. Yuk, selamatkan lebih banyak makanan lagi!");
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrderHistory(prev => (prev || []).map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const handleAddNewSurplus = (newItem) => {
    const created = {
      ...newItem,
      id: Date.now(),
      rating: 5.0,
      distance: "0.2 km",
      saved: false,
      badge: "Baru Diupload"
    };
    setFoodItems(prev => [created, ...(prev || [])]);
    setIsListModalOpen(false);
  };

  const handleUpdateFood = (updatedFood) => {
    setFoodItems(prev => (prev || []).map(item => item.id === updatedFood.id ? updatedFood : item));
  };

  const handleDeleteFood = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus makanan ini dari listing?")) {
      setFoodItems(prev => (prev || []).filter(item => item.id !== id));
    }
  };

  if (!currentUser) {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F8] text-[#0D0D0D] relative">
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsListModalOpen={setIsListModalOpen}
        savedCount={savedIds.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'landing' && (
          <LandingPage 
            foodItems={foodItems || []}
            onDiscoverClick={() => setActiveTab('discover')}
            onListClick={() => setIsListModalOpen(true)}
            onSelectFood={(food) => { setSelectedFood(food); setIsClaimModalOpen(true); }}
            toggleSave={toggleSave}
            savedIds={savedIds}
            onOpenMap={(food) => setMapFood(food)}
            userStats={userStats}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverPage 
            foodItems={filteredFoodItems || []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectFood={(food) => { setSelectedFood(food); setIsClaimModalOpen(true); }}
            toggleSave={toggleSave}
            savedIds={savedIds}
            onOpenMap={(food) => setMapFood(food)}
            userLocation={userLocation}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersPage 
            orderHistory={orderHistory || []}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onBrowseClick={() => setActiveTab('discover')}
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

        {activeTab === 'provider' && (
          <ProviderPage 
            foodItems={foodItems || []}
            onOpenListModal={() => setIsListModalOpen(true)}
            onUpdateFood={handleUpdateFood}
            onDeleteFood={handleDeleteFood}
            currentUser={currentUser}
            orderHistory={orderHistory || []}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage 
            userStats={userStats} 
            savedCount={savedIds.length} 
            currentUser={currentUser} 
            onOpenMap={(food) => setMapFood(food)}
            orderHistory={orderHistory || []}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRedeemVoucher={handleRedeemVoucher}
            userVouchers={userVouchers || []}
          />
        )}
      </main>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab('discover')}
        className="fixed bottom-20 md:bottom-8 right-6 z-30 w-14 h-14 bg-kaseDark text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border border-white/20 group"
        title="Jelajahi Makanan"
      >
        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform text-kaseAmber" />
      </motion.button>

      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />

      <AnimatePresence>
        {isClaimModalOpen && selectedFood && (
          <FoodDetailModal 
            food={selectedFood}
            onClose={() => {
              setIsClaimModalOpen(false);
              setClaimedSuccess(false);
              if (claimedSuccess) {
                setActiveTab('orders');
              }
            }}
            onClaim={(portions, checkoutDetails) => handleClaimFood(selectedFood, portions, checkoutDetails)}
            isSuccess={claimedSuccess}
            onOpenMap={(food) => {
              setIsClaimModalOpen(false);
              setMapFood(food);
            }}
            orderHistory={orderHistory || []}
            userVouchers={userVouchers || []}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isListModalOpen && (
          <ListSurplusModal 
            onClose={() => setIsListModalOpen(false)}
            onSubmit={handleAddNewSurplus}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mapFood !== null && (
          <MapModal 
            food={typeof mapFood === 'object' ? mapFood : null} 
            foodItems={foodItems || []}
            userLocation={userLocation}
            onClose={() => setMapFood(null)} 
            onSelectFood={(food) => {
              setSelectedFood(food);
              setIsClaimModalOpen(true);
              setMapFood(null);
            }}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}