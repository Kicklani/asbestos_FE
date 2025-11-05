import React from "react";
import { CardProps } from "@/types";

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = "",
  hoverable = false,
  onClick,
}) => {
  const baseStyles =
    "bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300";
  const hoverStyles = hoverable
    ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-8 pt-8 pb-6 border-b-2 border-gray-100">
          {title && (
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={title || subtitle ? "p-8" : "p-0"}>{children}</div>
    </div>
  );
};
