import { useState, useEffect } from "react";
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
import User from "../../../entities/User";

type SectionType =
  | "projectsCreated"
  | "projectsParticipated"
  | "projectsFollowed"
  | "profile-edit"
  | "shares";

const Profile = () => {
  const { userId: userIdString } = useParams();
  const userId = Number(userIdString);
  const [user, setUser] = useState<User | null>(null);
  const visitor = useAppSelector((state) => state.auth.user!.id); // Non-null Assertion
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState<{
    section: SectionType | null;
    listToBeShowed: number[];
  }>({
    section: null,
    listToBeShowed: [],
  });

  const loadData = async () => {
    try {
      const result = await getUserById(userId);
      setUser(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (sectionType: SectionType) => {
    if (!user) return;
    const newList = {
      projectsCreated: user.created_projects,
      projectsParticipated: user.participated_projects,
      projectsFollowed: user.followed_projects,
      "profile-edit": [],
      shares: [],
    };
    setActiveSection({
      section: sectionType,
      listToBeShowed: newList[sectionType] || [],
    });
  };

  return (
    <>
      {loading || !user ? (
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
                    href={user.website}
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
            <div className="common-buttons">
              <Button
                id="projectsCreated"
                onClick={() => handleClick("projectsCreated")}
                className={
                  activeSection.section === "projectsCreated" ? "active" : ""
                }
              >
                Erstellte Projekte
              </Button>
              <Button
                id="projectsParticipated"
                onClick={() => handleClick("projectsParticipated")}
                className={
                  activeSection.section === "projectsParticipated"
                    ? "active"
                    : ""
                }
              >
                Teilnehmende Projekte
              </Button>
              <Button
                id="projectsFollowed"
                onClick={() => handleClick("projectsFollowed")}
                className={
                  activeSection.section === "projectsFollowed" ? "active" : ""
                }
              >
                Verfolgte Projekte
              </Button>
            </div>
            {visitor === user.id && (
              <div className="private-buttons">
                <Button
                  id="shares"
                  onClick={() => handleClick("shares")}
                  className={activeSection.section === "shares" ? "active" : ""}
                >
                  Meine Aktien
                </Button>
                <Button
                  id="shares"
                  onClick={() => handleClick("profile-edit")}
                  className={
                    activeSection.section === "profile-edit" ? "active" : ""
                  }
                >
                  Profil bearbeiten
                </Button>
              </div>
            )}
          </div>
          {activeSection.section && (
            <UserProjectsList listToBeShowed={activeSection.listToBeShowed} />
          )}
          {activeSection.section === "profile-edit" && <ProfileEdit />}
          {activeSection.section === "shares" && (
            <UserSharesList userId={Number(user.id)} />
          )}
        </div>
      )}
    </>
  );
};
export default Profile;
