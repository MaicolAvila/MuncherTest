import React, { useEffect } from "react";
import "./App.scss";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from "react-router-dom";
import BackgroundPage from "./components/BackgroundPage/BackgroundPage";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import SignIn from "./pages/SignIn/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import SignUp from "./pages/SignUp/SignUp";
import NavUser from "./components/NavUser/NavUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <BackgroundPage>
            <AuthGuard>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={Create} />
              <Route exact path="/update/:id" component={Edit} />
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/signUp" component={SignUp} />
            </AuthGuard>
          </BackgroundPage>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
