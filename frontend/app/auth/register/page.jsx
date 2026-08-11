const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\auth\\register\\page.tsx";"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Building, Lock, CheckCircle2, ShieldAlert } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.toLowerCase().trim().endsWith("@crm.com")) {
      newErrors.email = "Email address must follow the @crm.com format (e.g. naveen@crm.com).";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2500);

    } catch (err) {
      setErrorMessage(err.message || "Something went wrong during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-8 sm:py-12 hero-gradient"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
      , React.createElement('div', { className: "w-full max-w-sm sm:max-w-xl bg-white border border-teal-200/90 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}

        /* Brand Header */
        , React.createElement('div', { className: "flex flex-col items-center gap-3 mb-6 sm:mb-8 text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
          , React.createElement('div', { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-slate-100 border border-teal-200/80 flex items-center justify-center shadow-md p-2.5 text-[#071E34]"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
            , React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200"   , className: "w-full h-full text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
              , React.createElement('path', { d: "M 40,95 C 40,55 160,55 160,95"     , stroke: "#0E9F8A", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}} )
              , React.createElement('rect', { x: "62", y: "70", width: "18", height: "50", rx: "3", fill: "#EE4047", __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} )
              , React.createElement('rect', { x: "70", y: "58", width: "5", height: "5", fill: "#EE4047", opacity: "0.9", __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}} )
              , React.createElement('rect', { x: "62", y: "63", width: "6", height: "6", fill: "#EE4047", opacity: "0.8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}} )
              , React.createElement('rect', { x: "76", y: "65", width: "5", height: "5", fill: "#EE4047", opacity: "0.7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} )
              , React.createElement('rect', { x: "86", y: "50", width: "18", height: "70", rx: "3", fill: "#FF9F0A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}} )
              , React.createElement('rect', { x: "86", y: "42", width: "6", height: "6", fill: "#FF9F0A", opacity: "0.9", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} )
              , React.createElement('rect', { x: "94", y: "34", width: "5", height: "5", fill: "#FF9F0A", opacity: "0.8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}} )
              , React.createElement('rect', { x: "100", y: "44", width: "6", height: "6", fill: "#FF9F0A", opacity: "0.7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}} )
              , React.createElement('rect', { x: "110", y: "30", width: "18", height: "90", rx: "3", fill: "#27C15A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}} )
              , React.createElement('rect', { x: "114", y: "18", width: "6", height: "6", fill: "#27C15A", opacity: "0.9", __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}} )
              , React.createElement('rect', { x: "110", y: "24", width: "5", height: "5", fill: "#27C15A", opacity: "0.8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}} )
              , React.createElement('rect', { x: "122", y: "22", width: "6", height: "6", fill: "#27C15A", opacity: "0.7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}} )
              , React.createElement('rect', { x: "118", y: "10", width: "5", height: "5", fill: "#27C15A", opacity: "0.9", __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} )
              , React.createElement('ellipse', { cx: "100", cy: "100", rx: "48", ry: "29", stroke: "currentColor", strokeWidth: "10", transform: "rotate(-15, 100, 100)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}} )
              , React.createElement('path', { d: "M 40,95 C 40,135 160,135 160,95"     , stroke: "#0E9F8A", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} )
              , React.createElement('path', { d: "M 75,122 L 35,167"   , stroke: "currentColor", strokeWidth: "15", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}} )
              , React.createElement('path', { d: "M 73,124 L 37,165"   , stroke: "currentColor", strokeWidth: "6", strokeOpacity: "0.3", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}} )
            )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
            , React.createElement('h2', { className: "font-heading font-extrabold text-xl sm:text-2xl text-[#071E34] tracking-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Create Customer Account"

            )
            , React.createElement('p', { className: "text-xs sm:text-sm text-[#475569] font-medium font-sans mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, "Fill in the details below to initialize your customer portal credentials."

            )
          )
        )

        , isSuccess && (
          React.createElement('div', { className: "mb-6 p-4 rounded-xl bg-green-50 border border-green-400 text-xs font-semibold text-green-700 flex items-center gap-2 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
            , React.createElement(CheckCircle2, { size: 16, className: "shrink-0 text-green-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}} ), " Account created successfully! Redirecting to login..."
          )
        )

        , errorMessage && (
          React.createElement('div', { className: "mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 flex items-center gap-2 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
            , React.createElement(ShieldAlert, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}} ), " " , errorMessage
          )
        )

        , React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4 sm:gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
            /* Full Name */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
              , React.createElement('label', { htmlFor: "name", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}, "FULL NAME *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
                , React.createElement('input', {
                  id: "name",
                  name: "name",
                  placeholder: "John Doe" ,
                  value: formData.name,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.name ? "border-red-400 focus:border-red-500" : "border-teal-200 focus:border-teal-500"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                )
                , React.createElement(User, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}} )
              )
              , errors.name && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}, errors.name)
            )

            /* Email Address */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
              , React.createElement('label', { htmlFor: "email", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}, "EMAIL ADDRESS *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
                , React.createElement('input', {
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "naveen@crm.com",
                  value: formData.email,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.email ? "border-red-400 focus:border-red-500" : "border-teal-200 focus:border-teal-500"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
                )
                , React.createElement(Mail, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}} )
              )
              , errors.email && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}, errors.email)
            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
            /* Phone Number */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
              , React.createElement('label', { htmlFor: "phone", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}, "PHONE NUMBER"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}
                , React.createElement('input', {
                  id: "phone",
                  name: "phone",
                  placeholder: "+1 (555) 000-0000"  ,
                  value: formData.phone,
                  onChange: handleChange,
                  className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}
                )
                , React.createElement(Phone, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}} )
              )
            )

            /* Company Name */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
              , React.createElement('label', { htmlFor: "company", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}, "COMPANY NAME"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
                , React.createElement('input', {
                  id: "company",
                  name: "company",
                  placeholder: "Acme Inc" ,
                  value: formData.company,
                  onChange: handleChange,
                  className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}
                )
                , React.createElement(Building, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}} )
              )
            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}
            /* Password */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
              , React.createElement('label', { htmlFor: "password", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, "PASSWORD *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}
                , React.createElement('input', {
                  id: "password",
                  name: "password",
                  type: "password",
                  placeholder: "••••••",
                  value: formData.password,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-teal-200 focus:border-teal-500"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
                )
                , React.createElement(Lock, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}} )
              )
              , errors.password && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}, errors.password)
            )

            /* Confirm Password */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}
              , React.createElement('label', { htmlFor: "confirmPassword", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, "CONFIRM PASSWORD *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}
                , React.createElement('input', {
                  id: "confirmPassword",
                  name: "confirmPassword",
                  type: "password",
                  placeholder: "••••••",
                  value: formData.confirmPassword,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-teal-200 focus:border-teal-500"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}
                )
                , React.createElement(Lock, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}} )
              )
              , errors.confirmPassword && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}}, errors.confirmPassword)
            )
          )

          /* Privacy Terms Notice */
          , React.createElement('div', { className: "text-[11px] sm:text-xs text-gray-600 leading-relaxed font-sans pt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 290}}, "By creating an account, you agree to our"
                   , " "
            , React.createElement(Link, { href: "/terms", className: "text-teal-600 font-semibold hover:underline"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}, "Terms & Conditions"

            ), " ", "and"
            , " "
            , React.createElement(Link, { href: "/privacy", className: "text-teal-600 font-semibold hover:underline"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}, "Privacy Policy"

            ), "."
          )

          , React.createElement(Button, {
            type: "submit",
            variant: "primary",
            disabled: isSubmitting,
            className: "w-full mt-1 py-3.5 sm:py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}

            , isSubmitting ? "Creating account..." : "Register Account"
          )
        )

        /* Login switcher */
        , React.createElement('div', { className: "text-center mt-6 text-xs sm:text-sm text-[#475569] font-medium font-sans border-t border-teal-100 pt-5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}, "Already have a customer account?"
              , " "
          , React.createElement(Link, { href: "/auth/login", className: "text-teal-600 font-bold hover:text-[#071E34] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}}, "Sign In"

          )
        )
      )
    )
  );
}

