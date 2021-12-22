import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import "./Create.scss";
import { useSetRecoilState } from "recoil";

import { nanoid } from "nanoid";
import { developerContentState } from "../../state/developerState";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Product from "../../types/product";
import { productContentState } from "../../state/productState";
import { db, logout } from "../../firebase";

export default function Create() {
  const [content, setContent] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    precio: "",
  });

  const [Imagen, setImagen] = useState();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const changeImagen = (e: any) => {
    setImagen(e.target.files[0]);
    console.log(Imagen);
  };

  const setProduct = useSetRecoilState(productContentState);

  const addDeveloper: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log(error);
    e.preventDefault();
    // if (content.name.length > 0) {
    //   setProduct((developers) => [...developers, { ...content, id: nanoid() }]);
    //   setError(false);
    //   setSuccess(true);
    //   setTimeout(() => {
    //     setSuccess(false);
    //   }, 2000);
    // } else {
    //   setError(true);
    //   setTimeout(() => {
    //     setError(false);
    //   }, 2000);
    // }
    try {
      const newProduct: Product = {
        id: nanoid(),
        name: content.name,
        description: content.description,
        precio: content.precio,
      };
      await db.collection("products").add(newProduct);
    } catch (err) {
      // Error handling
      console.log(err)
    }
  };
  return (
    <form className="Create column" onSubmit={addDeveloper}>
      <div className="header">
        <div className="title">Crear Producto</div>
      </div>
      <div className="column body">
        <div className="input-div">
          <label className="title">Nombre</label>
          <input
            className="input"
            onChange={handleChange}
            value={content.name}
            id="name"
          />
        </div>
        <div className="input-div">
          <label className="title">descripcion</label>
          <input
            id="description"
            className="input"
            onChange={handleChange}
            value={content.description}
          />
        </div>
        <div className="input-div">
          <label className="title">Precio</label>
          <input
            id="precio"
            className="input"
            type="number"
            onChange={handleChange}
            value={content.precio}
          />
        </div>
        <div className="input-div">
          <label className="title">Seleccionar imagen</label>
          <input type="file" name="imagen" onChange={changeImagen} />
        </div>
      </div>
      <div className="footer row">
        <button className="btn1" type="submit">
          Crear
        </button>
        <Link to="/" className="btn2">
          Ver
        </Link>
        <button onClick={logout} className="btn1">
          SignOut
        </button>
      </div>
      {error ? <WarningMessage title="Faltan datos" type="error" /> : null}
      {success ? (
        <WarningMessage title="Desarrollador creado!" type="success" />
      ) : null}
    </form>
  );
}
