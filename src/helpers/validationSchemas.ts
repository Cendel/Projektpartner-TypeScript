import * as Yup from "yup";

export const registerFormValidationSchema = Yup.object({
  name: Yup.string().required("Bitte geben Sie Ihren Namen ein."),
  email: Yup.string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    .required("Bitte geben Sie eine E-mail-Adresse ein."),
  password: Yup.string()
    .required("Bitte Passwort eingeben.")
    .min(8, "Bitte geben Sie mindestens 8 Zeichen ein.")
    .matches(/[a-z]+/, "Ein Kleinbuchstabe")
    .matches(/[A-Z]+/, "Ein Großbuchstabe")
    .matches(/[@$!%*#?&.]+/, "Ein besonderes Zeichen")
    .matches(/\d+/, "Eine Nummer"),
  confirmPassword: Yup.string()
    .required("Bitte geben Sie Ihr Passwort erneut ein.")
    .oneOf([Yup.ref("password")], "Passwortfelder stimmen nicht überein."),
});

export const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Bitte geben Sie eine E-mail-Adresse ein."),
  password: Yup.string().required("Bitte geben Sie Ihr Passwort erneut ein."),
});

export const adminShareEditValidationSchema = Yup.object({
  user: Yup.string().required("Geben Sie die ID des Teilnehmers ein."),
  shares: Yup.number().min(1).required("Geben Sie Anzahl der Aktien ein."),
});

export const contactFormValidationSchema = Yup.object({
  sender: Yup.string().required("Geben Sie Ihren Namen ein."),

  title: Yup.string()
    .max(50, "Der Betreff sollte maximal 50 Zeichen lang sein.")
    .min(5, "Der Betreff sollte mindestens 5 Zeichen lang sein.")
    .required("Geben Sie einen Betreff ein."),
  text: Yup.string()
    .max(200, "Die Nachricht sollte maximal 200 Zeichen lang sein.")
    .min(20, "Die Nachricht sollte mindestens 20 Zeichen lang sein.")
    .required("Geben Sie eine Nachricht ein."),
});

export const profileEditValidationSchema = Yup.object({
  name: Yup.string().required("Bitte geben Sie Ihren Namen ein."),
});

export const projectFormValidationSchema = Yup.object({
  projectTitle: Yup.string().required("Geben Sie den Namen des Projekts ein."),
  projectPlace: Yup.string().required("Geben Sie den Ort des Projekts ein."),
  estimatedImplementationDate: Yup.string().required(
    "Geben Sie das voraussichtliche Implementierungsdatum ein."
  ),
  slogan: Yup.string()
    .max(50, "Der Slogan soll maximal 50 Zeichen lang sein.")
    .required("Geben Sie einen Slogan für Ihr Projekt ein."),
  about: Yup.string().required(
    "Geben Sie ein, worum es in Ihrem Projekt geht."
  ),
  goal: Yup.string().required(
    "Erzählen Sie von Ihren Projektzielen und Zielgruppen."
  ),
  support: Yup.string().required(
    "Geben Sie ein, wer hinter Ihrem Projekt steht."
  ),
  shortDesc: Yup.string()
    .max(200, "Die kurze Beschreibung soll maximal 200 Zeichen lang sein.")
    .required(
      "Geben Sie eine kurze Beschreibung ein, die maximal 200 Zeichen lang ist."
    ),
  longDesc: Yup.string()
    .min(
      200,
      "Die detaillierte Beschreibung soll mindestens 200 Zeichen lang sein."
    )
    .required(
      "Geben Sie eine detaillierte Beschreibung ein, die mindestens 200 Zeichen lang ist."
    ),
  projectValue: Yup.number()
    .min(10, "Der Gesamtbetrag muss mindestens 10 € betragen.")
    .integer("Der Gesamtbetrag muss eine ganze Zahl sein.")
    .required(
      "Geben Sie den Gesamtbetrag in Euro ein, der für das Projekt benötigt wird."
    ),
  totalShares: Yup.number()
    .min(1, "Die Gesamtzahl der Anteile muss mindestens 1 betragen.")
    .integer("Die Gesamtzahl der Anteile muss eine ganze Zahl sein.")
    .required(
      "Geben Sie die Gesamtzahl der Anteile ein, die für das Projekt verfügbar sind."
    ),
  maxSharesPerPerson: Yup.number()
    .min(1, "Die maximale Anzahl an Anteilen muss mindestens 1 betragen.")
    .integer("Die maximale Anzahl an Anteilen muss eine ganze Zahl sein.")
    .required(
      "Geben Sie die maximale Anzahl an Anteilen ein, die eine Person kaufen kann."
    )
    .test(
      "max-shares-per-person",
      "Die maximale Anzahl an Anteilen darf nicht höher sein als die Gesamtzahl der Anteile.",
      function (value) {
        const { totalShares } = this.parent;
        return value <= totalShares;
      }
    ),
});

export const adminEditUserValidationSchema = Yup.object({
  name: Yup.string().required("Bitte geben den Namen ein."),
});
