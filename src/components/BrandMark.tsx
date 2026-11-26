import React from 'react';

interface BrandMarkProps {
  customLogoUrl?: string | null;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({customLogoUrl, className = 'w-7 h-7'}) => {
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Naji Specialty Coffee logo"
        referrerPolicy="no-referrer"
        className={`${className} rounded-full object-cover border border-[#E5E0D8]`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="33" height="33" rx="16.5" stroke="#3D5A3C" strokeWidth="1.5" />
      <path
        d="M11 26V16.5C11 12.3579 14.134 9 18 9C21.866 9 25 12.3579 25 16.5V26"
        stroke="#1A1715"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 19.5C14.5 17.567 16.067 16 18 16C19.933 16 21.5 17.567 21.5 19.5C21.5 21.433 19.933 23 18 23C16.067 23 14.5 21.433 14.5 19.5Z"
        stroke="#3D5A3C"
        strokeWidth="1.5"
      />
      <path d="M18 13V14.5" stroke="#9E7B4F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
