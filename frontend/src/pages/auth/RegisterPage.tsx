import * as React from "react";
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

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between hero-gradient bg-[#F7FBFA] selection:bg-[#FF5349] selection:text-white">
      {/* Header */}
      <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center min-w-0">
          <CrmBrandLogo size="sm" />
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-medium hidden sm:inline">Already registered?</span>
          <Link
            to="/auth/login"
            className="px-4 py-2 rounded-xl bg-rose-50 text-[#071E34] border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-all duration-200 ease-out shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="animate-page-enter flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl premium-surface animate-page-enter border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-200 ease-out">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center gap-3 mb-6 text-center">
            <div className="flex justify-center">
              <CrmBrandLogo size="lg" showText={false} />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-[#071E34] tracking-tight">
                Create Customer Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium font-sans mt-1">
                Fill in the details below to initialize your customer portal credentials.
              </p>
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-400 text-xs font-semibold text-green-700 flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={16} className="shrink-0 text-green-600" /> Account created successfully! Redirecting to login...
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 flex items-center gap-2 shadow-sm">
              <ShieldAlert size={16} className="shrink-0 text-red-600" /> {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  FULL NAME *
                </label>
                <div className="relative flex items-center">
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`}
                  />
                  <User size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
                {errors.name && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  EMAIL ADDRESS *
                </label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="naveen@crm.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`}
                  />
                  <Mail size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
                {errors.email && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  PHONE NUMBER
                </label>
                <div className="relative flex items-center">
                  <input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349]"
                  />
                  <Phone size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  COMPANY NAME
                </label>
                <div className="relative flex items-center">
                  <input
                    id="company"
                    name="company"
                    placeholder="Acme Inc"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF5349]"
                  />
                  <Building size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  PASSWORD *
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`}
                  />
                  <Lock size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
                {errors.password && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                  CONFIRM PASSWORD *
                </label>
                <div className="relative flex items-center">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                      errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                    }`}
                  />
                  <Lock size={18} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                </div>
                {errors.confirmPassword && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Creating account..." : (
                <>
                  <span>Register Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Login switcher */}
          <div className="text-center mt-6 text-xs sm:text-sm text-slate-600 font-medium font-sans border-t border-slate-200 pt-5">
            Already have a customer account?{" "}
            <Link to="/auth/login" className="text-[#FF5349] font-bold hover:text-[#071E34] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-slate-600 border-t border-slate-200 bg-white/40">
        &copy; {new Date().getFullYear()} SPESHWAY MERN CRM. All rights reserved.
      </footer>
    </div>
  );
}


