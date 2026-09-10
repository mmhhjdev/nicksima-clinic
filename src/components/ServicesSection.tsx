import React, { useEffect } from 'react';
import { Layers, Calendar, Check, Star } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { Service } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  // تزریق پویای اسکیمای خدمات پزشکی (Medical Procedures Schema) برای سئوی محلی و تخصصی
  useEffect(() => {
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": SERVICES.map((service, index) => ({
        "@type": "MedicalProcedure",
        "position": index + 1,
        "name": service.title,
        "description": service.shortDescription,
        "procedureType": service.categoryLabel,
        "url": `https://parisima-clinic.ir/#services`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'clinic-services-schema';
    script.text = JSON.stringify(servicesSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('clinic-services-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD] mb-3">
            <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="font-header">خدمات و متدهای درمانی</span>
          </div>
          <h2 className="font-header text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            خدمات تخصصی کلینیک پری سیما
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-2">
            ارائه برترین خدمات زیبایی و درمانی با بالاترین کیفیت و متدهای روز دنیا
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            // اصلاح مسیر عکس برای پشتیبانی از Base URL در گیت‌هاب پیج
            const fixedImageSrc = service.image
              ? service.image.startsWith('http') 
                ? service.image 
                : `${import.meta.env.BASE_URL}${service.image.replace(/^\//, '')}`
              : '';

            return (
              <article
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#0284C7] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Service Image Banner - Fixed aspect ratio & containment */}
                  {service.image && (
                    <div className="relative h-52 w-full overflow-hidden bg-slate-900/5 border-b border-slate-100 flex items-center justify-center">
                      <img
                        src={fixedImageSrc}
                        alt={service.imageAlt || service.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      {service.popular && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                          <Star className="w-3 h-3 fill-current" />
                          <span>محبوب</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category & Clinic Label Tag */}
                    <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                      <span className="font-header text-[11px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded-md border border-[#BAE6FD]">
                        {service.categoryLabel}
                      </span>
                      <span className="font-sans text-[11px] text-slate-500 font-medium truncate">
                        کلینیک پری سیما
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div className="mt-4">
                      <h3 className="font-header text-lg font-black text-[#0F172A] line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {service.benefits?.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 font-sans">
                          <Check className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Treatment Metrics */}
                    <div className="mt-4 bg-[#F8FAFC] rounded-xl p-2.5 grid grid-cols-2 gap-2 text-center text-[11px] border border-slate-100 font-sans">
                      <div>
                        <span className="text-slate-400 block">مدت هر جلسه</span>
                        <strong className="text-slate-700 font-semibold">{service.duration}</strong>
                      </div>
                      <div className="border-r border-slate-200">
                        <span className="text-slate-400 block">دوره نقاهت</span>
                        <strong className="text-slate-700 font-semibold">{service.recoveryTime}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(service)}
                    className="group font-header w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#1E3A8A] bg-[#F0F9FF] hover:bg-[#1E3A8A] hover:text-white border border-[#BAE6FD] hover:border-[#1E3A8A] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#0284C7] group-hover:text-white transition-colors" />
                    <span>ثبت درخواست نوبت این خدمت</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;