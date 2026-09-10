import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { saveLocalConsultation } from '../lib/supabase';

// برای شناسایی تابع gtag در تایپ‌اسکریپت
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onConsultationSubmitted?: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onConsultationSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceId || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const whatsappNumber = "989101646504";
  const whatsappDisplay = "0910-1646504";
  const defaultMessage = encodeURIComponent("باسلام، جهت دریافت مشاوره و نوبت‌دهی در کلینیک پری سیما پیام می‌دهم.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  useEffect(() => {
    if (isOpen) {
      setSelectedService(initialServiceId || '');
      setIsSubmitted(false);
      setError('');
    }
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // ولیدیشن خالی نبودن
    if (!fullName.trim() || !phone.trim()) {
      setError('لطفاً نام و شماره تماس خود را وارد کنید.');
      return;
    }

    // ولیدیشن دقیق شماره موبایل ایران (۱۱ رقم با شروع ۰۹)
    const iranPhoneRegex = /^09\d{9}$/;
    if (!iranPhoneRegex.test(phone.trim())) {
      setError('لطفاً یک شماره موبایل معتبر (مثال: 09123456789) وارد کنید.');
      return;
    }

    setLoading(true);

    try {
      // استفاده از تابع ایمن داخل supabase.ts که هم به دیتابیس آنلاین و هم به لوکال استوریج متصل است
      const result = await saveLocalConsultation({
        fullName: fullName.trim(),
        phone: phone.trim(),
        serviceId: selectedService || 'تعیین نشده',
      });

      if (!result.success) {
        throw new Error(result.error || 'خطا در ثبت درخواست');
      }

      // ارسال رویداد ثبت لید به Google Analytics برای سئو
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          service_id: selectedService || 'general',
          event_category: 'consultation_form',
        });
      }

      setIsSubmitted(true);
      if (onConsultationSubmitted) {
        onConsultationSubmitted();
      }
    } catch (err: any) {
      console.error('Error saving consultation:', err);
      setError(err.message || 'خطایی در ثبت درخواست رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFullName('');
    setPhone('');
    setIsSubmitted(false);
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 font-sans">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0284C7]/20 text-[#38BDF8]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-header text-lg font-black">ثبت درخواست نوبت و مشاوره</h3>
              <p className="text-xs text-slate-400 mt-0.5">کلینیک تخصصی پوست، مو و زیبایی پری سیما</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-header text-xl font-bold text-slate-800">درخواست شما با موفقیت ثبت شد</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                همکاران ما در اسرع وقت جهت هماهنگی زمان دقیق ویزیت با شما تماس خواهند گرفت.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold font-header hover:bg-[#0F172A] transition-colors cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* WhatsApp Quick Section */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-right">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-header text-xs font-bold text-emerald-950">ارتباط سریع در واتساپ</span>
                    <span className="text-[11px] text-emerald-700 font-mono" dir="ltr">{whatsappDisplay}</span>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>چت واتساپ</span>
                </a>
              </div>

              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">یا تکمیل فرم درخواست نوبت</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold">
                    {error}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-header">نام و نام خانوادگی *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: علی محمدی"
                      className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-header">شماره موبایل *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      maxLength={11}
                      className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] font-mono dir-ltr text-right"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-header">خدمت مورد درخواست (اختیاری)</label>
                  <div className="relative">
                    <Sparkles className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0284C7] bg-white cursor-pointer"
                    >
                      <option value="">انتخاب خدمت (اختیاری)</option>
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.id}>{srv.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 rounded-xl bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-xs font-bold font-header transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'در حال ثبت...' : 'ثبت و ارسال درخواست'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;