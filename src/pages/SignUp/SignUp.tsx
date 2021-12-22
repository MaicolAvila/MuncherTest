import React, { FormEventHandler, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/");
  }, [user, loading]);

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(error);
    e.preventDefault();
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <form className="Create column" onSubmit={login}>
      <div className="header">
        <div className="title">Registrar</div>
      </div>
      <div className="column body">
        <div className="input-div">
          <label className="title">Nombre</label>
          <input
            className="input"
            id="name"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label className="title">Email</label>
          <input
            className="input"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label className="title">password</label>
          <input
            id="password"
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="footer row">
        <button className="btn1" type="submit">
          Crear Cuenta
        </button>
        <Link to="/signIn" className="btn2">
          Iniciar sesion
        </Link>
      </div>
    </form>
  );
}
