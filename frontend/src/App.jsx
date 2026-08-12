const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\App.tsx";import * as React from "react";
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
    React.createElement('div', { className: "app-motion-root", __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
      , React.createElement(Routes, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}
        /* Public Pages */
        , React.createElement(Route, { path: "/", element: React.createElement(LandingPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )
        , React.createElement(Route, { path: "/services", element: React.createElement(ServicesPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} )
        , React.createElement(Route, { path: "/features", element: React.createElement(FeaturesPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} )
        , React.createElement(Route, { path: "/about", element: React.createElement(AboutPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} )
        , React.createElement(Route, { path: "/contact", element: React.createElement(ContactPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 28}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}} )

        /* Auth Pages */
        , React.createElement(Route, { path: "/auth/login", element: React.createElement(LoginPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 31}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}} )
        , React.createElement(Route, { path: "/login", element: React.createElement(LoginPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} )
        , React.createElement(Route, { path: "/auth/register", element: React.createElement(RegisterPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 33}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}} )
        , React.createElement(Route, { path: "/register", element: React.createElement(RegisterPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}} )
        , React.createElement(Route, { path: "/auth/forgot-password", element: React.createElement(ForgotPasswordPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 35}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}} )

        /* Original Full-Featured Admin Dashboard */
        , React.createElement(Route, { path: "/admin/dashboard", element: React.createElement(AdminDashboard, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} )
        , React.createElement(Route, { path: "/admin/our-projects/:projectId/proposals", element: React.createElement(AdminDashboard, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
        , React.createElement(Route, { path: "/admin", element: React.createElement(Navigate, { to: "/admin/dashboard", replace: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}} )

        /* Original Full-Featured Customer Dashboard */
        , React.createElement(Route, { path: "/customer/dashboard", element: React.createElement(CustomerDashboard, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
        , React.createElement(Route, { path: "/customer", element: React.createElement(Navigate, { to: "/customer/dashboard", replace: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}} )

        /* Fallback */
        , React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/", replace: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}} )
      )
      , React.createElement(ToastHost, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} )
    )
  );
}

