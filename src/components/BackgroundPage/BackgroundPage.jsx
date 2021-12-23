import React, { Component } from "react";
import "./BackgroundPage.scss";
import { ReactComponent as IcoMuncher } from "../../assets/icons/Muncher-Cocinas-Ocultas-header.svg";
import NavUser from "../NavUser/NavUser";

class BackgroundPage extends Component {
  render() {
    return (
      <div className="BackgroundPage">
        <NavUser />
        <div className="BackgroundPage-content column">
          <div className="header">
            <IcoMuncher />
          </div>
          <div className="body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default BackgroundPage;
