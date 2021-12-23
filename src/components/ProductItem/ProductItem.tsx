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
  const { name, id, precio, images } = props;

  return (
    <Link to={`/update/${id}`} className="ProductItem">
      <div className="content-image">
        <img src={images} style={{ width: "100%" }} alt="" />
      </div>
      <div className="line"></div>
      <div className="content-description column">
        <div className="precio">$ {precio}</div>
        <div className="name">{name}</div>
      </div>
    </Link>
  );
}
