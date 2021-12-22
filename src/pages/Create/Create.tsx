import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Create.scss";
import { useSetRecoilState } from "recoil";

import { nanoid } from "nanoid";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Product from "../../types/product";
import Images from "../../types/images";
import { productContentState } from "../../state/productState";
import { db, logout, storage } from "../../firebase";

export default function Create() {
  const [ref, setRef] = useState<any>();
  const [content, setContent] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    precio: "",
    images: "",
  });

  const [Imagen, setImagen] = useState<File>();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const changeImagen = async (e: any) => {
    await setImagen(e.target.files[0]);
  };

  const setProduct = useSetRecoilState(productContentState);

  const addProduct: FormEventHandler<HTMLFormElement> = async (e) => {
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
      console.log(Imagen);
      if (Imagen) {
        const newRef = storage.ref(`images`).child(Imagen.name);
        await setRef(newRef);
        await newRef.put(Imagen);
        let urlImagen = await newRef.getDownloadURL();
        const newProduct: Product = {
          id: nanoid(),
          name: content.name,
          description: content.description,
          precio: content.precio,
          images: urlImagen,
        };
        await db.collection("products").add(newProduct);
        history.replace("/");
      }
    } catch (err) {
      // Error handling
      console.log(err);
    }
  };
  return (
    <form className="Create column" onSubmit={addProduct}>
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
