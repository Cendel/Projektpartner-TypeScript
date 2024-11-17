import Swal, { SweetAlertIcon } from "sweetalert2";

export const question = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
  });
};

export const toast = (
  title: string,
  icon = "info" as SweetAlertIcon,
  timer = 4000,
  showConfirmButton = false
) => {
  Swal.fire({
    position: "top-end",
    icon, //success, warning, question, error, info, etc.
    title,
    showConfirmButton,
    timer,
  });
};
