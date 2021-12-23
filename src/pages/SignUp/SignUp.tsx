import React, { FormEventHandler, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import { BlueButton, Input, Label, VioletLink } from "../../styles/styles";
import "./SignUp.scss";

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
    <form className="SignUp column" onSubmit={login}>
      <div className="header">
        <div className="title">Registrar</div>
      </div>
      <div className="column body">
        <div className="input-div">
          <Label className="title">Nombre</Label>
          <Input
            className="input"
            id="name"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-div">
          <Label className="title">Email</Label>
          <Input
            className="input"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <Label className="title">password</Label>
          <Input
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
        <BlueButton type="submit">Crear Cuenta</BlueButton>
        <VioletLink to="/signIn">Iniciar sesion</VioletLink>
      </div>
    </form>
  );
}
