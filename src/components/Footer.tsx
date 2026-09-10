import React from 'react';
import { Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" textColor="light" />

            <p className="font-sans text-xs text-slate-400 leading-relaxed font-light mt-3">
              خانه درماتولوژی نیک سیما با بهره‌مندی از تجارب تخصصی دکتر سید علی هجرتی (کد نظام پزشکی: 42171) و دکتر محمدجواد نخعی (کد نظام پزشکی: 83525)، محیطی علمی، ایمن و پیشرفته برای درمان‌های پوستی و زیبایی فراهم آورده است.
            </p>

            {/* عبارت بدون آیکون و با متن جدید */}
            <div className="inline-flex items-center px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] text-xs font-medium mt-2">
              <span>خانه درماتولوژی نیک سیما شعبه‌ی دیگری ندارد.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-header text-sm font-bold text-white border-b border-[#0284C7] pb-2 inline-block">
              دسترسی سریع
            </h4>
            <ul className="font-sans space-y-2 text-xs text-slate-400 font-light">
              <li><a href="#home" className="hover:text-[#38BDF8] transition-colors">صفحه اصلی</a></li>
              <li><a href="#doctors" className="hover:text-[#38BDF8] transition-colors">معرفی پزشکان متخصص</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">لیست خدمات درمانی</a></li>
              <li><a href="#faq" className="hover:text-[#38BDF8] transition-colors">پرسش‌های متداول</a></li>
              <li><a href="#contact" className="hover:text-[#38BDF8] transition-colors">آدرس و تلفن‌های مطب</a></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-header text-sm font-bold text-white border-b border-[#0284C7] pb-2 inline-block">
              اطلاعات مطب و نوبت‌دهی
            </h4>
            <div className="font-sans space-y-2.5 text-xs text-slate-400 font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>تلفن‌های ثابت:</span>
                <span className="font-mono text-white">{CLINIC_INFO.phone1Display}</span>
                <span>-</span>
                <span className="font-mono text-white">{CLINIC_INFO.phone2Display}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>شماره‌های همراه:</span>
                <span className="font-mono text-white">{CLINIC_INFO.mobile1Display}</span>
                <span>-</span>
                <span className="font-mono text-white">{CLINIC_INFO.mobile2Display}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{CLINIC_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="font-header w-full py-2.5 px-4 rounded-xl bg-[#1E3A8A] hover:bg-[#0284C7] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>ثبت درخواست نوبت ویزیت</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-right font-light font-sans">
          <div>
              تمام حقوق متعلق به <strong className="text-slate-400 font-bold">خانه درماتولوژی نیک سیما</strong> می‌باشد.
          </div>
          <div className="text-slate-500 text-[11px]">
            دکتر سید علی هجرتی (کد: 42171) &bull; دکتر محمدجواد نخعی (کد: 83525)
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;