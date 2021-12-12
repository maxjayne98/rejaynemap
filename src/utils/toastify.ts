import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

export const customToast = (
  type: "info" | "success" | "warning" | "error",
  message: string,
  options?: ToastOptions
): void => {
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
  toast[type](message, { ...defuaultConf, ...options });
};
