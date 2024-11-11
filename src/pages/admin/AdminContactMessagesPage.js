import React from "react";
import ContactMessages from "../../components/admin/contact-messages/ContactMessages";
import AdminTemplate from "../../templates/AdminTemplate";

const AdminContactMessagesPage = () => {
  return (
    <AdminTemplate>
      <ContactMessages />
    </AdminTemplate>
  );
};

export default AdminContactMessagesPage;
