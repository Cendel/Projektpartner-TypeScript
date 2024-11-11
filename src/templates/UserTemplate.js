import React from "react";
import Footer from "../components/user/common/footer/Footer";
import Header from "../components/user/common/header/Header";

const UserTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
