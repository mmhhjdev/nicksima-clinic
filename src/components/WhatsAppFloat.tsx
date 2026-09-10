import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const whatsappNumber = "989101626504";
  const defaultMessage = encodeURIComponent("باسلام، جهت دریافت مشاوره و نوبت‌دهی در کلینیک پری سیما پیام می‌دهم.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ارتباط در واتساپ"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      {/* Tooltip on hover */}
      <span className="absolute left-16 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-sans">
        مشاوره سریع در واتساپ
      </span>
    </a>
  );
};

export default WhatsAppFloat;