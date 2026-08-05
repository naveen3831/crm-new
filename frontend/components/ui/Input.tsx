"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
}

export default function Input({
  label,
  error,
  isTextArea = false,
  rows = 4,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputClass = `w-full px-4 py-3 rounded-xl bg-white border text-[#06132D] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 ${
    error
      ? "border-red-400 focus:border-red-500"
      : "border-red-100 focus:border-[#FF5349]"
  } ${className}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-[#FF5349] font-sans tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      {isTextArea ? (
        <textarea
          id={id}
          rows={rows}
          className={inputClass}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={inputClass}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span className="text-xs font-bold text-red-600 mt-0.5">{error}</span>
      )}
    </div>
  );
}



