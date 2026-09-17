import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Consultation } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrdyxgctmgaytnxozpu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BGVGg5fa_546MYM1neew_w_0C8d6DxR';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * دریافت نوبت‌ها فقط از Supabase
 */
export async function fetchConsultations(): Promise<{ data: Consultation[]; isLiveSupabase: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('🔴 Supabase Fetch Error:', error.message);
      return { data: [], isLiveSupabase: false, error: error.message };
    }

    return { data: (data || []) as Consultation[], isLiveSupabase: true };
  } catch (err: any) {
    console.error('🔴 Network Error:', err.message);
    return { data: [], isLiveSupabase: false, error: err.message };
  }
}

/**
 * ثبت نوبت جدید فقط در Supabase
 */
export async function submitConsultation(entry: {
  patient_name: string;
  phone: string;
  doctor_name: string;
  service_type: string;
  notes?: string;
}): Promise<{ success: boolean; id: string; isLiveSupabase: boolean; error?: string }> {
  const newRecord = {
    id: crypto.randomUUID(), // تولید شناسه یکتا برای ستون متنی id
    patient_name: entry.patient_name.trim(),
    phone: entry.phone.trim(),
    doctor_name: entry.doctor_name,
    service_type: entry.service_type,
    status: 'pending',
    notes: entry.notes || '',
  };

  const { data, error } = await supabase
    .from('consultations')
    .insert([newRecord])
    .select();

  if (error) {
    console.error('🔴 Supabase Insert Error:', error);
    throw new Error(`خطا در ثبت اطلاعات در سرور ابری: ${error.message}`);
  }

  return { success: true, id: data?.[0]?.id || '', isLiveSupabase: true };
}

/**
 * تابع سازگار با کامپوننت‌های قدیمی برای ثبت نوبت
 */
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

export async function updateConsultationStatus(
  id: string,
  newStatus: 'pending' | 'called' | 'completed'
): Promise<boolean> {
  const { error } = await supabase
    .from('consultations')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('🔴 Update status error:', error);
    return false;
  }
  return true;
}

export async function updateConsultationNotes(
  id: string,
  notes: string
): Promise<boolean> {
  const { error } = await supabase
    .from('consultations')
    .update({ notes })
    .eq('id', id);

  if (error) {
    console.error('🔴 Update notes error:', error);
    return false;
  }
  return true;
}

export async function deleteConsultation(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('consultations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('🔴 Delete error:', error);
    return false;
  }
  return true;
}