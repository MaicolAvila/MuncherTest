import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Developer from "../../types/developer";
import "./DeveloperItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as IcoDelete } from "../../assets/icons/delete-ico.svg";
import { ReactComponent as IcoEdit } from "../../assets/icons/edit-ico.svg";
import { developerContentState } from "../../state/developerState";

export default function DeveloperItem(props: Developer) {
  const { rol, name, id } = props;
  //   const [isComplete, setIsComplete] = useRecoilState(
  //     todoCompleteState(props.id)
  //   );
  const setDeveloper = useSetRecoilState(developerContentState);
  //   const toggleComplete = () => setIsComplete((prevState) => !prevState);
  const deleteTodo = () =>
    setDeveloper((dev) => dev.filter((dev) => dev.id !== id));
  return (
    <div className="DeveloperItem">
      <div className="content-name">
        <div>{props.name}</div>
      </div>
      <div className="content-icons">
        <Link to={`/update/${props.id}`}>
          <IcoEdit style={{ cursor: "pointer" }} />
        </Link>
        <IcoDelete style={{ cursor: "pointer" }} onClick={deleteTodo} />
      </div>
    </div>
  );
}
