import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Consultation } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrdyxgctmgaytnxozpu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BGVGg5fa_546MYM1neew_w_0C8d6DxR';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'parisima_clinic_consultations';

export function getLocalConsultations(): Consultation[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalConsultations(items: Consultation[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error writing to local storage:', err);
  }
}

export function saveLocalConsultation(entry: {
  fullName: string;
  phone: string;
  doctorId?: string;
  serviceId?: string;
  createdAt?: string;
  status?: 'pending' | 'called' | 'completed';
}) {
  return submitConsultation({
    patient_name: entry.fullName,
    phone: entry.phone,
    doctor_name: entry.doctorId || 'تعیین نشده',
    service_type: entry.serviceId || 'تعیین نشده',
  });
}

/**
 * دریافت تمامی نوبت‌ها با قابلیت بازگشت امن به لوکال در صورت قطعی شبکه
 */
export async function fetchConsultations(): Promise<{ data: Consultation[]; isLiveSupabase: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      console.log('Fetching from Supabase...');
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('🔴 SUPABASE FETCH ERROR:', error.message);
        return { data: getLocalConsultations(), isLiveSupabase: false, error: error.message };
      }

      console.log('🟢 Supabase fetch success:', data);
      return { data: (data || []) as Consultation[], isLiveSupabase: true };
    } catch (err) {
      console.warn('⚠️ Network or DNS blocked, falling back to LocalStorage:', err);
      return { data: getLocalConsultations(), isLiveSupabase: false };
    }
  }

  return { data: getLocalConsultations(), isLiveSupabase: false };
}

/**
 * ثبت نوبت جدید با فال‌بک خودکار روی لوکال در صورت قطعی اینترنت/تحریم
 */
export async function submitConsultation(entry: {
  patient_name: string;
  phone: string;
  doctor_name: string;
  service_type: string;
  notes?: string;
}): Promise<{ success: boolean; id: string; isLiveSupabase: boolean; error?: string }> {
  const trackingId = `PRS-${Math.floor(10000 + Math.random() * 90000)}`;
  const newRecord: Consultation = {
    id: trackingId,
    patient_name: entry.patient_name.trim(),
    phone: entry.phone.trim(),
    doctor_name: entry.doctor_name,
    service_type: entry.service_type,
    status: 'pending',
    notes: entry.notes || '',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      console.log('Attempting to insert into Supabase:', newRecord);
      const { data, error } = await supabase
        .from('consultations')
        .insert([newRecord])
        .select();

      if (error) {
        console.error('🔴 SUPABASE INSERT ERROR:', error);
        // به جای متوقف کردن برنامه، روی لوکال ذخیره می‌کنیم تا کاربر معطل نشود
        throw new Error(error.message);
      }

      console.log('🟢 Supabase insert success:', data);
      return { success: true, id: data?.[0]?.id || trackingId, isLiveSupabase: true };
    } catch (err) {
      console.warn('⚠️ Supabase insert failed due to network/DNS, saving to LocalStorage instead.');
    }
  }

  // ذخیره امن روی LocalStorage در صورت عدم دسترسی به دیتابیس ابری
  const localList = getLocalConsultations();
  saveLocalConsultations([newRecord, ...localList]);
  return { success: true, id: trackingId, isLiveSupabase: false };
}

export async function updateConsultationStatus(
  id: string,
  newStatus: 'pending' | 'called' | 'completed'
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('consultations')
        .update({ status: newStatus })
        .eq('id', id);
    } catch {
      // اگر شبکه قطع بود، فقط روی لوکال آپدیت می‌شود تا پنل مختل نشود
    }
  }
  const current = getLocalConsultations();
  const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
  saveLocalConsultations(updated);
  return true;
}

export async function updateConsultationNotes(
  id: string,
  notes: string
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('consultations')
        .update({ notes })
        .eq('id', id);
    } catch {
      // خطا نادیده گرفته می‌شود و لوکال آپدیت می‌گردد
    }
  }
  const current = getLocalConsultations();
  const updated = current.map(item => item.id === id ? { ...item, notes } : item);
  saveLocalConsultations(updated);
  return true;
}

export async function deleteConsultation(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('consultations')
        .delete()
        .eq('id', id);
    } catch {
      // خطا نادیده گرفته می‌شود
    }
  }
  const current = getLocalConsultations();
  const updated = current.filter(item => item.id !== id);
  saveLocalConsultations(updated);
  return true;
}