const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\ui\\Accordion.tsx";"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";








export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
}) {
  return (
    React.createElement('div', { className: "border-b border-gray-200 overflow-hidden"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
      , React.createElement('button', {
        onClick: onToggle,
        className: "w-full flex items-center justify-between py-5 text-left font-heading font-medium text-navy-950 hover:text-rose-600 transition-colors"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}

        , React.createElement('span', { className: "text-base sm:text-lg" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}, title)
        , React.createElement(motion.div, {
          animate: { rotate: isOpen ? 180 : 0 },
          transition: { duration: 0.2 },
          className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}

          , React.createElement(ChevronDown, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} )
        )
      )
      , React.createElement(AnimatePresence, { initial: false, __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , isOpen && (
          React.createElement(motion.div, {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.2, ease: "easeInOut" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}

            , React.createElement('div', { className: "pb-6 pr-4 text-sm sm:text-base text-gray-600 leading-relaxed"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
              , children
            )
          )
        )
      )
    )
  );
}





export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    React.createElement('div', { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
      , items.map((item, idx) => (
        React.createElement(AccordionItem, {
          key: idx,
          title: item.title,
          isOpen: activeIndex === idx,
          onToggle: () => handleToggle(idx), __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}

          , item.content
        )
      ))
    )
  );
}

