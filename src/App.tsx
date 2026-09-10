import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoctorsSection as PromotionsSection } from './components/DoctorsSection';
import { ServicesSection } from './components/ServicesSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminPanel } from './components/AdminPanel';
import { Service } from './types';
import { fetchConsultations } from './lib/supabase';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // محاسبه تعداد درخواست‌های در انتظار مستقیماً از Supabase
  const refreshPendingCount = useCallback(async () => {
    try {
      const result = await fetchConsultations();
      if (result && result.isLiveSupabase && Array.isArray(result.data)) {
        const count = result.data.filter((item: any) => item && item.status === 'pending').length;
        setPendingCount(count);
      } else {
        setPendingCount(0);
      }
    } catch (error) {
      console.error('Error fetching consultations from Supabase:', error);
      setPendingCount(0);
    }
  }, []);

  useEffect(() => {
    refreshPendingCount();
  }, [refreshPendingCount]);

  // ۱. میانبر کیبورد: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isAKey = e.key.toLowerCase() === 'a' || e.key === 'ش' || e.code === 'KeyA';
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && isAKey) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ۲. کلیک مخفی روی فوتر برای ورود به پنل (چهار بار کلیک)
  const handleSecretTripleClick = (e: React.MouseEvent) => {
    if (e.detail === 4) {
      setIsAdminOpen(true);
    }
  };

  const handleOpenBooking = (serviceId?: string) => {
    const srvId = typeof serviceId === 'string' ? serviceId : undefined;
    setSelectedServiceId(srvId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  const handleSelectServiceForBooking = (service: Service) => {
    if (service) {
      setSelectedServiceId(service.id);
      setIsBookingOpen(true);
    }
  };

  const handleConsultationSubmitted = () => {
    refreshPendingCount();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col font-sans selection:bg-[#0284C7] selection:text-white" dir="rtl">
      
      {/* Navbar Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingCount={pendingCount}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <PromotionsSection onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />
        <ArticlesSection />
        <ContactSection onOpenBooking={() => handleOpenBooking()} />
        <FaqSection />
      </main>

      {/* Footer */}
      <div onClick={handleSecretTripleClick} className="cursor-default select-none">
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>

      {/* Floating Action Buttons */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Modals */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
        onConsultationSubmitted={handleConsultationSubmitted}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshStats={refreshPendingCount}
      />
    </div>
  );
}

export default App;