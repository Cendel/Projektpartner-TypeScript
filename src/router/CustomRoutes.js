import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/common/scroll-to-top/ScrollToTop";
import AdminContactMessageEditPage from "../pages/admin/AdminContactMessageEditPage";
import AdminContactMessagesPage from "../pages/admin/AdminContactMessagesPage";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage";
import AdminRequestedProjectsPage from "../pages/admin/AdminRequestedProjectsPage";
import AdminShareEditPage from "../pages/admin/AdminShareEditPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AuthPage from "../pages/common/AuthPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import UnauthorizedPage from "../pages/common/UnauthorizedPage";
import ContactPage from "../pages/user/ContactPage";
import Homepage from "../pages/user/Homepage";
import PrivacyPolicyPage from "../pages/user/PrivacyPolicyPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProjectDetailsPage from "../pages/user/ProjectDetailsPage";
import ProjectEditPage from "../pages/user/ProjectEditPage";
import ProjectFormPage from "../pages/user/ProjectFormPage";
import ProjectsPage from "../pages/user/ProjectsPage";
import ProtectedRoute from "./ProtectedRoute";
import ProjectsUserPage from "../pages/user/ProjectsUserPage";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project-form"
            element={
              <ProtectedRoute>
                <ProjectFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <ProtectedRoute>
                <PrivacyPolicyPage />
              </ProtectedRoute>
            }
          />
          <Route path="auth" element={<AuthPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route path="projects">
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path=":projectId"
              element={
                <ProtectedRoute>
                  <ProjectDetailsPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="projects-user">
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProjectsUserPage />
                </ProtectedRoute>
              }
            />

            <Route
              path=":projectId"
              element={
                <ProtectedRoute>
                  <ProjectDetailsPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="project-edit/:projectId"
            element={
              <ProtectedRoute>
                <ProjectEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-projects"
            element={
              <ProtectedRoute admin={true}>
                <AdminProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-requested-projects"
            element={
              <ProtectedRoute admin={true}>
                <AdminRequestedProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-users"
            element={
              <ProtectedRoute admin={true}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route path="admin-messages">
            <Route
              index
              element={
                <ProtectedRoute admin={true}>
                  <AdminContactMessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":messageId"
              element={
                <ProtectedRoute admin={true}>
                  <AdminContactMessageEditPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="admin-share-edit/:projectId"
            element={
              <ProtectedRoute admin={true}>
                <AdminShareEditPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
