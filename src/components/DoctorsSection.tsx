import React from 'react';
import { Sparkles, ArrowLeft, Tag, MessageSquare, Image as ImageIcon, Calendar } from 'lucide-react';

interface DoctorsSectionProps {
  onOpenBooking: () => void;
}

// تابع هوشمند برای مدیریت مسیر تصاویر در لوکال و گیت‌هاب پیج
const getAssetPath = (imgPath: string) => {
  const cleanBase = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;
    
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  
  return `${cleanBase}${cleanPath}`;
};

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="promotions" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-3.5 py-1.5 rounded-full border border-[#BAE6FD] mb-3 font-header">
            <Sparkles className="w-4 h-4 text-[#0284C7]" />
            <span>فرصت‌های ویژه کلینیک</span>
          </div>
          <h2 className="font-header text-2xl sm:text-3xl font-black text-[#0F172A]">
            پیشنهادات و جشنواره تخفیفات
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-2">
            از جدیدترین تخفیف‌های درمانی و بسته‌های تخصصی زیبایی کلینیک پری سیما بهره‌مند شوید
          </p>
        </div>

        {/* Promotion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Featured Service Banner */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0284C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            
            {/* استفاده از aspect-video برای نمایش کامل و بدون نقص عکس‌های عریض در همه نمایشگرها */}
            <div className="relative w-full aspect-video overflow-hidden bg-slate-900 flex items-center justify-center">
              <img
                src={getAssetPath('images/special-offer-hair.webp')}
                alt="کاشت و تقویت تخصصی مو"
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#0284C7] text-white font-header text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
                <Tag className="w-3.5 h-3.5" />
                <span>خدمت ویژه</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-header text-lg font-black text-[#0F172A] mb-2">
                  کلینیک تخصصی پیوند و تقویت موی طبیعی
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  ارائه خدمات تخصصی کاشت مو با متد Micro-FIT، مزوتراپی ریشه‌ای و کنترل ریزش با بهره‌گیری از بروزترین تجهیزات و آنالیز دقیق تراکم فولیکول‌ها.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#0284C7] text-xs font-bold font-header">
                  <MessageSquare className="w-4 h-4" />
                  <span>مشاوره تخصصی قبل از اقدام</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="font-header text-xs font-bold text-slate-800 bg-slate-100 hover:bg-[#1E3A8A] hover:text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>دریافت مشاوره</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Placeholder for Future Before & After Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-dashed border-slate-300 shadow-sm flex flex-col items-center justify-center p-8 text-center group hover:border-[#0284C7] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="font-header text-lg font-black text-[#0F172A] mb-2">
              گالری تصاویر قبل و بعد
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed mb-6">
              به زودی می‌توانید نتایج واقعی و نمونه کارهای تخصصی کاشت مو و خدمات زیبایی کلینیک پری سیما را در این بخش مشاهده کنید.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-xl font-header">
              <Calendar className="w-3.5 h-3.5" />
              <span>به زودی...</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;