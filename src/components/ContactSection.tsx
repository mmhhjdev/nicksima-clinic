import React, { useEffect } from 'react';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const lat = 35.803450;
  const lng = 51.420350;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  
  // لینک واتساپ فقط برای شماره همراه ۱ (09101646504)
  const whatsappUrl1 = `https://wa.me/989101646504?text=${encodeURIComponent("باسلام، جهت دریافت مشاوره و نوبت‌دهی در کلینیک پری سیما پیام می‌دهم.")}`;

  // تزریق پویای اسکیمای محلی مطب پزشکی (MedicalClinic Schema) برای سئوی لوکال
  useEffect(() => {
    // ایجاد URL داینامیک و امن برای پشتیبانی از گیت‌هاب پیج
    const dynamicBaseUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;

    const clinicSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": CLINIC_INFO.name,
      "image": `${dynamicBaseUrl}logo.png`, // آدرس داینامیک لوگو برای سئو
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_INFO.address,
        "addressLocality": "تهران",
        "addressCountry": "IR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": lat,
        "longitude": lng
      },
      "telephone": CLINIC_INFO.phone1,
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      },
      "url": dynamicBaseUrl
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'clinic-local-schema';
    script.text = JSON.stringify(clinicSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('clinic-local-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [lat, lng]);

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="font-header">راه‌های ارتباطی و موقعیت مطب</span>
          </div>
          <h2 className="font-header text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            تماس و مراجعه به کلینیک پری سیما
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-2">
            جهت ویزیت، مشاوره یا کسب اطلاعات بیشتر می‌توانید با شماره‌های زیر تماس حاصل فرمایید.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Office Landlines */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 text-right space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="font-header text-sm font-black text-[#0F172A]">تلفن‌های ثابت مطب</h3>
                  <p className="font-sans text-[11px] text-slate-500 mt-0.5">پاسخگویی در ساعات کاری کلینیک</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-bold">
                <a 
                  href={`tel:${CLINIC_INFO.phone1}`} 
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] hover:shadow-xs transition-all"
                >
                  <span className="font-sans text-slate-500 text-[11px]">خط اول:</span>
                  <span className="font-sans font-extrabold tracking-wide text-slate-800 [direction:ltr]">{CLINIC_INFO.phone1Display}</span>
                </a>
                <a 
                  href={`tel:${CLINIC_INFO.phone2}`} 
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] hover:shadow-xs transition-all"
                >
                  <span className="font-sans text-slate-500 text-[11px]">خط دوم:</span>
                  <span className="font-sans font-extrabold tracking-wide text-slate-800 [direction:ltr]">{CLINIC_INFO.phone2Display}</span>
                </a>
              </div>
            </div>

            {/* Card 2: Mobile & WhatsApp Support */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 text-right space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-header text-sm font-black text-[#0F172A]">شماره‌های همراه و پشتیبانی</h3>
                  <p className="font-sans text-[11px] text-slate-500 mt-0.5">تماس تلفنی و گفتگو در واتساپ</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-bold">
                
                {/* همراه ۱ - دارای واتساپ و تماس */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2">
                  <a href={`tel:${CLINIC_INFO.mobile1}`} className="flex items-center gap-2 hover:text-[#0284C7]">
                    <span className="font-sans text-[11px] text-slate-500">همراه ۱:</span>
                    <span className="font-sans font-extrabold tracking-wide text-slate-800 [direction:ltr]">{CLINIC_INFO.mobile1Display}</span>
                  </a>
                  <a 
                    href={whatsappUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>چت واتساپ</span>
                  </a>
                </div>

                {/* همراه ۲ - فقط تماس تلفنی */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2">
                  <a href={`tel:${CLINIC_INFO.mobile2}`} className="flex items-center gap-2 hover:text-[#0284C7]">
                    <span className="font-sans text-[11px] text-slate-500">همراه ۲:</span>
                    <span className="font-sans font-extrabold tracking-wide text-slate-800 [direction:ltr]">{CLINIC_INFO.mobile2Display}</span>
                  </a>
                  <a 
                    href={`tel:${CLINIC_INFO.mobile2}`}
                    className="px-2.5 py-1 bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>تماس تلفنی</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Card 3: Address & Working Hours */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 text-right space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="font-header text-sm font-black text-[#0F172A]">آدرس دقیق کلینیک</h3>
                  <p className="font-sans text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600 font-sans">
                <Clock className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>{CLINIC_INFO.workingHours}</span>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="pt-1">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#F8FAFC] border border-slate-200 hover:border-[#0284C7] hover:bg-[#F0F9FF] rounded-xl text-slate-700 font-header font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#0284C7]" />
                <span>مسیریابی با گوگل مپ (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-7 h-[420px] lg:h-[580px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
            <iframe
              title="موقعیت مکانی کلینیک زیبایی پری سیما"
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=fa&z=18&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

        {/* CTA Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-950/10">
          <div>
            <h4 className="font-header text-base sm:text-lg font-black">تمایل به رزرو آنلاین نوبت دارید؟</h4>
            <p className="font-sans text-xs text-slate-300 mt-1">با تکمیل فرم ساده، منشی مطب جهت هماهنگی با شما تماس خواهد گرفت.</p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="font-header px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>ثبت نوبت در سامانه</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;