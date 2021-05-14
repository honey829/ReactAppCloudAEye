import ReactDOM from "react-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { Switch, BrowserRouter, Route, useHistory } from "react-router-dom";
import "./styles.css";
import Home from "./components/userHome";

const rootElement = document.getElementById("root");
let log = { loggedIn: Boolean };
if (JSON.parse(localStorage.getItem("userLoggedIn")) !== null)
  log = JSON.parse(localStorage.getItem("userLoggedIn"));
else log.loggedIn = false;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Register}></Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
