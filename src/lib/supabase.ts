import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Consultation } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
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
 * دریافت تمامی نوبت‌ها با لاگ دقیق خطا
 */
export async function fetchConsultations(): Promise<{ data: Consultation[]; isLiveSupabase: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    console.log('Fetching from Supabase...');
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('🔴 SUPABASE FETCH ERROR:', error.message, error.details, error.hint);
      return { data: getLocalConsultations(), isLiveSupabase: false, error: error.message };
    }

    console.log('🟢 Supabase fetch success:', data);
    return { data: (data || []) as Consultation[], isLiveSupabase: true };
  }

  console.log('⚠️ Supabase is not configured, using LocalStorage');
  return { data: getLocalConsultations(), isLiveSupabase: false };
}

/**
 * ثبت نوبت جدید با پرتاب خطای واقعی (بدون مخفی کردن خطا)
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
    console.log('Attempting to insert into Supabase:', newRecord);
    
    const { data, error } = await supabase
      .from('consultations')
      .insert([newRecord])
      .select();

    if (error) {
      console.error('🔴 SUPABASE INSERT ERROR:', error);
      // برای اینکه خطای واقعی در فرم ظاهر شود و بدانیم مشکل کجاست:
      throw new Error(`خطای پایگاه داده: ${error.message} (کد: ${error.code})`);
    }

    console.log('🟢 Supabase insert success:', data);
    return { success: true, id: data?.[0]?.id || trackingId, isLiveSupabase: true };
  }

  // اگر سه‌پابیس تنظیم نشده بود روی لوکال ذخیره کن
  const localList = getLocalConsultations();
  saveLocalConsultations([newRecord, ...localList]);
  return { success: true, id: trackingId, isLiveSupabase: false };
}

export async function updateConsultationStatus(
  id: string,
  newStatus: 'pending' | 'called' | 'completed'
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('consultations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('🔴 Update status error:', error);
      return false;
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
    const { error } = await supabase
      .from('consultations')
      .update({ notes })
      .eq('id', id);

    if (error) {
      console.error('🔴 Update notes error:', error);
      return false;
    }
  }
  const current = getLocalConsultations();
  const updated = current.map(item => item.id === id ? { ...item, notes } : item);
  saveLocalConsultations(updated);
  return true;
}

export async function deleteConsultation(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('consultations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('🔴 Delete error:', error);
      return false;
    }
  }
  const current = getLocalConsultations();
  const updated = current.filter(item => item.id !== id);
  saveLocalConsultations(updated);
  return true;
}