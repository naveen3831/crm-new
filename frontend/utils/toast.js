 

export const showToast = (message, type = "success") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("crm-toast", { detail: { message, type } }));
  }
};

