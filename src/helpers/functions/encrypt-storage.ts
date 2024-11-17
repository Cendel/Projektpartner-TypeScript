import { EncryptStorage } from "encrypt-storage";

const encryptionKey = process.env.REACT_APP_STORAGE_ENCRYPTION_KEY;

if (!encryptionKey) {
  throw new Error("No Encryption key was found!.");
}

export const encryptedLocalStorage = new EncryptStorage(encryptionKey);
