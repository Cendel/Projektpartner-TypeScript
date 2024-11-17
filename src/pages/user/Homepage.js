import React from "react";
import RecommendedProjects from "../../components/user/projects/RecommendedProjects";
import UserTemplate from "../../views/UserTemplate";

const Homepage = () => {
  return (
    <UserTemplate>
      <RecommendedProjects />
    </UserTemplate>
  );
};

export default Homepage;
