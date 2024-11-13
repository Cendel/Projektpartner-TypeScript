import { isAxiosError } from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.message || "Ein unbekannter Fehler ist aufgetreten.";
  }
  return "Ein Fehler ist aufgetreten.";
};
