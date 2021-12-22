import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import "./Create.scss";
import { useSetRecoilState } from "recoil";

import { nanoid } from "nanoid";
import { developerContentState } from "../../state/developerState";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Product from "../../types/product";
import { productContentState } from "../../state/productState";

export default function Create() {
  const [content, setContent] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    precio: "",
    images: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const selectRol: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const setProduct = useSetRecoilState(productContentState);

  const addDeveloper: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(error);
    e.preventDefault();
    if (content.name.length > 0) {
      setProduct((developers) => [...developers, { ...content, id: nanoid() }]);
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <form className="Create column" onSubmit={addDeveloper}>
      <div className="header">
        <div className="title">Crear Desarrollador</div>
      </div>
      <div className="column body">
        <div className="input-div">
          <label className="title">Nombre</label>
          <input
            className="input"
            placeholder="Ejemplo Maicol..."
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
            onChange={handleChange}
            value={content.precio}
          />
        </div>
      </div>
      <div className="footer row">
        <button className="btn1" type="submit">
          Crear
        </button>
        <Link to="/" className="btn2">
          Ver
        </Link>
      </div>
      {error ? <WarningMessage title="Faltan datos" type="error" /> : null}
      {success ? (
        <WarningMessage title="Desarrollador creado!" type="success" />
      ) : null}
    </form>
  );
}
