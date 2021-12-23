import React, { Component } from "react";
import "./BackgroundPage.scss";
import { ReactComponent as IcoMuncher } from "../../assets/icons/Muncher-Cocinas-Ocultas-header.svg";
import NavUser from "../NavUser/NavUser";

import styled from "styled-components";
import {
  breakpoint_mobile_big,
  breakpoint_mobile_small,
} from "../../styles/styles";

export const BackContent = styled.div`
  background-color: #fff;
  border-radius: 20px;
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  gap: 3vh;
  max-height: 60vh;
  max-width: 80vw;

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    padding: 0.5rem;
    gap: 1vh;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    padding: 1rem;
    gap: 1vh;
  }
`;

class BackgroundPage extends Component {
  render() {
    return (
      <div className="BackgroundPage">
        <NavUser />
        <BackContent className="BackgroundPage-content column">
          <div className="header">
            <IcoMuncher />
          </div>
          <div className="body">{this.props.children}</div>
        </BackContent>
      </div>
    );
  }
}

export default BackgroundPage;
