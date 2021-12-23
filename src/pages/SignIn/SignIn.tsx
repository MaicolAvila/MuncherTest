import React, { useState, useEffect, FormEventHandler } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import authState from "../../state/authState";
import "./SignIn.scss";
import {
  BlueButton,
  Input,
  Label,
  Title,
  VioletLink,
} from "../../styles/styles";

export default function SignIn() {
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
    signInWithEmailAndPassword(email, password);
  };

  return (
    <form className="SignIn column" onSubmit={login}>
      <div className="header">
        <Title>Login</Title>
      </div>
      <div className="column body">
        <div className="input-div">
          <Label>Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <Label>password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="footer row">
        <BlueButton type="submit">Login</BlueButton>
        <VioletLink to="/signUp">Registrarse</VioletLink>
      </div>
    </form>
  );
}
