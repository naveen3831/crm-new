const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\ui\\ToastHost.tsx";import * as React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";








const toastStyles = {
  success: "border-emerald-500/20 bg-slate-900 text-white shadow-xl shadow-emerald-950/20",
  error: "border-red-500/20 bg-slate-900 text-white shadow-xl shadow-red-950/20",
  info: "border-slate-700 bg-slate-900 text-white shadow-xl shadow-slate-950/20",
};

const iconStyles = {
  success: "bg-emerald-500/20 text-emerald-400",
  error: "bg-red-500/20 text-red-400",
  info: "bg-blue-500/20 text-blue-400",
};

const labels = {
  success: "SUCCESS",
  error: "ALERT",
  info: "NOTICE",
};

const ToastIcon = ({ type }) => {
  if (type === "success") return React.createElement(CheckCircle2, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}} );
  if (type === "error") return React.createElement(AlertCircle, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}} );
  return React.createElement(Info, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} );
};

export default function ToastHost() {
  const [toasts, setToasts] = React.useState([]);

  const pushToast = React.useCallback((message, type = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [{ id, message, type }, ...prev].slice(0, 3));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  React.useEffect(() => {
    const onToast = (event) => {
      const detail = (event ).detail || {};
      pushToast(detail.message || "Action completed.", detail.type || "info");
    };

    window.addEventListener("crm-toast", onToast);
    return () => window.removeEventListener("crm-toast", onToast);
  }, [pushToast]);

  if (toasts.length === 0) return null;

  return (
    React.createElement('div', { className: "fixed bottom-5 right-5 z-[2147483647] flex w-[min(420px,calc(100vw-2rem))] flex-col-reverse gap-3 pointer-events-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
      , toasts.map((toast) => (
        React.createElement('div', {
          key: toast.id,
          className: `pointer-events-auto rounded-xl border px-4 py-3 shadow-xl ${toastStyles[toast.type]}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}

          , React.createElement('div', { className: "flex items-start gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
            , React.createElement('div', { className: `mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconStyles[toast.type]}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
              , React.createElement(ToastIcon, { type: toast.type, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} )
            )
            , React.createElement('div', { className: "min-w-0 flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
              , React.createElement('div', { className: "text-xs font-extrabold uppercase tracking-wide"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}, labels[toast.type])
              , React.createElement('div', { className: "mt-0.5 break-words text-sm font-semibold leading-snug text-slate-700"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}, toast.message)
            )
            , React.createElement('button', {
              type: "button",
              onClick: () => setToasts((prev) => prev.filter((item) => item.id !== toast.id)),
              className: "rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"     ,
              'aria-label': "Dismiss notification" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}

              , React.createElement(X, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}} )
            )
          )
        )
      ))
    )
  );
}
