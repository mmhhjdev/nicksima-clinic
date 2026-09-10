import React, { useState } from 'react';
import { X, MessageCircle, Send, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { submitConsultation } from '../lib/supabase.ts'; // استفاده از تابع آماده ثبت نوبت

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const whatsappNumber = "989101626504";
  const whatsappDisplay = "0910-1626504";
  const defaultMessage = encodeURIComponent("باسلام، جهت دریافت مشاوره و نوبت‌دهی در خانه درماتولوژی نیک سیما پیام می‌دهم.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // فراخوانی تابع استاندارد موجود در supabase.ts
      const result = await submitConsultation({
        patient_name: fullName,
        phone: phone,
        doctor_name: 'تعیین نشده',
        service_type: 'ثبت نام از طریق سایت',
      });

      if (!result.success) {
        throw new Error(result.error || 'خطا در ثبت اطلاعات');
      }

      console.log('Saved successfully, Is Live Supabase:', result.isLiveSupabase);
      setSuccess(true);
    } catch (err: any) {
      console.error('Submit Error:', err);
      setErrorMsg(err.message || 'خطا در ثبت اطلاعات. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setFullName('');
    setPhone('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 text-right animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* دکمه بستن */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-header text-xl font-black text-slate-900">درخواست شما با موفقیت ثبت شد</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              همکاران ما در اسرع وقت جهت هماهنگی زمان دقیق ثبت نوبت با شما تماس خواهند گرفت.
            </p>
            <button
              onClick={handleResetAndClose}
              className="w-full bg-[#1E3A8A] hover:bg-[#0F172A] text-white font-bold py-3 rounded-xl transition text-xs font-header cursor-pointer mt-4"
            >
              بستن پنجره
            </button>
          </div>
        ) : (
          <>
            {/* سربرگ */}
            <div className="mb-6">
              <h3 className="font-header text-xl sm:text-2xl font-black text-slate-900">ثبت درخواست نوبت</h3>
              <p className="text-xs text-slate-500 mt-1">
                اطلاعات خود را وارد کنید یا مستقیم در واتساپ پیام دهید.
              </p>
            </div>

            {/* خطا در صورت وجود */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* گزینه مشاوره مستقیم در واتساپ */}
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="block font-header text-xs font-bold text-emerald-950">ارتباط فوری در واتساپ</span>
                  <span className="text-[11px] text-emerald-700 font-mono" dir="ltr">{whatsappDisplay}</span>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>چت واتساپ</span>
              </a>
            </div>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">یا تکمیل فرم زیر</span>
            </div>

            {/* فرم دریافت اطلاعات */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-header">نام و نام خانوادگی</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: علی محمدی"
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-header">شماره تماس (همراه)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    maxLength={11}
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] text-xs font-mono text-right dir-ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3A8A] hover:bg-[#0F172A] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs font-header shadow-md mt-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'در حال ثبت در سیستم...' : 'ثبت نوبت در سیستم'}</span>
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default BookingModal;