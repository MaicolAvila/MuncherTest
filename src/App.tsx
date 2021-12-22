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

function App() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
  }, [user, loading]);

  return (
    <div className="App">
      <Router>
        <BackgroundPage>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Create} />
            <Route exact path="/update/:id" component={Edit} />
            <Route exact path="/signIn" component={SignIn} />
          </Switch>
        </BackgroundPage>
      </Router>
    </div>
  );
}

export default App;
