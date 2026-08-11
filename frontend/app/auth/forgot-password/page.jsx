const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\auth\\forgot-password\\page.tsx";"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Step 1: Verify Email
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${backendUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify email.");
      }

      setStep(2);
    } catch (err) {
      setErrorMessage(err.message || "Email verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setErrorMessage("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${backendUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccessMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-8 sm:py-12 hero-gradient"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
      , React.createElement('div', { className: "w-full max-w-sm sm:max-w-md bg-white border border-teal-200/90 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}

        /* Brand Header */
        , React.createElement('div', { className: "flex flex-col items-center gap-3 mb-6 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
          , React.createElement('div', { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-slate-100 border border-teal-200/80 flex items-center justify-center shadow-md p-2.5"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
            , React.createElement(KeyRound, { size: 28, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
            , React.createElement('h2', { className: "font-heading font-extrabold text-xl sm:text-2xl text-[#071E34] tracking-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
              , step === 1 ? "Forgot Password?" : "Reset Your Password"
            )
            , React.createElement('p', { className: "text-xs sm:text-sm text-[#475569] font-medium font-sans mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
              , step === 1
                ? "Enter your account email to verify and reset your credentials."
                : `Set a new password for ${email}`
            )
          )
        )

        , errorMessage && (
          React.createElement('div', { className: "mb-5 p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 leading-relaxed flex items-center gap-2 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
            , React.createElement(AlertCircle, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}, errorMessage)
          )
        )

        , successMessage && (
          React.createElement('div', { className: "mb-5 p-3.5 rounded-xl bg-green-50 border border-green-300 text-xs font-semibold text-green-700 leading-relaxed flex items-center gap-2 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
            , React.createElement(CheckCircle2, { size: 16, className: "shrink-0 text-green-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, successMessage)
          )
        )

        , step === 1 ? (
          /* STEP 1: VERIFY EMAIL FORM */
          React.createElement('form', { onSubmit: handleVerifyEmail, className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
              , React.createElement('label', { htmlFor: "forgot-email", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, "REGISTERED EMAIL ADDRESS *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
                , React.createElement('input', {
                  id: "forgot-email",
                  type: "email",
                  placeholder: "name@company.com",
                  value: email,
                  onChange: (e) => { setEmail(e.target.value); setErrorMessage(""); },
                  className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                )
                , React.createElement(Mail, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}} )
              )
            )

            , React.createElement(Button, {
              type: "submit",
              variant: "primary",
              disabled: isSubmitting,
              className: "w-full py-3.5 sm:py-4 gap-2 text-sm font-bold shadow-md hover:shadow-lg transition-all"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}

              , isSubmitting ? "Verifying..." : React.createElement(React.Fragment, null, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}, "Verify Email" ), " " , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}} ))
            )

            , React.createElement('div', { className: "text-center pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
              , React.createElement(Link, { href: "/auth/login", className: "inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-[#071E34] transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
                , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}, "Back to Login"  )
              )
            )
          )
        ) : (
          /* STEP 2: RESET PASSWORD FORM */
          React.createElement('form', { onSubmit: handleResetPassword, className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
              , React.createElement('label', { htmlFor: "new-password", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}, "NEW PASSWORD *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                , React.createElement('input', {
                  id: "new-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: newPassword,
                  onChange: (e) => { setNewPassword(e.target.value); setErrorMessage(""); },
                  className: "w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                )
                , React.createElement(Lock, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}} )
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3.5 text-gray-400 hover:text-[#071E34] p-1 transition-colors"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}

                  , showPassword ? React.createElement(EyeOff, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}} ) : React.createElement(Eye, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}} )
                )
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
              , React.createElement('label', { htmlFor: "confirm-new-password", className: "text-xs font-bold text-teal-700 font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}, "CONFIRM NEW PASSWORD *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
                , React.createElement('input', {
                  id: "confirm-new-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: confirmPassword,
                  onChange: (e) => { setConfirmPassword(e.target.value); setErrorMessage(""); },
                  className: "w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
                )
                , React.createElement(Lock, { size: 18, className: "absolute left-3 text-teal-400 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}} )
              )
            )

            , React.createElement(Button, {
              type: "submit",
              variant: "primary",
              disabled: isSubmitting,
              className: "w-full mt-2 py-3.5 sm:py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}

              , isSubmitting ? "Updating..." : "Update Password & Sign In"
            )

            , React.createElement('div', { className: "text-center pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
              , React.createElement('button', {
                type: "button",
                onClick: () => { setStep(1); setErrorMessage(""); },
                className: "inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#071E34] transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}

                , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}, "Change Email" )
              )
            )
          )
        )

      )
    )
  );
}

