const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\ui\\Input.tsx";"use client";

import React from "react";








export default function Input({
  label,
  error,
  isTextArea = false,
  rows = 4,
  className = "",
  id,
  ...props
}) {
  const inputClass = `w-full px-4 py-3 rounded-xl bg-white border text-[#06132D] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 ${
    error
      ? "border-red-400 focus:border-red-500"
      : "border-red-100 focus:border-[#FF5349]"
  } ${className}`;

  return (
    React.createElement('div', { className: "w-full flex flex-col gap-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
      , label && (
        React.createElement('label', {
          htmlFor: id,
          className: "text-xs font-bold text-[#FF5349] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}

          , label
        )
      )
      , isTextArea ? (
        React.createElement('textarea', {
          id: id,
          rows: rows,
          className: inputClass,
          ...(props ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
        )
      ) : (
        React.createElement('input', {
          id: id,
          className: inputClass,
          ...(props ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
        )
      )
      , error && (
        React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}, error)
      )
    )
  );
}



