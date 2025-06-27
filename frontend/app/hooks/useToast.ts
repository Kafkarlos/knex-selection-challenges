import { toast, type ToastOptions } from "react-toastify";

type ToastId = ReturnType<typeof toast>;

export function useToast() {
  let loadingId: ToastId | null = null;

  const baseOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  function showLoading(message: string) {
    loadingId = toast.loading(message, baseOptions);
  }

  function showSuccess(message: string) {
    if (loadingId) {
      toast.update(loadingId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        ...baseOptions,
      });
      loadingId = null;
    } else {
      toast.success(message, baseOptions);
    }
  }

  function showError(message: string) {
    if (loadingId) {
      toast.update(loadingId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        ...baseOptions,
      });
      loadingId = null;
    } else {
      toast.error(message, baseOptions);
    }
  }

  function dismiss() {
    toast.dismiss();
    loadingId = null;
  }

  return {
    showLoading,
    showSuccess,
    showError,
    dismiss,
  };
}
