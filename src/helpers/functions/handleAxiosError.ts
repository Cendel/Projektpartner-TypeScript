import { isAxiosError } from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "unauthorized";
    }
    return error.message || "Ein unbekannter Fehler ist aufgetreten.";
  }
  return "Ein Fehler ist aufgetreten.";
};
