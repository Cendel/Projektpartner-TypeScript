import React from "react";
import ContactForm from "../../components/user/contact/contact-form/ContactForm";
import UserTemplate from "../../views/UserTemplate";

const ContactPage = () => {
  return (
    <UserTemplate>
      <ContactForm />
    </UserTemplate>
  );
};

export default ContactPage;
