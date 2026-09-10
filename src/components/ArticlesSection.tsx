import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, X } from 'lucide-react';
import { ARTICLES, Article } from '../data/articlesData';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="articles" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="font-header">مجله سلامت و زیبایی</span>
          </div>
          <h2 className="font-header text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            آخرین مقالات و مقالات تخصصی کلینیک پری سیما
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-2">
            دانستنی‌های علمی درباره پوست، مو، کاشت و روش‌های نوین زیبایی زیر نظر پزشکان متخصص
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-slate-200 hover:border-[#0284C7] hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-[#0284C7] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2.5 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} مطالعه
                    </span>
                  </div>

                  <h3 className="font-header text-base font-black text-[#0F172A] group-hover:text-[#0284C7] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1 font-sans">
                  <User className="w-3.5 h-3.5 text-[#0284C7]" />
                  {article.author}
                </span>
                <span className="text-xs font-bold text-[#0284C7] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform font-header">
                  مطالعه مقاله <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 left-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block bg-[#F0F9FF] text-[#0284C7] text-xs font-bold px-3 py-1 rounded-md border border-[#BAE6FD] mb-3 font-header">
              {selectedArticle.category}
            </span>

            <h2 className="font-header text-xl sm:text-2xl font-black text-[#0F172A] leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 my-4 font-sans border-y border-slate-100 py-3">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <User className="w-4 h-4 text-[#0284C7]" />
                {selectedArticle.author}
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} مطالعه</span>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="font-sans text-sm text-slate-700 leading-loose space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="font-header bg-[#0284C7] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#0284C7]/90 transition-colors"
              >
                بستن مقاله
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ArticlesSection;