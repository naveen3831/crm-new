const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\auth\\LoginPage.tsx";import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";

export default function LoginPage() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

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
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
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
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-screen flex flex-col justify-between hero-gradient bg-[#F7FBFA] selection:bg-[#FF5349] selection:text-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
      /* Header */
      , React.createElement('header', { className: "h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
        , React.createElement(Link, { to: "/", className: "flex items-center min-w-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
          , React.createElement(CrmBrandLogo, { size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}} )
        )

        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , React.createElement('span', { className: "text-xs text-slate-600 font-medium hidden sm:inline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, "New here?" )
          , React.createElement(Link, {
            to: "/auth/register",
            className: "px-4 py-1.5 rounded-xl bg-rose-50 text-[#071E34] border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-all duration-200 ease-out shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
, "Create Account"

          )
        )
      )

      /* Main Container */
      , React.createElement('main', { className: "animate-page-enter flex-1 flex items-center justify-center px-4 py-6"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
        , React.createElement('div', { className: "w-full max-w-sm premium-surface animate-page-enter border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-6 transition-all duration-200 ease-out"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}

          /* Brand Header */
          , React.createElement('div', { className: "flex flex-col items-center gap-2.5 mb-5 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
            , React.createElement('div', { className: "flex justify-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
              , React.createElement(CrmBrandLogo, { size: "md", showText: false, __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
              , React.createElement('h2', { className: "font-heading font-extrabold text-xl text-[#071E34] tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}, "Welcome Back"

              )
              , React.createElement('p', { className: "text-xs text-slate-600 font-medium font-sans mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "Enter your account credentials to log in."

              )
            )
          )

          , errorMessage && (
            React.createElement('div', { className: "mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 leading-relaxed flex items-center gap-2 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
              , React.createElement(AlertCircle, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, errorMessage)
            )
          )

          , React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-3.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
            /* Email Field */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
              , React.createElement('label', { htmlFor: "email", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}, "EMAIL ADDRESS *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
                , React.createElement('input', {
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "naveen@crm.com",
                  value: formData.email,
                  onChange: handleChange,
                  className: `w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                    errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
                )
                , React.createElement(Mail, { size: 16, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}} )
              )
              , errors.email && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}, errors.email)
            )

            /* Password Field */
            , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}
              , React.createElement('label', { htmlFor: "password", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}, "PASSWORD *"

              )
              , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
                , React.createElement('input', {
                  id: "password",
                  name: "password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: formData.password,
                  onChange: handleChange,
                  className: `w-full pl-9 pr-11 py-2.5 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
                )
                , React.createElement(Lock, { size: 16, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}} )
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3.5 text-slate-400 hover:text-[#071E34] p-1 transition-colors"     ,
                  'aria-label': "Toggle password visibility"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}

                  , showPassword ? React.createElement(EyeOff, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}} ) : React.createElement(Eye, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}} )
                )
              )
              , errors.password && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}, errors.password)
            )

            /* Forgot Password Link */
            , React.createElement('div', { className: "flex justify-end text-xs font-sans pt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}
              , React.createElement(Link, { to: "/auth/forgot-password", className: "text-[#FF5349] hover:text-[#071E34] transition-colors font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}, "Forgot Password?"

              )
            )

            /* Submit Button */
            , React.createElement('button', {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full mt-1 py-3 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}

              , isSubmitting ? (
                "Signing in..."
              ) : (
                React.createElement(React.Fragment, null
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}, "Sign In" )
                  , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}} )
                )
              )
            )
          )

          /* Footer Link */
          , React.createElement('div', { className: "text-center mt-5 text-xs text-slate-600 font-medium font-sans border-t border-slate-200 pt-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}, "Don't have an account?"
               , " "
            , React.createElement(Link, { to: "/auth/register", className: "text-[#FF5349] font-bold hover:text-[#071E34] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}, "Create Account"

            )
          )

        )
      )

      /* Simple Footer */
      , React.createElement('footer', { className: "py-3 text-center text-xs text-slate-600 border-t border-slate-200 bg-white/40"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}, "© "
         , new Date().getFullYear(), " SPESHWAY MERN CRM. All rights reserved."
      )
    )
  );
}


