import React, { useState } from 'react';
import { Plus, Edit2, Trash2, PlusCircle, MinusCircle } from 'lucide-react';
import EditFoodModal from '../components/EditFoodModal';

export default function ProviderDashboardPage({ foodItems, onOpenListModal, onUpdateFood, onDeleteFood }) {
  const [editingFood, setEditingFood] = useState(null);

  // Quick portion adjuster
  const handleAdjustPortion = (food, delta) => {
    const newPortion = Math.max(0, food.portionsLeft + delta);
    onUpdateFood({
      ...food,
      portionsLeft: newPortion
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-kaseDark text-white rounded-[2.5rem] p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-kaseAmber uppercase">Partner Dashboard</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Your surplus, your impact.</h1>
          <p className="text-xs text-gray-300 mt-1">Warung Nusantara • Kelola Listing Makanan Anda</p>
        </div>
        <button 
          onClick={onOpenListModal}
          className="bg-kaseGreen hover:bg-kaseGreenDark text-white font-bold text-xs px-6 py-3.5 rounded-full shadow transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          <span>+ List Surplus Baru</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Active Listed", val: foodItems.length },
          { label: "Meals Rescued", val: "126" },
          { label: "Waste Prevented", val: "34 kg" },
          { label: "Value Recovered", val: "Rp 3.8M" }
        ].map((st, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-soft border border-black/[0.04]">
            <h3 className="text-2xl font-extrabold text-kaseDark">{st.val}</h3>
            <p className="text-xs text-gray-500">{st.label}</p>
          </div>
        ))}
      </div>

      {/* Active Listings Table with Full Management Controls */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-kaseDark">Kelola & Atur Stok Makanan Aktif</h3>
          <span className="text-xs text-gray-400">Total {foodItems.length} Makanan</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="pb-3 font-semibold">Nama Makanan</th>
                <th className="pb-3 font-semibold">Atur Sisa Porsi</th>
                <th className="pb-3 font-semibold">Harga KASE</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {foodItems.map((food) => {
                let statusLabel = "Available";
                let statusColor = "bg-kaseMint text-kaseGreen";

                if (food.portionsLeft === 0) {
                  statusLabel = "Habis";
                  statusColor = "bg-gray-100 text-gray-500";
                } else if (food.portionsLeft <= 3) {
                  statusLabel = "Hampir Habis";
                  statusColor = "bg-amber-100 text-amber-800";
                }

                return (
                  <tr key={food.id} className="hover:bg-gray-50/50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={food.image} alt={food.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-kaseDark">{food.name}</p>
                          <p className="text-[10px] text-gray-400">{food.category} • {food.pickupTime}</p>
                        </div>
                      </div>
                    </td>

                    {/* Fast Portion Stepper */}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleAdjustPortion(food, -1)}
                          className="text-gray-400 hover:text-kaseRed transition-colors disabled:opacity-30"
                          disabled={food.portionsLeft <= 0}
                          title="Kurangi 1 Porsi"
                        >
                          <MinusCircle size={18} />
                        </button>

                        <span className="font-extrabold text-sm text-kaseDark min-w-[30px] text-center">
                          {food.portionsLeft}
                        </span>

                        <button 
                          onClick={() => handleAdjustPortion(food, 1)}
                          className="text-gray-400 hover:text-kaseGreen transition-colors"
                          title="Tambah 1 Porsi"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-kaseDark">
                      Rp {food.kasePrice.toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>

                    {/* Action Buttons: Edit & Delete */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingFood(food)}
                          className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-kaseDark hover:text-white transition-all"
                          title="Edit Makanan"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => onDeleteFood(food.id)}
                          className="p-2 rounded-xl bg-red-50 text-kaseRed hover:bg-kaseRed hover:text-white transition-all"
                          title="Hapus Makanan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingFood && (
        <EditFoodModal 
          food={editingFood}
          onClose={() => setEditingFood(null)}
          onSave={(updated) => {
            onUpdateFood(updated);
            setEditingFood(null);
          }}
        />
      )}
    </div>
  );
}