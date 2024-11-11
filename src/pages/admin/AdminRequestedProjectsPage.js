import React from "react";
import AdminRequestedProjects from "../../components/admin/admin-projects/AdminRequestedProjects";
import AdminTemplate from "../../templates/AdminTemplate";

const AdminRequestedProjectsPage = () => {
  return (
    <AdminTemplate>
      <AdminRequestedProjects />
    </AdminTemplate>
  );
};

export default AdminRequestedProjectsPage;
