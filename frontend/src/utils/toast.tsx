import Swal from "sweetalert2";

export const showToast = (
  icon: "success" | "error" | "info" | "warning",
  title: string
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({ icon, title });
};
