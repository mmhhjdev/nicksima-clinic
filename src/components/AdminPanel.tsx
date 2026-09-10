import React, { useState, useEffect } from 'react';
import { 
  X, Phone, RefreshCw, Database, Trash2, 
  Edit3, Save, Search, Filter, Lock, LogOut, AlertCircle 
} from 'lucide-react';
import { Consultation } from '../types';
import { 
  fetchConsultations, 
  updateConsultationStatus, 
  updateConsultationNotes, 
  deleteConsultation 
} from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshStats?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onRefreshStats,
}) => {
  // مدیریت ورود و احراز هویت
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLiveSupabase, setIsLiveSupabase] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'called' | 'completed'>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  
  // Note editing state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // رمز عبور ورود به پنل
  const ADMIN_PASSWORD = 'admin.772-pass'; 

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchConsultations();
      setConsultations(res.data);
      // بررسی اینکه آیا ارطی با دیتابیس برقرار بوده یا خیر
      setIsLiveSupabase(!res.error);
      if (onRefreshStats) onRefreshStats();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // بررسی رمز عبور
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'called' | 'completed') => {
    const success = await updateConsultationStatus(id, newStatus);
    if (success) {
      setConsultations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (onRefreshStats) onRefreshStats();
    }
  };

  const handleSaveNotes = async (id: string) => {
    const success = await updateConsultationNotes(id, editingNoteText);
    if (success) {
      setConsultations(prev => prev.map(c => c.id === id ? { ...c, notes: editingNoteText } : c));
      setEditingNoteId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این درخواست نوبت اطمینان دارید؟')) {
      const success = await deleteConsultation(id);
      if (success) {
        setConsultations(prev => prev.filter(c => c.id !== id));
        if (onRefreshStats) onRefreshStats();
      }
    }
  };

  // Filtered consultations
  const filteredList = consultations.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (doctorFilter !== 'all' && item.doctor_name !== doctorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.patient_name?.toLowerCase().includes(q) || false;
      const matchPhone = item.phone?.includes(q) || false;
      const matchId = item.id?.toLowerCase().includes(q) || false;
      const matchService = item.service_type?.toLowerCase().includes(q) || false;
      return matchName || matchPhone || matchId || matchService;
    }
    return true;
  });

  const pendingCount = consultations.filter(c => c.status === 'pending').length;
  const calledCount = consultations.filter(c => c.status === 'called').length;
  const completedCount = consultations.filter(c => c.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right">
        
        {/* Panel Header */}
        <div className="p-4 sm:p-6 bg-[#0F172A] text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-[#38BDF8]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-header text-lg sm:text-xl font-black">پنل مدیریت نوبت‌ها (منشی مطب)</h3>
                {isAuthenticated && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isLiveSupabase
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {isLiveSupabase ? 'Supabase Connected' : 'Connection Error'}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-slate-400 mt-0.5">
                کلینیک زیبایی و درماتولوژی پری سیما &bull; جدول consultations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  title="بارگذاری مجدد"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  <LogOut className="w-3.5 h-3.5" /> خروج
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* لایه فرم ورود با رمز عبور */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-[#0284C7] mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">ورود به پنل مدیریت</h3>
            <p className="text-xs text-slate-500 mb-6">جهت دسترسی رمز عبور منشی را وارد کنید</p>
            
            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-3">
              <div>
                <input 
                  type="password"
                  placeholder="رمز عبور..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] text-center text-base"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> رمز عبور اشتباه است
                  </p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-xl hover:bg-[#0F172A] transition"
              >
                ورود
              </button>
            </form>
          </div>
        ) : (
          /* محتوای اصلی پنل پس از ورود */
          <>
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F8FAFC] border-b border-slate-200 text-xs">
              <div 
                onClick={() => setStatusFilter('all')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  statusFilter === 'all' ? 'bg-white border-[#1E3A8A] shadow-xs' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="font-sans text-slate-500 block">کل درخواست‌ها</span>
                <strong className="font-header text-lg font-black text-[#0F172A]">{consultations.length}</strong>
              </div>

              <div 
                onClick={() => setStatusFilter('pending')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  statusFilter === 'pending' ? 'bg-amber-50 border-amber-500 shadow-xs' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="font-sans text-amber-700 block font-semibold">در انتظار تماس منشی</span>
                <strong className="font-header text-lg font-black text-amber-900">{pendingCount}</strong>
              </div>

              <div 
                onClick={() => setStatusFilter('called')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  statusFilter === 'called' ? 'bg-blue-50 border-blue-500 shadow-xs' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="font-sans text-blue-700 block font-semibold">تماس گرفته شده</span>
                <strong className="font-header text-lg font-black text-blue-900">{calledCount}</strong>
              </div>

              <div 
                onClick={() => setStatusFilter('completed')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  statusFilter === 'completed' ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="font-sans text-emerald-700 block font-semibold">نوبت نهایی / تکمیل شده</span>
                <strong className="font-header text-lg font-black text-emerald-900">{completedCount}</strong>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو بر اساس نام بیمار، شماره تماس یا کد پیگیری..."
                  className="font-sans w-full pl-3 pr-9 py-2 rounded-xl border border-slate-300 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] text-xs outline-hidden"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                  className="font-sans px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium outline-hidden bg-white"
                >
                  <option value="all">همه پزشکان</option>
                  <option value="دکتر سید علی هجرتی">دکتر سید علی هجرتی (کاشت مو و جوانسازی)</option>
                  <option value="دکتر محمدجواد نخعی">دکتر محمدجواد نخعی (درماتولوژی و پوست)</option>
                </select>
              </div>
            </div>

            {/* Consultations Table / List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredList.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Database className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="font-sans text-xs">هیچ درخواست نوبتی یافت نشد یا ارتباط با پایگاه داده برقرار نیست.</p>
                </div>
              ) : (
                filteredList.map((item) => {
                  const isEditing = editingNoteId === item.id;
                  const dateDisplay = item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : '';

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all text-xs ${
                        item.status === 'pending'
                          ? 'bg-amber-50/40 border-amber-200'
                          : item.status === 'called'
                          ? 'bg-blue-50/40 border-blue-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs bg-white text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                            {item.id}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="font-header text-sm text-[#0F172A] font-black">{item.patient_name}</strong>
                              <span className="font-sans text-[11px] text-slate-400 font-mono" dir="ltr">{dateDisplay}</span>
                            </div>
                            <div className="font-sans flex items-center gap-3 text-slate-600 mt-1">
                              <span className="flex items-center gap-1 font-mono font-bold text-[#1E3A8A]">
                                <Phone className="w-3 h-3 text-[#0284C7]" />
                                <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                              </span>
                              <span>&bull;</span>
                              <span className="font-medium text-[#0284C7]">{item.doctor_name}</span>
                              <span>&bull;</span>
                              <span className="text-slate-700">{item.service_type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${item.phone}`}
                            className="font-header px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1"
                            title="تماس تلفنی با بیمار"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>تماس</span>
                          </a>

                          <a
                            href={`https://wa.me/98${item.phone?.replace(/^0/, '') || ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-header px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                            title="پیام واتساپ به بیمار"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                            </svg>
                            <span>واتساپ</span>
                          </a>

                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                            className={`font-header px-2.5 py-1.5 rounded-lg font-bold text-xs outline-hidden cursor-pointer border ${
                              item.status === 'pending'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : item.status === 'called'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}
                          >
                            <option value="pending">در انتظار تماس منشی</option>
                            <option value="called">تماس گرفته شد</option>
                            <option value="completed">نوبت قطعی / تکمیل</option>
                          </select>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="حذف رکورد"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
                        {isEditing ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value)}
                              placeholder="یادداشت منشی..."
                              className="font-sans flex-1 px-3 py-1 rounded-lg border border-slate-300 text-xs outline-hidden"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveNotes(item.id)}
                              className="font-header px-2.5 py-1 rounded-lg bg-[#1E3A8A] text-white text-xs font-bold flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" />
                              <span>ذخیره</span>
                            </button>
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="font-header px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs"
                            >
                              انصراف
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-between bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200">
                            <span className="font-sans text-slate-600 truncate">
                              {item.notes ? (
                                <>
                                  <strong className="text-slate-800">یادداشت منشی: </strong>
                                  {item.notes}
                                </>
                              ) : (
                                <span className="text-slate-400 italic">بدون یادداشت منشی...</span>
                              )}
                            </span>

                            <button
                              onClick={() => {
                                setEditingNoteId(item.id);
                                setEditingNoteText(item.notes || '');
                              }}
                              className="font-header text-[#0284C7] hover:underline text-[11px] font-semibold flex items-center gap-1 flex-shrink-0 mr-2"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{item.notes ? 'ویرایش یادداشت' : 'افزودن یادداشت'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Panel Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span className="font-sans">مجموع رکوردهای منطبق: {filteredList.length} مورد</span>
              <button
                onClick={onClose}
                className="font-header px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
              >
                بستن پنل
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};