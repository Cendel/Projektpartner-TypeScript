import Swal from "sweetalert2";

export const question = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
  });
};

export const toast = (
  title,
  icon = "info",
  timer = 4000,
  showConfirmButton = false
) => {
  //
  Swal.fire({
    position: "top-end",
    icon, //success, warning, question, error, info, etc.
    title,
    showConfirmButton,
    timer,
  });
};
