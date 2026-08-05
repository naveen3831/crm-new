import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";

export default function LoginPage() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      } catch {}

      // Automatic Role-based Routing based on DB account role
      if (data.user.role === "admin") {
        try {
          localStorage.removeItem("speshway_crm_active_tab");
          localStorage.removeItem("speshway_crm_active_project_id");
          localStorage.removeItem("speshway_crm_active_client_id");
          localStorage.removeItem("speshway_crm_active_client_project_id");
        } catch {}
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between hero-gradient bg-[#F7FBFA] selection:bg-[#FF5349] selection:text-white">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center min-w-0">
          <CrmBrandLogo size="sm" />
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-medium hidden sm:inline">New here?</span>
          <Link
            to="/auth/register"
            className="px-4 py-1.5 rounded-xl bg-rose-50 text-[#071E34] border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-all duration-200 ease-out shadow-sm"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="animate-page-enter flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm premium-surface animate-page-enter border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-6 transition-all duration-200 ease-out">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center gap-2.5 mb-5 text-center">
            <div className="flex justify-center">
              <CrmBrandLogo size="md" showText={false} />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-[#071E34] tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-600 font-medium font-sans mt-1">
                Enter your account credentials to log in.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-xs font-semibold text-red-700 leading-relaxed flex items-center gap-2 shadow-sm">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Email Field */}
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
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                    errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                  }`}
                />
                <Mail size={16} className="absolute left-3 text-[#FF5349] pointer-events-none" />
              </div>
              {errors.email && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-[#071E34] font-sans tracking-wide uppercase">
                PASSWORD *
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-11 py-2.5 rounded-xl bg-white border text-[#071E34] text-sm font-medium transition-all duration-200 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#FF5349] shadow-sm"
                  }`}
                />
                <Lock size={16} className="absolute left-3 text-[#FF5349] pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-[#071E34] p-1 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="text-xs font-bold text-red-600 mt-0.5">{errors.password}</span>}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end text-xs font-sans pt-0.5">
              <Link to="/auth/forgot-password" className="text-[#FF5349] hover:text-[#071E34] transition-colors font-semibold">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1 py-3 rounded-xl premium-button text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-5 text-xs text-slate-600 font-medium font-sans border-t border-slate-200 pt-4">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="text-[#FF5349] font-bold hover:text-[#071E34] transition-colors">
              Create Account
            </Link>
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-3 text-center text-xs text-slate-600 border-t border-slate-200 bg-white/40">
        &copy; {new Date().getFullYear()} SPESHWAY MERN CRM. All rights reserved.
      </footer>
    </div>
  );
}


