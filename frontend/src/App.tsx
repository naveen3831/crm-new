import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Original full-featured Admin & Customer Dashboard components
import AdminDashboard from "../app/admin/dashboard/page.jsx";
import CustomerDashboard from "../app/customer/dashboard/page.jsx";

// Public Pages & Auth
import LandingPage from "./pages/public/LandingPage";
import ServicesPage from "./pages/public/ServicesPage";
import FeaturesPage from "./pages/public/FeaturesPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ToastHost from "../components/ui/ToastHost";

export default function App() {
  return (
    <div className="app-motion-root">
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Pages */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        {/* Original Full-Featured Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/our-projects/:projectId/proposals" element={<AdminDashboard />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Original Full-Featured Customer Dashboard */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastHost />
    </div>
  );
}

