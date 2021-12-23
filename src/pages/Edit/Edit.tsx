import {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from "react";
import { Link, useHistory } from "react-router-dom";
import "./Edit.scss";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import { nanoid } from "nanoid";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Product from "../../types/product";
import { productContentState } from "../../state/productState";
import { db } from "../../firebase";

export default function Edit(props: any) {
  const developers = useRecoilValue(productContentState);
  const [content, setContent] = useState<Product>({
    id: "",
    name: "",
    description: "",
    precio: "",
    images: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const dev = developers.find((dev) => dev.id === props.match.params.id);

    if (dev) setContent(dev);
    else history.replace("/");
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeDes: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const history = useHistory();

  const setDeveloper = useSetRecoilState(productContentState);

  const deleteProduct = async () => {
    try {
      const colect = await db.collection("products").get();
      const product = colect.docs.find(
        (doc) => doc.data().id === props.match.params.id
      );
      if (product) db.collection("products").doc(product.id).delete();
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editDeveloper: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (content.name.length > 0) {
      const outputs = developers.filter(
        (dev) => dev.id !== props.match.params.id
      );
      setDeveloper(() => [...outputs, { ...content }]);
      const colect = await db.collection("products").get();
      const product = colect.docs.find(
        (doc) => doc.data().id === props.match.params.id
      );
      if (product) db.collection("products").doc(product.id).update(content);
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      history.replace("/");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <form className="Edit column" onSubmit={editDeveloper}>
      <div className="Edit-content row">
        <div className="header c1 column">
          <div className="input-div">
            <input
              className="input title"
              placeholder=""
              onChange={handleChange}
              value={content.name}
              id="name"
            />
          </div>
          <div className="content-image">
            <img src={content.images} style={{ width: "100%" }} alt="" />
          </div>
        </div>
        <div className="body c2 column">
          <div className="input-div">
            <input
              id="precio"
              className="input precio"
              onChange={handleChange}
              value={content.precio}
            />
          </div>
          <div className="input-div">
            <textarea
              id="description"
              className="input textTarea"
              onChange={handleChangeDes}
              value={content.description}
            />
          </div>
        </div>
      </div>
      <div className="footer row">
        <button className="btn1" type="submit">
          Actualizar
        </button>
        <button onClick={deleteProduct} className="btn2">
          Eliminar
        </button>
      </div>
      {error ? <WarningMessage title="Faltan datos" type="error" /> : null}
      {success ? (
        <WarningMessage title="Desarrollador actualizado!" type="success" />
      ) : null}
    </form>
  );
}
