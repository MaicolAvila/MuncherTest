import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import "./ProductItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as IcoDelete } from "../../assets/icons/delete-ico.svg";
import { ReactComponent as IcoEdit } from "../../assets/icons/edit-ico.svg";
import Product from "../../types/product";
import { productContentState } from "../../state/productState";
import { db } from "../../firebase";
import { Console } from "console";

export default function ProductItem(props: Product) {
  const { name, id } = props;
  
  const [product, setProduct] = useRecoilState(productContentState);

  const deleteTodo = async () => {
    try {
      await db.collection("products").onSnapshot((snapshot: any) => {
        const proc = snapshot.docs.find((doc: any) => doc.data().id === id);
        if (proc && proc.id) {
          db.collection("products").doc(proc.id).delete();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
