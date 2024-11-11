import React from "react";
import NotFound from "../../components/common/not-found/NotFound";
import UserTemplate from "../../templates/UserTemplate";

const NotFoundPage = () => {
  return (
    <UserTemplate>
      <NotFound />
    </UserTemplate>
  );
};

export default NotFoundPage;
