const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\contact\\page.tsx";"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert, CheckCircle2 } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", company:"", subject:"", message:"", consent:false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [backendError, setBackendError] = useState("");

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.subject.trim()) e.subject = "Subject is required.";
    if (!formData.message.trim()) e.message = "Message content is required.";
    if (!formData.consent) e.consent = "You must agree to the data policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value, type } = ev.target;
    const val = type === "checkbox" ? (ev.target ).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors(prev => { const n={...prev}; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true); setSubmitStatus("idle"); setBackendError("");
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${url}/enquiries`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit.");
      setSubmitStatus("success");
      setFormData({ name:"", email:"", phone:"", company:"", subject:"", message:"", consent:false });
    } catch (err) {
      setSubmitStatus("error");
      setBackendError(err.message || "Something went wrong.");
    } finally { setIsSubmitting(false); }
  };

  return (
    React.createElement('div', { className: "min-h-screen py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 sm:gap-16"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
      , React.createElement('section', { className: "text-center max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
        , React.createElement('h1', { className: "display-lg text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, "Get in Touch"  )
        , React.createElement('p', { className: "text-base sm:text-lg text-[#475569] font-sans leading-relaxed font-medium"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "Have questions about security roles, quotation conversions, or setting up Stripe? Send us a message and our support team will reply within 24 hours."

        )
      )

      , React.createElement('section', { className: "grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 items-start"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
        /* Contact Info */
        , React.createElement('div', { className: "lg:col-span-2 flex flex-col gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
          , React.createElement('div', { className: "rounded-2xl p-5 sm:p-7 flex flex-col gap-5 sm:gap-6 bg-white border border-teal-200 shadow-md"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
            , React.createElement('h3', { className: "font-heading font-bold text-xl text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Contact Information" )

            , React.createElement('div', { className: "flex items-start gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
                , React.createElement(MapPin, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
                , React.createElement('div', { className: "text-xs font-extrabold text-teal-700 uppercase tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}, "Headquarters")
                , React.createElement('div', { className: "text-sm sm:text-base text-[#071E34] font-semibold font-sans mt-0.5 leading-snug"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}, "104 Enterprise Boulevard, Suite 500, Tech District, NY 10001"        )
              )
            )

            , React.createElement('div', { className: "flex items-start gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
                , React.createElement(Phone, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
                , React.createElement('div', { className: "text-xs font-extrabold text-teal-700 uppercase tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}, "Phone")
                , React.createElement('div', { className: "text-sm sm:text-base text-[#071E34] font-semibold font-sans mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}, "+1 (800) 555-CRM-NOW"  )
              )
            )

            , React.createElement('div', { className: "flex items-start gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
                , React.createElement(Mail, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
                , React.createElement('div', { className: "text-xs font-extrabold text-teal-700 uppercase tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "Email Support" )
                , React.createElement('div', { className: "text-sm sm:text-base text-[#071E34] font-semibold font-sans mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, "support@crm.local")
              )
            )

            , React.createElement('div', { className: "flex items-start gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
                , React.createElement(Clock, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
                , React.createElement('div', { className: "text-xs font-extrabold text-teal-700 uppercase tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}, "Working Hours" )
                , React.createElement('div', { className: "text-sm sm:text-base text-[#071E34] font-semibold font-sans mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, "Monday – Friday: 9:00 AM – 6:00 PM EST"        )
              )
            )
          )
        )

        /* Form */
        , React.createElement('div', { className: "lg:col-span-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
          , React.createElement('div', { className: "rounded-2xl p-5 sm:p-8 bg-white border border-teal-200 shadow-md"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
            , React.createElement('h3', { className: "font-heading font-bold text-xl sm:text-2xl text-[#071E34] mb-5 sm:mb-6"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Send an Enquiry"  )

            , submitStatus === "success" && (
              React.createElement(motion.div, { initial: {opacity:0,scale:0.95}, animate: {opacity:1,scale:1},
                className: "mb-5 p-4 rounded-xl bg-green-50 border border-green-400 text-green-800 flex items-start gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
                , React.createElement(CheckCircle2, { className: "shrink-0 mt-0.5" , size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}} )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
                  , React.createElement('h4', { className: "font-bold text-sm sm:text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}, "Enquiry Submitted Successfully!"  )
                  , React.createElement('p', { className: "text-sm mt-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "Thank you. An admin has been notified."      )
                )
              )
            )

            , submitStatus === "error" && (
              React.createElement(motion.div, { initial: {opacity:0,scale:0.95}, animate: {opacity:1,scale:1},
                className: "mb-5 p-4 rounded-xl bg-red-50 border border-red-400 text-red-800 flex items-start gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                , React.createElement(ShieldAlert, { className: "shrink-0 mt-0.5" , size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}} )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                  , React.createElement('h4', { className: "font-bold text-sm sm:text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}, "Submission Failed" )
                  , React.createElement('p', { className: "text-sm mt-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, backendError)
                )
              )
            )

            , React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
              , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
                , React.createElement(Input, { id: "name", name: "name", label: "FULL NAME *"  , placeholder: "John Doe" , value: formData.name, onChange: handleChange, error: errors.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}} )
                , React.createElement(Input, { id: "email", name: "email", type: "email", label: "EMAIL ADDRESS *"  , placeholder: "john@company.com", value: formData.email, onChange: handleChange, error: errors.email, __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}} )
              )
              , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
                , React.createElement(Input, { id: "phone", name: "phone", label: "PHONE NUMBER" , placeholder: "+1 (555) 000-0000"  , value: formData.phone, onChange: handleChange, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} )
                , React.createElement(Input, { id: "company", name: "company", label: "COMPANY NAME" , placeholder: "Acme Corporation" , value: formData.company, onChange: handleChange, __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
              )
              , React.createElement(Input, { id: "subject", name: "subject", label: "SUBJECT *" , placeholder: "How can we help you?"    , value: formData.subject, onChange: handleChange, error: errors.subject, __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}} )
              , React.createElement(Input, { id: "message", name: "message", isTextArea: true, label: "MESSAGE *" , placeholder: "Provide detailed information regarding your request..."     , value: formData.message, onChange: handleChange, error: errors.message, __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}} )

              , React.createElement('div', { className: "flex flex-col gap-1.5 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
                , React.createElement('label', { className: "flex items-start gap-3 cursor-pointer select-none"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
                  , React.createElement('input', { type: "checkbox", name: "consent", checked: formData.consent, onChange: handleChange,
                    className: "mt-0.5 w-5 h-5 rounded border-2 border-teal-300 bg-white checked:bg-blue-600 checked:border-transparent text-teal-600 focus:ring-2 focus:ring-blue-300 cursor-pointer shrink-0"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}} )
                  , React.createElement('span', { className: "text-sm text-[#071E34] font-medium leading-relaxed font-sans"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}, "I consent to having the CRM platform collect and store my information in order to answer my inquiry."

                  )
                )
                , errors.consent && React.createElement('span', { className: "text-sm font-bold text-red-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}, errors.consent)
              )

              , React.createElement(Button, { type: "submit", variant: "primary", disabled: isSubmitting, className: "mt-3 gap-2 py-4 text-base font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
                , isSubmitting ? "Submitting..." : React.createElement(React.Fragment, null, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}, "Submit Enquiry" ), " " , React.createElement(Send, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}} ))
              )
            )
          )
        )
      )
    )
  );
}

