import { toast } from "react-toastify";

export const successToast = (
  message,
  options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
) => {
  return toast.success(message, {
    ...options,
  });
};

export const errorToast = (
  message,
  options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
) => {
  return toast.error(message, {
    ...options,
  });
};
