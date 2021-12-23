import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, logout } from "../../firebase";
import "./NavUser.scss";
import { ReactComponent as LogoutIco } from "../../assets/icons/logout-ico.svg";
import UserIco from "../../assets/icons/user-default-ico.png";

export default function NavUser() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) console.log(user);
  }, [user, loading]);
  return (
    <>
      {user ? (
        <div className="NavUser row">
          <div className="user-content row">
            <div className="content-img">
              <img src={UserIco} alt="" />
            </div>
            <div className="content-email">{user.email}</div>
          </div>
          <div className="logout-content column">
            <LogoutIco onClick={logout} className="logout-ico" />
          </div>
        </div>
      ) : null}
    </>
  );
}
