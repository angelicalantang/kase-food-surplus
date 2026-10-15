import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix ikon marker Leaflet standar di React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapModal({ food, onClose }) {
  if (!food) return null;

  // Koordinat default (Manado / lokasi resto)
  const position = food.coordinates || [-0.9405, 100.3601]; // Default lokasi jika koordinat tidak diset
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.provider + ' ' + (food.location || 'Manado'))}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative overflow-hidden"
      >
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md text-gray-600 hover:text-kaseDark flex items-center justify-center transition-all"
        >
          <X size={18} />
        </button>

        {/* Header Info Resto */}
        <div className="flex items-start gap-4 mb-5 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-kaseMint flex items-center justify-center text-kaseGreen shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-kaseGreen uppercase tracking-wider">Lokasi Penjemputan</span>
            <h2 className="text-xl font-extrabold text-kaseDark leading-tight">{food.provider}</h2>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <span>{food.location || 'Manado, Sulawesi Utara'}</span>
              <span>•</span>
              <span className="font-semibold text-kaseDark">{food.distance || '0.5 km'} dari lokasi kamu</span>
            </p>
          </div>
        </div>

        {/* Peta Interaktif Leaflet */}
        <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-inner border border-black/5 relative z-0">
          <MapContainer 
            center={position} 
            zoom={15} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-xs">
                  <strong className="block text-kaseDark">{food.provider}</strong>
                  <span className="text-gray-500">{food.name}</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Action Footer */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F4F5F8] p-4 rounded-2xl">
          <div className="text-xs text-gray-600">
            <p className="font-bold text-kaseDark">Waktu Ambil: {food.pickupTime}</p>
            <p className="text-[11px] text-gray-500">Tunjukkan bukti klaim di aplikasi saat mengambil makanan.</p>
          </div>

          <a 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-kaseDark hover:bg-kaseGreen text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Navigation size={14} />
            <span>Petunjuk Arah (Google Maps)</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}