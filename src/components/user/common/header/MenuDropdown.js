import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { question } from "../../../../helpers/functions/swal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logOut } from "../../../../store/slices/auth-slice";
import { encryptedLocalStorage } from "../../../../helpers/functions/encrypt-storage";

const MenuDropdown = () => {
  const { user } = useAppSelector((state) => state.auth); //useAppSelector bizim hooks.js de useSelector yerine tanimladigimiz hook umuzdu. Merkezi state imizde olusturdugumuz auth grubunun isUserLogin vs verilerine ulasmakta kullanacagiz bunu.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Logout", "Sind Sie sicher, dass Sie sich abmelden möchten?").then(
      (result) => {
        if (result.isConfirmed) {
          dispatch(logOut());
          encryptedLocalStorage.removeItem("token");
          navigate("/");
        }
      }
    );
  };

  return (
    <NavDropdown title={user.name.substring(0, 10)} className="userName">
      <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>
        Profil
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/projects-user">
        Meine Projekte
      </NavDropdown.Item>

      {user.is_superuser && (
        <>
          <NavDropdown.Divider />

          <NavDropdown.Item as={Link} to="/admin-projects">
            Dashboard
          </NavDropdown.Item>

          <NavDropdown.Divider />
        </>
      )}

      <NavDropdown.Item onClick={handleLogout}>Abmelden</NavDropdown.Item>
    </NavDropdown>
  );
};

export default MenuDropdown;
