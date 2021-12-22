import {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import "./Edit.scss";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import { nanoid } from "nanoid";
import Developer from "../../types/developer";
import { developerContentState } from "../../state/developerState";
import WarningMessage from "../../components/WarningMessage/WarningMessage";

export default function Edit(props: any) {
  const developers = useRecoilValue(developerContentState);
  const [content, setContent] = useState<Developer>({
    id: "",
    rol: "",
    name: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const dev = developers.find((dev) => dev.id === props.match.params.id);

    if (dev) setContent(dev);
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const selectRol: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const setDeveloper = useSetRecoilState(developerContentState);

  const editDeveloper: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (content.name.length > 0 && content.rol.length > 0) {
      const outputs = developers.filter(
        (dev) => dev.id !== props.match.params.id
      );
      setDeveloper(() => [...outputs, { ...content }]);

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
    <form className="Create column" onSubmit={editDeveloper}>
      <div className="header">
        <div className="title">Actualizar Desarrollador</div>
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
            defaultValue="Fronted"
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
          Editar
        </button>
        <Link to="/" className="btn2">
          Ver
        </Link>
      </div>
      {error ? <WarningMessage title="Faltan datos" type="error" /> : null}
      {success ? (
        <WarningMessage title="Desarrollador actualizado!" type="success" />
      ) : null}
    </form>
  );
}
