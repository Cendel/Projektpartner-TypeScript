import React, { useState, useEffect } from "react";
import { getUserById } from "../../../api/user-service";
import { Button } from "react-bootstrap";
import SectionHeader from "../common/section-header/SectionHeader";
import "./Profile.scss";
import ProfileEdit from "./ProfileEdit";
import UserProjectsList from "./UserProjectsList";
import UserSharesList from "./UserSharesList";
import { useParams } from "react-router-dom";
import Loading from "../../common/loading/Loading";
import { useAppSelector } from "../../../store/hooks";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatedList, setshowCreatedList] = useState(false);
  const [showParticipatedList, setShowParticipatedList] = useState(false);
  const [showFollowedList, setShowFollowedList] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showSharesList, setShowSharesList] = useState(false);
  const [listToBeShowed, setListToBeShowed] = useState([]);
  const visitor = useAppSelector((state) => state.auth.user.id);

  const loadData = async () => {
    try {
      const result = await getUserById(userId);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (projectType) => {
    setshowCreatedList(false);
    setShowParticipatedList(false);
    setShowFollowedList(false);
    setShowProfileEdit(false);
    setShowSharesList(false);
    if (projectType === "projectsCreated") {
      setListToBeShowed(user.created_projects);
      setshowCreatedList(true);
    }
    if (projectType === "projectsParticipated") {
      setListToBeShowed(user.participated_projects);
      setShowParticipatedList(true);
    }
    if (projectType === "projectsFollowed") {
      setListToBeShowed(user.followed_projects);
      setShowFollowedList(true);
    }
    if (projectType === "profile-edit") {
      setListToBeShowed(userId);
      setShowProfileEdit(true);
    }
    if (projectType === "shares") {
      setListToBeShowed(userId);
      setShowSharesList(true);
    }
    const buttons = document.querySelectorAll("buttons");
    buttons.forEach((button) => button.classList.remove("active"));

    // Add 'active' class to the clicked button
    const clickedButton = document.getElementById(projectType);
    if (clickedButton) {
      clickedButton.classList.add("active");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="profile-user">
          <div style={{ padding: "1rem 1rem 0rem 1rem" }}>
            <SectionHeader title={user.name} />
          </div>
          <div className="profile-container">
            <div className="profile-card">
              <h2>Kurzinfo</h2>
              <div className="short-info-fields">
                <div className="field">
                  <span>Name:</span> {user.name}
                </div>
                <div className="field">
                  <span>Beruf:</span> {user.job}
                </div>
                <div className="field">
                  <span>Ort:</span> {user.location}
                </div>
              </div>
            </div>
            <div className="profile-card">
              <h2>Kontaktinformationen</h2>
              <div className="contact-info-fields">
                <div className="field">
                  <span>E-Mail:</span> {user.email}
                </div>
                <div className="field">
                  <span>Telefon:</span> {user.phone}
                </div>
                <div className="field">
                  <span>Website:</span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://${user.website}`}
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="profile-about"
            style={{ display: user.about === "" ? "none" : "block" }}
          >
            {user.about}
          </div>
          <div className="buttons">
            <div className="three-buttons">
              <Button
                id="projectsCreated"
                onClick={() => handleClick("projectsCreated")}
                className={showCreatedList ? "active" : ""}
              >
                Erstellte Projekte
              </Button>
              <Button
                id="projectsParticipated"
                onClick={() => handleClick("projectsParticipated")}
                className={showParticipatedList ? "active" : ""}
              >
                Teilnehmende Projekte
              </Button>
              <Button
                id="projectsFollowed"
                onClick={() => handleClick("projectsFollowed")}
                className={showFollowedList ? "active" : ""}
              >
                Verfolgte Projekte
              </Button>
            </div>
            {visitor === user.id && (
              <div className="two-buttons">
                <Button
                  id="shares"
                  onClick={() => handleClick("shares")}
                  className={showSharesList ? "active" : ""}
                >
                  Meine Aktien
                </Button>
                <Button
                  id="shares"
                  onClick={() => handleClick("profile-edit")}
                  className={showProfileEdit ? "active" : ""}
                >
                  Profil bearbeiten
                </Button>
              </div>
            )}
          </div>
          {showCreatedList && <UserProjectsList {...listToBeShowed} />}
          {showParticipatedList && <UserProjectsList {...listToBeShowed} />}
          {showFollowedList && <UserProjectsList {...listToBeShowed} />}
          {showProfileEdit && <ProfileEdit {...listToBeShowed} />}
          {showSharesList && <UserSharesList {...listToBeShowed} />}
        </div>
      )}
    </>
  );
}

export default Profile;
