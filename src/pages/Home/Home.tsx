import React from "react";
import "./Home.scss";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { developerContentState } from "../../state/developerState";
import DeveloperItem from "../../components/DeveloperItem/DeveloperItem";

export default function Home() {
  const developers = useRecoilValue(developerContentState);
  return (
    <div className="Home column">
      <div className="header">
        <div className="title">Lista de desarrolladores</div>
      </div>
      <div className="column body">
        <div className="frontends col column">
          <div className="title">Frontends</div>
          <div className="list">
            {developers.map((dev) => {
              if (dev.rol === "Fronted") {
                return <DeveloperItem key={dev.id} {...dev} />;
              }
            })}
          </div>
        </div>
        <div className="backends col column">
          <div className="title">Backends</div>
          <div className="list">
            {developers.map((dev) => {
              if (dev.rol === "Backend") {
                return <DeveloperItem key={dev.id} {...dev} />;
              }
            })}
          </div>
        </div>
      </div>
      <div className="footer row">
        <Link to="/add" className="btn1">
          Crear
        </Link>
      </div>
    </div>
  );
}
