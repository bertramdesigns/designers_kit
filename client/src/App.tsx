// import logo from "./assets/logo.svg";
import "./App.css";
import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Productivity from "./pages/Productivity";
import Login from "./pages/Login";
import { Window } from "./components/dkui/window";
import { createEffect } from "solid-js";
import { isUserLoggedIn } from "./store/authStore";

function App() {
  createEffect(async () => {
    await isUserLoggedIn();
    //console.log("Logged in ", loggedIn ? "yes" : "no");
  });

  return (
    <Router root={Window}>
      <Route path="/" component={Home} />
      <Route path="/research" component={Home} />
      <Route path="/productivity" component={Productivity} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
