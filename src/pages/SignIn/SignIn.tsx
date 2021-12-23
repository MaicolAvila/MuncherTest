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
        <div className="title">Login</div>
      </div>
      <div className="column body">
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
          Login
        </button>
        <Link to="/signUp" className="btn2">
          Registrarse
        </Link>
      </div>
    </form>
  );
}
