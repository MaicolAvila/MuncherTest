import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import "./ProductItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as IcoDelete } from "../../assets/icons/delete-ico.svg";
import { ReactComponent as IcoEdit } from "../../assets/icons/edit-ico.svg";
import { developerContentState } from "../../state/developerState";
import Product from "../../types/product";

export default function ProductItem(props: Product) {
  const { name, id } = props;
  //   const [isComplete, setIsComplete] = useRecoilState(
  //     todoCompleteState(props.id)
  //   );
  const setProduct = useSetRecoilState(developerContentState);
  //   const toggleComplete = () => setIsComplete((prevState) => !prevState);
  const deleteTodo = () =>
    setProduct((product) => product.filter((product) => product.id !== id));
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
