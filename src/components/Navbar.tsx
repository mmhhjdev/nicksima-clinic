import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Flame, MapPin, BookOpen } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import Logo from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // میانبر مخفی کیبورد (Ctrl + Alt + M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        onOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdmin]);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>تهران، سه راه زعفرانیه، ساختمان پزشکان زعفرانیه، طبقه ۲</span>
            </div>
            <div className="flex items-center gap-3 font-mono font-bold text-slate-300">
              <a href={`tel:${CLINIC_INFO.phone1}`} className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                {CLINIC_INFO.phone1Display}
              </a>
              <span>&bull;</span>
              <a href={`tel:${CLINIC_INFO.phone2}`} className="hover:text-white transition-colors">
                {CLINIC_INFO.phone2Display}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Brand - با قابلیت تنظیم سایز متناسب در موبایل */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg">
            <div className="scale-90 sm:scale-100 origin-right">
              <Logo size="sm" textColor="dark" />
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-800 font-header">
            <a href="#promotions" className="hover:text-[#0284C7] transition-colors py-1 flex items-center gap-1.5 text-rose-600">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>فرصت‌های ویژه کلینیک</span>
            </a>
            <a href="#services" className="hover:text-[#0284C7] transition-colors py-1">
              خدمات تخصصی
            </a>
            <a href="#articles" className="hover:text-[#0284C7] transition-colors py-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#0284C7]" />
              <span>مقالات تخصصی</span>
            </a>
            <a href="#contact" className="hover:text-[#0284C7] transition-colors py-1">
              اطلاعات تماس و آدرس
            </a>
          </div>

          {/* CTAs (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 font-header shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#1E3A8A] bg-[#F0F9FF] border border-[#BAE6FD] hover:bg-[#E0F2FE] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#0284C7]" />
              <span className="font-mono">{CLINIC_INFO.phone1Display}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#0F172A] active:scale-95 transition-all shadow-sm shadow-blue-900/20 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#38BDF8]" />
              <span>ثبت درخواست نوبت</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2 font-header">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1E3A8A]"
            >
              نوبت‌دهی
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="منوی اصلی"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-3 animate-in fade-in font-header">
            <a href="#promotions" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-bold text-rose-600 border-b border-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>فرصت‌های ویژه کلینیک</span>
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100">
              خدمات تخصصی
            </a>
            <a href="#articles" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-bold text-slate-800 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0284C7]" />
              <span>مقالات تخصصی</span>
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100">
              اطلاعات تماس و آدرس
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#1E3A8A] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span>ثبت درخواست نوبت ویزیت</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;