import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, logout } from "../../firebase";
import "./NavUser.scss";
import { ReactComponent as LogoutIco } from "../../assets/icons/logout-ico.svg";
import UserIco from "../../assets/icons/user-default-ico.png";
import {
  breakpoint_mobile_big,
  breakpoint_mobile_small,
  Title,
} from "../../styles/styles";
import styled from "styled-components";

export const NavContent = styled.div`
  background-color: #fff;
  border-radius: 20px;
  width: fit-content;
  height: 60px;
  padding: 1rem 3rem;

  justify-content: space-between;
  align-items: center;
  gap: 5vw;

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    padding: 0.25rem 1rem;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    padding: 0.5rem 2rem;
  }
`;

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
        <NavContent className="row">
          <div className="user-content row">
            <div className="content-img">
              <img src={UserIco} alt="" />
            </div>
            <Title>{user.email}</Title>
          </div>
          <div className="logout-content column">
            <LogoutIco onClick={logout} className="logout-ico" />
          </div>
        </NavContent>
      ) : null}
    </>
  );
}
