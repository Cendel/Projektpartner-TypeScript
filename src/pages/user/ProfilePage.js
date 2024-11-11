import React from "react";
import Profile from "../../components/user/profile/Profile";
import UserTemplate from "../../templates/UserTemplate";

const ProfilePage = () => {
  return (
    <UserTemplate>
      <Profile />
    </UserTemplate>
  );
};

export default ProfilePage;
