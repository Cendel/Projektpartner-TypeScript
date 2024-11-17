import { isAxiosError } from "axios";

export const handleAxiosError = (
  error: unknown
): { message: string; type?: string } => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return { message: "unauthorized", type: "warning" };
    }
    if (error.response?.data?.message === "Name taken") {
      return {
        message: "Der Benutzername ist bereits vergeben.",
        type: "warning",
      };
    }
    if (error.response?.data?.message === "Email taken") {
      return {
        message: "Die E-Mail-Adresse ist bereits vergeben.",
        type: "warning",
      };
    }
    return {
      message: error.message || "Ein Fehler ist aufgetreten.",
      type: "error",
    };
  }
  return { message: "Ein unbekannter Fehler ist aufgetreten.", type: "error" };
};
