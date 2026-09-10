import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  textColor?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  textColor = 'dark',
  showSubtitle = true,
}) => {
  const isDark = textColor === 'dark';

  // ابعاد بزرگ‌تر برای تصویر لوگو
  const iconSizes = {
    sm: 'w-14 h-14 sm:w-16 sm:h-16',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  // ابعاد بزرگ‌تر و خوانا برای نوشته‌ها
  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };

  const subtitleSizes = {
    sm: 'text-[11px] sm:text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-sm sm:text-base',
  };

  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <div className="flex items-center gap-3 select-none">
      <img 
        src={logoSrc} 
        alt="لوگو خانه درماتولوژی نیک سیما" 
        className={`${iconSizes[size]} object-contain flex-shrink-0`}
      />

      <div className="flex flex-col text-right">
        <span
          className={`font-header font-black leading-tight ${titleSizes[size]} ${
            isDark ? 'text-[#0F172A]' : 'text-white'
          }`}
        >
          خانه درماتولوژی{' '}
          <span className="font-header font-black text-[#0284C7]">
            نیک سیما
          </span>
        </span>

        {showSubtitle && (
          <span
            className={`font-header font-bold ${subtitleSizes[size]} ${
              isDark ? 'text-slate-500' : 'text-slate-300'
            } mt-0.5`}
          >
            پوست، مو و جوانسازی
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;