import React from 'react';
import { CardProps } from '@/types';

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  hoverable = false,
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden';
  const hoverStyles = hoverable ? 'hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
