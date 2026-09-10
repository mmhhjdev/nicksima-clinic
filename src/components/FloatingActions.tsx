import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FloatingActionsProps {
  onOpenBooking: (doctorId?: string) => void;
}

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-1.001z"/>
  </svg>
);

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const whatsappNumber = "989101646504";
  const defaultMessage = encodeURIComponent("باسلام، جهت دریافت مشاوره و نوبت‌دهی در کلینیک پری سیما پیام می‌دهم.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3" style={{ direction: 'ltr' }}>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95"
        title="ارتباط در واتساپ"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${CLINIC_INFO.phone1}`}
        className="w-12 h-12 rounded-full bg-[#1E3A8A] hover:bg-[#0F172A] text-white flex items-center justify-center shadow-lg shadow-blue-900/30 transition-all hover:scale-110 active:scale-95"
        title="تماس مستقیم"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Booking Quick Button */}
      <button
        onClick={() => onOpenBooking()}
        className="h-12 px-4 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-header text-xs font-bold shadow-lg shadow-sky-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        style={{ direction: 'rtl' }}
      >
        <Calendar className="w-4 h-4" />
        <span>ثبت درخواست نوبت</span>
      </button>
    </div>
  );
};

export default FloatingActions;