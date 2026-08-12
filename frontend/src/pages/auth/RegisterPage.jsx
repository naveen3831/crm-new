const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\auth\\RegisterPage.tsx";import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Building, Lock, CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

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
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
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
        navigate("/auth/login");
      }, 2500);

    } catch (err) {
      setErrorMessage(err.message || "Something went wrong during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    React.createElement('div', { className: "min-h-screen flex flex-col justify-between hero-gradient bg-[#F7FBFA] selection:bg-[#FF5349] selection:text-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
      /* Header */
      , React.createElement('header', { className: "h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
        , React.createElement(Link, { to: "/", className: "flex items-center min-w-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
          , React.createElement(CrmBrandLogo, { size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} )
        )

        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
          , React.createElement('span', { className: "text-xs text-slate-600 font-medium hidden sm:inline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}, "Already registered?" )
          , React.createElement(Link, {
            to: "/auth/login",
            className: "px-4 py-2 rounded-xl bg-rose-50 text-[#071E34] border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-all duration-200 ease-out shadow-sm"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
, "Sign In"

          )
        )
      )

      /* Main Container */
      , React.createElement('main', { className: "animate-page-enter flex-1 flex items-center justify-center px-4 py-12"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
        , React.createElement('div', { className: "w-full max-w-xl premium-surface animate-page-enter border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-200 ease-out"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}

          /* Brand Header */
          , React.createElement('div', { className: "flex flex-col items-center gap-3 mb-6 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
            , React.createElement('div', { className: "flex justify-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
              , React.createElement(CrmBrandLogo, { size: "lg", showText: false, __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
              , React.createElement('h2', { className: "font-heading font-extrabold text-2xl text-[#071E34] tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, "Create Customer Account"

              )
              , React.createElement('p', { className: "text-xs sm:text-sm text-slate-600 font-medium font-sans mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Fill in the details below to initialize your customer portal credentials."

              )
            )
          )

          , isSuccess && (
            React.createElement('div', { className: "mb-6 p-4 rounded-xl bg-green-50 border border-green-400 text-xs font-semibold text-green-700 flex items-center gap-2 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
              , React.createElement(CheckCircle2, { size: 16, className: "shrink-0 text-green-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}} ), " Account created successfully! Redirecting to login..."
            )
          )

          , errorMessage && (
            React.createElement('div', { className: "mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 flex items-center gap-2 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}
              , React.createElement(ShieldAlert, { size: 16, className: "shrink-0 text-red-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}} ), " " , errorMessage
            )
          )

          , React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4 sm:gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
            , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
              /* Full Name */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
                , React.createElement('label', { htmlFor: "name", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}, "FULL NAME *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                  , React.createElement('input', {
                    id: "name",
                    name: "name",
                    placeholder: "John Doe" ,
                    value: formData.name,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}
                  )
                  , React.createElement(User, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}} )
                )
                , errors.name && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}, errors.name)
              )

              /* Email Address */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                , React.createElement('label', { htmlFor: "email", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, "EMAIL ADDRESS *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                  , React.createElement('input', {
                    id: "email",
                    name: "email",
                    type: "email",
                    placeholder: "naveen@crm.com",
                    value: formData.email,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
                  )
                  , React.createElement(Mail, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}} )
                )
                , errors.email && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}, errors.email)
              )
            )

            , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
              /* Phone Number */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
                , React.createElement('label', { htmlFor: "phone", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}, "PHONE NUMBER"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
                  , React.createElement('input', {
                    id: "phone",
                    name: "phone",
                    placeholder: "+1 (555) 000-0000"  ,
                    value: formData.phone,
                    onChange: handleChange,
                    className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349]"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}
                  )
                  , React.createElement(Phone, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}} )
                )
              )

              /* Company Name */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
                , React.createElement('label', { htmlFor: "company", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}, "COMPANY NAME"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
                  , React.createElement('input', {
                    id: "company",
                    name: "company",
                    placeholder: "Acme Inc" ,
                    value: formData.company,
                    onChange: handleChange,
                    className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349]"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
                  )
                  , React.createElement(Building, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 235}} )
                )
              )
            )

            , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
              /* Password */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
                , React.createElement('label', { htmlFor: "password", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, "PASSWORD *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
                  , React.createElement('input', {
                    id: "password",
                    name: "password",
                    type: "password",
                    placeholder: "••••••",
                    value: formData.password,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}
                  )
                  , React.createElement(Lock, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}} )
                )
                , errors.password && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}, errors.password)
              )

              /* Confirm Password */
              , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
                , React.createElement('label', { htmlFor: "confirmPassword", className: "text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}, "CONFIRM PASSWORD *"

                )
                , React.createElement('div', { className: "relative flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}
                  , React.createElement('input', {
                    id: "confirmPassword",
                    name: "confirmPassword",
                    type: "password",
                    placeholder: "••••••",
                    value: formData.confirmPassword,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 269}}
                  )
                  , React.createElement(Lock, { size: 18, className: "absolute left-3 text-[#FF5349] pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 280}} )
                )
                , errors.confirmPassword && React.createElement('span', { className: "text-xs font-bold text-red-600 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, errors.confirmPassword)
              )
            )

            , React.createElement('button', {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full mt-2 py-3.5 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}}

              , isSubmitting ? "Creating account..." : (
                React.createElement(React.Fragment, null
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, "Register Account" )
                  , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 294}} )
                )
              )
            )
          )

          /* Login switcher */
          , React.createElement('div', { className: "text-center mt-6 text-xs sm:text-sm text-slate-600 font-medium font-sans border-t border-slate-200 pt-5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, "Already have a customer account?"
                , " "
            , React.createElement(Link, { to: "/auth/login", className: "text-[#FF5349] font-bold hover:text-[#071E34] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}}, "Sign In"

            )
          )
        )
      )

      /* Simple Footer */
      , React.createElement('footer', { className: "py-6 text-center text-xs text-slate-600 border-t border-slate-200 bg-white/40"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 311}}, "© "
         , new Date().getFullYear(), " SPESHWAY MERN CRM. All rights reserved."
      )
    )
  );
}


