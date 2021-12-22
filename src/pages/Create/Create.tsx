import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import "./Create.scss";
import { useSetRecoilState } from "recoil";

import { nanoid } from "nanoid";
import Developer from "../../types/developer";
import { developerContentState } from "../../state/developerState";
import WarningMessage from "../../components/WarningMessage/WarningMessage";

export default function Create() {
  const [content, setContent] = useState<Omit<Developer, "id">>({
    rol: "",
    name: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const selectRol: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const setDeveloper = useSetRecoilState(developerContentState);

  const addDeveloper: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(error);
    e.preventDefault();
    if (content.name.length > 0 && content.rol.length > 0) {
      setDeveloper((developers) => [
        ...developers,
        { ...content, id: nanoid() },
      ]);
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
          <label className="title">Rol</label>
          <select
            id="rol"
            className="input"
            onChange={selectRol}
            value={content.rol}
          >
            <option value="" selected disabled hidden>
              Escoje el rol
            </option>
            <option value="Fronted">Desarrolador Fronted</option>
            <option value="Backend">Desarrolador Backend</option>
          </select>
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
