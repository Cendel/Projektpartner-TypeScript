import { ReactNode } from "react";
import Footer from "../components/user/common/footer/Footer";
import Header from "../components/user/common/header/Header";

interface props {
  children: ReactNode;
}
const UserTemplate = ({ children }: props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
