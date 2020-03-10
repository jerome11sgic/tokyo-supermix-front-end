import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Content from "./Contents/Index";
import Login from "./login/Login";
import Signup from "./login/Signup";

function App() {
  return (
    <div className='App'>
      <Switch>
        {/* login */}
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/logout'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route path='/' component={Content} />
      </Switch>
    </div>
  );
}

export default App;
