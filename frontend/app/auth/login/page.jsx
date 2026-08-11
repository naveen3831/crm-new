const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\auth\\login\\page.tsx";"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validate = () => {
    const e = {};
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Save authenticated user into localStorage with DB role
      const userPayload = JSON.stringify({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role === "admin" ? "admin" : "customer",
      });
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", userPayload);
        }
      } catch (e2) {}

      // Automatic Role-based Routing based on DB account role
      if (data.user.role === "admin") {
        try {
          localStorage.removeItem("speshway_crm_active_tab");
          localStorage.removeItem("speshway_crm_active_project_id");
          localStorage.removeItem("speshway_crm_active_client_id");
          localStorage.removeItem("speshway_crm_active_client_project_id");
        } catch (e3) {}
        router.push("/admin/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-8 sm:py-12 hero-gradient"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
      , React.createElement('div', { className: "w-full max-w-sm sm:max-w-md bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}

        /* Brand Header */
        , React.createElement('div', { className: "flex flex-col items-center gap-3 mb-6 sm:mb-8 text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , React.createElement('div', { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-50 to-slate-100 border border-rose-100 flex items-center justify-center shadow-md p-2.5"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200"   , className: "w-full h-full" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
              , React.createElement('path', { d: "M 40,95 C 40,55 160,55 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}} )
              , React.createElement('rect', { x: "62", y: "70", width: "18", height: "50", rx: "3", fill: "#EE4047", __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}} )
              , React.createElement('rect', { x: "86", y: "50", width: "18", height: "70", rx: "3", fill: "#FF9F0A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}} )
              , React.createElement('rect', { x: "110", y: "30", width: "18", height: "90", rx: "3", fill: "#27C15A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}} )
              , React.createElement('ellipse', { cx: "100", cy: "100", rx: "48", ry: "29", stroke: "#071E34", strokeWidth: "10", transform: "rotate(-15, 100, 100)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} )
              , React.createElement('path', { d: "M 40,95 C 40,135 160,135 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}} )
              , React.createElement('path', { d: "M 75,122 L 35,167"   , stroke: "#071E34", strokeWidth: "15", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}} )
            )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
            , React.createElement('h2', { className: "font-heading font-extrabold text-xl sm:text-2xl text-[#071E34] tracking-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, "Welcome to CRM"

            )
            , React.createElement('p', { className: "text-xs sm:text-sm text-[#475569] font-medium font-sans mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}, "Enter your credentials to access your control panel."

            )
          )
        )

        , errorMessage && (
          React.createElement('div', { className: "mb-5 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 leading-relaxed flex items-center gap-2 shadow-sm"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
            , React.createElement(AlertCircle, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}, errorMessage)
          )
        )

        , React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4 sm:gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
          /* Email Field */
          , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , React.createElement('label', { htmlFor: "email", className: "text-xs font-bold text-[#FF5349] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}, "EMAIL ADDRESS *"

            )
            , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
              , React.createElement('input', {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "naveen@crm.com",
                value: formData.email,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                  errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349]"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
              )
              , React.createElement(Mail, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} )
            )
            , errors.email && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, errors.email)
          )

          /* Password Field */
          , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
            , React.createElement('label', { htmlFor: "password", className: "text-xs font-bold text-[#FF5349] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}, "PASSWORD *"

            )
            , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
              , React.createElement('input', {
                id: "password",
                name: "password",
                type: showPassword ? "text" : "password",
                placeholder: "••••••••",
                value: formData.password,
                onChange: handleChange,
                className: `w-full pl-10 pr-11 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                  errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349]"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
              )
              , React.createElement(Lock, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}} )
              , React.createElement('button', {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3.5 text-gray-400 hover:text-[#071E34] p-1 transition-colors"     ,
                'aria-label': "Toggle password visibility"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}

                , showPassword ? React.createElement(EyeOff, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}} ) : React.createElement(Eye, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}} )
              )
            )
            , errors.password && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}, errors.password)
          )

          /* Forgot Password Link */
          , React.createElement('div', { className: "flex justify-end text-xs font-sans pt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
            , React.createElement(Link, { href: "/auth/forgot-password", className: "text-[#FF5349] hover:text-[#071E34] transition-colors font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}, "Forgot Password?"

            )
          )

          /* Submit Button */
          , React.createElement(Button, {
            type: "submit",
            variant: "primary",
            disabled: isSubmitting,
            className: "w-full mt-1 py-3.5 sm:py-4 gap-2 text-sm font-bold shadow-md hover:shadow-lg transition-all"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}

            , isSubmitting ? (
              "Signing in..."
            ) : (
              React.createElement(React.Fragment, null
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, "Sign In" )
                , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}} )
              )
            )
          )
        )

        /* Footer Link */
        , React.createElement('div', { className: "text-center mt-6 text-xs sm:text-sm text-[#475569] font-medium font-sans border-t border-slate-200 pt-5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}, "Don't have an account?"
             , " "
          , React.createElement(Link, { href: "/auth/register", className: "text-[#FF5349] font-bold hover:text-[#071E34] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}, "Create Account"

          )
        )

      )
    )
  );
}
