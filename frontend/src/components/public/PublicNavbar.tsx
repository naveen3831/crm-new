import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import CrmBrandLogo from "./CrmBrandLogo";

export default function PublicNavbar() {
  const location = useLocation();
  const path = location.pathname;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Features", path: "/features" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="h-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50 px-6 lg:px-12 flex items-center justify-between shadow-sm font-sans">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center min-w-0">
        <CrmBrandLogo size="sm" />
      </Link>

      {/* Center Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">
        {navLinks.map((link) => {
          const isActive = path === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 border-b-2 ${
                isActive
                  ? "text-[#0B2369] border-[#F05454] font-extrabold"
                  : "text-slate-700 border-transparent hover:text-[#F05454]"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to="/auth/login"
          className="px-4 py-2 rounded-xl text-[#0B2369] hover:text-[#F05454] font-bold text-xs hover:bg-slate-100 transition-all duration-200 ease-out flex items-center gap-1.5"
        >
          <LogIn size={15} /> Sign In
        </Link>
        <Link
          to="/auth/register"
          className="px-5 py-2.5 rounded-xl premium-button text-white font-extrabold text-xs hover:opacity-95 shadow-md shadow-navy-950/20 transition-all duration-200 ease-out inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <UserPlus size={15} /> Register
        </Link>
      </div>
    </nav>
  );
}


