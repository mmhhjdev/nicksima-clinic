import React from 'react';
import { Calendar, Phone, MessageSquare, MapPin, ShieldCheck, Award } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      
      {/* Background Medical/Clinic Image with Light Clean Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600"
          alt="خانه درماتولوژی نیک سیما"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Light Overlay to keep texts sharp and dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF]/95 via-[#FFFFFF]/90 to-[#FFFFFF]/95" />
      </div>

      {/* Smooth Bottom Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Top Minimal Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#BAE6FD] shadow-xs text-xs font-semibold text-[#0284C7] font-header">
            <Award className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>مرکز تخصصی پوست، مو و جوانسازی</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          
          {/* عنوان اصلی صفحه با فونت کاملاً یکپارچه و هماهنگ (Almarai) */}
          <h1 className="font-header text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            خانه درماتولوژی <span className="font-header font-black text-[#0284C7]">نیک سیما</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            ارائه تخصصی‌ترین خدمات کاشت مو، مزوتراپی، جوانسازی پوست و فیشیال تخصصی با بهره‌گیری از بروزترین تجهیزات
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-header">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#0284C7] active:scale-95 transition-all shadow-md shadow-blue-950/20 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-sky-300 group-hover:text-white transition-colors" />
              <span>ثبت درخواست نوبت ویزیت</span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-[#1E3A8A] bg-white border border-[#CBD5E1] hover:border-[#0284C7] hover:bg-[#F0F9FF] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#0284C7]" />
              <span>تماس مستقیم با مطب: <strong className="font-mono">{CLINIC_INFO.phone1Display}</strong></span>
            </a>
          </div>

          {/* Clinic Address Direct Line */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>تهران، سه راه زعفرانیه، ساختمان پزشکان زعفرانیه، طبقه 2 ، واحد 7</span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-slate-200/80 font-header text-xs sm:text-sm text-slate-700">
          <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>تجهیزات مدرن و استاندارد</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs">
            <Award className="w-4 h-4 text-[#0284C7]" />
            <span>کادر درمانی متخصص</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs">
            <MessageSquare className="w-4 h-4 text-[#0284C7]" />
            <span>مشاوره تخصصی آنلاین</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;