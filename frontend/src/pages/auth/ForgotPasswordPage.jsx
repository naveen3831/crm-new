const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\auth\\ForgotPasswordPage.tsx";import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";

export default function ForgotPasswordPage() {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();

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
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
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
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
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
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-screen flex flex-col justify-between hero-gradient bg-[#F7FBFA] selection:bg-[#FF5349] selection:text-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
      /* Header */
      , React.createElement('header', { className: "h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
        , React.createElement(Link, { to: "/", className: "flex items-center min-w-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
          , React.createElement(CrmBrandLogo, { size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}} )
        )

        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
          , React.createElement(Link, {
            to: "/auth/login",
            className: "px-4 py-2 rounded-xl bg-rose-50 text-[#071E34] border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-all duration-200 ease-out shadow-sm flex items-center gap-1.5"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}

            , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} ), " Back to Sign In"
          )
        )
      )

      /* Main Container */
      , React.createElement('main', { className: "animate-page-enter flex-1 flex items-center justify-center px-4 py-12"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
        , React.createElement('div', { className: "w-full max-w-md premium-surface animate-page-enter border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-200 ease-out"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}

          /* Brand Header */
          , React.createElement('div', { className: "flex flex-col items-center gap-3 mb-6 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , React.createElement('div', { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-slate-100 border border-rose-100 flex items-center justify-center shadow-md p-3"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
              , React.createElement(KeyRound, { size: 28, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
              , React.createElement('h2', { className: "font-heading font-extrabold text-2xl text-[#071E34] tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                , step === 1 ? "Forgot Password?" : "Reset Your Password"
              )
              , React.createElement('p', { className: "text-xs sm:text-sm text-slate-600 font-medium font-sans mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                , step === 1
                  ? "Enter your account email to verify and reset your credentials."
                  : `Set a new password for ${email}`
              )
            )
          )

          , errorMessage && (
            React.createElement('div', { className: "mb-5 p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 leading-relaxed flex items-center gap-2 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
              , React.createElement(AlertCircle, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, errorMessage)
            )
          )

          , successMessage && (
            React.createElement('div', { className: "mb-5 p-3.5 rounded-xl bg-green-50 border border-green-300 text-xs font-semibold text-green-700 leading-relaxed flex items-center gap-2 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
              , React.createElement(CheckCircle2, { size: 16, className: "shrink-0 text-green-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}, successMessage)
            )
          )

          , step === 1 ? (
            /* STEP 1: VERIFY EMAIL FORM */
            React.createElement('form', { onSubmit: handleVerifyEmail, className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
                , React.createElement('label', { htmlFor: "forgot-email", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, "REGISTERED EMAIL ADDRESS *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
                  , React.createElement('input', {
                    id: "forgot-email",
                    type: "email",
                    placeholder: "name@company.com",
                    value: email,
                    onChange: (e) => { setEmail(e.target.value); setErrorMessage(""); },
                    className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349] shadow-sm"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
                  )
                  , React.createElement(Mail, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}} )
                )
              )

              , React.createElement('button', {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full py-3.5 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}

                , isSubmitting ? "Verifying..." : React.createElement(React.Fragment, null, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}, "Verify Email" ), " " , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}} ))
              )

              , React.createElement('div', { className: "text-center pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                , React.createElement(Link, { to: "/auth/login", className: "inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5349] hover:text-[#071E34] transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                  , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}, "Back to Login"  )
                )
              )
            )
          ) : (
            /* STEP 2: RESET PASSWORD FORM */
            React.createElement('form', { onSubmit: handleResetPassword, className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
                , React.createElement('label', { htmlFor: "new-password", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, "NEW PASSWORD *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}
                  , React.createElement('input', {
                    id: "new-password",
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
                    value: newPassword,
                    onChange: (e) => { setNewPassword(e.target.value); setErrorMessage(""); },
                    className: "w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349] shadow-sm"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
                  )
                  , React.createElement(Lock, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}} )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3.5 text-slate-400 hover:text-[#071E34] p-1 transition-colors"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}

                    , showPassword ? React.createElement(EyeOff, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}} ) : React.createElement(Eye, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}} )
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
                , React.createElement('label', { htmlFor: "confirm-new-password", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}, "CONFIRM NEW PASSWORD *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}
                  , React.createElement('input', {
                    id: "confirm-new-password",
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
                    value: confirmPassword,
                    onChange: (e) => { setConfirmPassword(e.target.value); setErrorMessage(""); },
                    className: "w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349] shadow-sm"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}
                  )
                  , React.createElement(Lock, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}} )
                )
              )

              , React.createElement('button', {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full mt-2 py-3.5 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}

                , isSubmitting ? "Updating..." : "Update Password & Sign In"
              )

              , React.createElement('div', { className: "text-center pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => { setStep(1); setErrorMessage(""); },
                  className: "inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#071E34] transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 239}}

                  , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}, "Change Email" )
                )
              )
            )
          )

        )
      )

      /* Simple Footer */
      , React.createElement('footer', { className: "py-6 text-center text-xs text-slate-600 border-t border-slate-200 bg-white/40"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}}, "© "
         , new Date().getFullYear(), " SPESHWAY MERN CRM. All rights reserved."
      )
    )
  );
}


