const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\blogs\\page.tsx";"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";













export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Sales", "Customer Success", "Security", "Billing"];

  const blogPosts = [
    {
      id: "accelerate-sales-pipeline",
      title: "How to Accelerate Your Sales Pipeline in 2026",
      excerpt: "Learn how to qualify incoming leads, automate quotation follow-ups, and convert more prospects into active accounts.",
      category: "Sales",
      author: "Alex Sterling",
      date: "Jul 18, 2026",
      readTime: "5 min read",
      gradient: "from-blue-700 to-indigo-800"
    },
    {
      id: "role-based-access-control",
      title: "Best Practices for Role-Based Access Control (RBAC)",
      excerpt: "Ensure strict data isolation and auditing by configuring precise permissions for admin operators and customer profiles.",
      category: "Security",
      author: "Marcus Vance",
      date: "Jul 14, 2026",
      readTime: "7 min read",
      gradient: "from-purple-800 to-navy-900"
    },
    {
      id: "reducing-billing-friction",
      title: "Reducing Invoicing Friction via Online UPI & Cards",
      excerpt: "Discover how integrating Razorpay and Stripe directly into your client invoicing dashboard improves payment timelines.",
      category: "Billing",
      author: "Elena Rostova",
      date: "Jul 10, 2026",
      readTime: "4 min read",
      gradient: "from-emerald-700 to-blue-800"
    },
    {
      id: "building-customer-retention",
      title: "Building Customer Retention through Support Tickets",
      excerpt: "How organizing support responses, tracking resolution times, and adding SMTP verification impacts CSAT.",
      category: "Customer Success",
      author: "Sarah Jenkins",
      date: "Jun 28, 2026",
      readTime: "6 min read",
      gradient: "from-pink-700 to-purple-900"
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    React.createElement('div', { className: "min-h-screen py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
      /* Header */
      , React.createElement('section', { className: "text-center max-w-2xl mx-auto flex flex-col gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
        , React.createElement('h1', { className: "display-lg text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}, "CRM Insights & Resources"   )
        , React.createElement('p', { className: "text-base text-gray-700 font-medium font-sans leading-relaxed"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}, "Stay informed with industry reviews, design guidelines, tech-stack optimization tips, and feature launches."

        )

        /* Search Bar */
        , React.createElement('div', { className: "relative mt-4 max-w-md mx-auto w-full"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
          , React.createElement('input', {
            type: "text",
            placeholder: "Search posts..." ,
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] font-medium text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500 shadow-sm"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          )
          , React.createElement(Search, { size: 18, className: "absolute left-4 top-3.5 text-teal-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} )
        )
      )

      /* Categories filter bar */
      , React.createElement('section', { className: "flex flex-wrap items-center justify-center gap-3 border-y border-gray-200 py-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
        , categories.map((cat) => (
          React.createElement('button', {
            key: cat,
            onClick: () => setSelectedCategory(cat),
            className: `px-4 py-2 rounded-xl text-xs font-bold tracking-wide font-heading transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-teal-200 text-gray-600 hover:text-[#071E34] hover:border-teal-500 shadow-sm"
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}

            , cat
          )
        ))
      )

      /* Featured Blog */
      , searchQuery === "" && selectedCategory === "All" && (
        React.createElement('section', { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
          , React.createElement(Link, { href: `/blogs/${featuredPost.id}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , React.createElement(GlassCard, { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8 hover:border-teal-500/20 transition-all cursor-pointer group bg-white border border-teal-100 shadow-md"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
              , React.createElement('div', { className: `w-full h-48 sm:h-64 lg:h-full min-h-[180px] rounded-xl bg-gradient-to-tr ${featuredPost.gradient} flex items-center justify-center relative overflow-hidden`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
                , React.createElement(BookOpen, { size: 48, className: "text-white/20", __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}} )
                , React.createElement('div', { className: "absolute inset-0 bg-black/10"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}})
              )
              , React.createElement('div', { className: "flex flex-col justify-between py-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
                , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
                  , React.createElement('div', { className: "inline-flex max-w-fit px-2.5 py-1 rounded-md bg-teal-100 text-teal-700 text-xs font-bold font-heading uppercase tracking-wide"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                    , featuredPost.category
                  )
                  , React.createElement('h2', { className: "font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-[#071E34] group-hover:text-teal-700 transition-colors leading-tight"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
                    , featuredPost.title
                  )
                  , React.createElement('p', { className: "text-sm sm:text-base text-gray-700 leading-relaxed font-sans font-medium"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
                    , featuredPost.excerpt
                  )
                )
                , React.createElement('div', { className: "flex flex-wrap items-center justify-between border-t border-gray-100 pt-4 mt-5 gap-2 text-xs text-gray-600"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                  , React.createElement('div', { className: "flex flex-wrap items-center gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, "By " , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, featuredPost.author))
                    , React.createElement('span', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, React.createElement(Calendar, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} ), " " , featuredPost.date)
                    , React.createElement('span', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}, React.createElement(Clock, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} ), " " , featuredPost.readTime)
                  )
                  , React.createElement('span', { className: "text-teal-700 font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}, "Read Article "
                      , React.createElement(ArrowRight, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}} )
                  )
                )
              )
            )
          )
        )
      )

      /* Posts Grid */
      , React.createElement('section', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
        , filteredPosts.length > 0 ? (
          filteredPosts
            .filter((p) => searchQuery !== "" || selectedCategory !== "All" || p.id !== featuredPost.id)
            .map((post) => (
              React.createElement(Link, { key: post.id, href: `/blogs/${post.id}`, className: "flex", __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
                , React.createElement(GlassCard, { className: "flex flex-col justify-between h-full p-5 hover:border-teal-500/20 transition-all cursor-pointer group w-full bg-white border border-teal-100 shadow-md"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
                  , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                    , React.createElement('div', { className: `w-full h-40 sm:h-44 rounded-lg bg-gradient-to-tr ${post.gradient} flex items-center justify-center relative overflow-hidden`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}
                      , React.createElement(BookOpen, { size: 32, className: "text-white/25", __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}} )
                    )
                    , React.createElement('div', { className: "flex flex-col gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-teal-700 font-heading uppercase tracking-widest"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                        , post.category
                      )
                      , React.createElement('h3', { className: "font-heading font-bold text-lg text-[#071E34] group-hover:text-teal-700 transition-colors leading-snug"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
                        , post.title
                      )
                      , React.createElement('p', { className: "text-sm text-gray-700 leading-relaxed font-sans"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
                        , post.excerpt
                      )
                    )
                  )
                  , React.createElement('div', { className: "flex items-center justify-between border-t border-gray-100 pt-4 mt-5 text-xs text-gray-600"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                    , React.createElement('span', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}, post.author)
                    , React.createElement('span', { className: "flex items-center gap-1 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, React.createElement(Clock, { size: 11, __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}} ), " " , post.readTime)
                  )
                )
              )
            ))
        ) : (
          React.createElement('div', { className: "col-span-full text-center py-16 text-gray-600 font-medium"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
            , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}, "No blog posts found matching those criteria."      )
          )
        )
      )
    )
  );
}


