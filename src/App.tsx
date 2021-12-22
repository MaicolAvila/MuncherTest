import React from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import BackgroundPage from "./components/BackgroundPage/BackgroundPage";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <BackgroundPage>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Create} />
            <Route exact path="/update/:id" component={Edit} />
          </Switch>
        </BackgroundPage>
      </Router>
    </div>
  );
}

export default App;
