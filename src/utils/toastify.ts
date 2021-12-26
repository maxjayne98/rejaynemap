import { ReactText } from "react";
import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

export const customToast = (
  type: "info" | "success" | "warning" | "error",
  message: string,
  options?: ToastOptions
): (() => ReactText) => {
  const defuaultConf: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  const showToast = () => toast[type](message, { ...defuaultConf, ...options });
  return showToast;
};
