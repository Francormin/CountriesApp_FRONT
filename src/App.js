import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import Creation from "./components/Creation";
import NavBar from "./components/NavBar";

function App() {
  const [actualPage, setActualPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [countryNameToSearch, setCountryNameToSearch] = useState("");

  return (
    <div className="App">
      <Switch>
        <Route exact path="/countries/:idCountry">
          <NavBar />
          <Details />
        </Route>
        <Route exact path="/home">
          <NavBar />
          <Home
            actualPage={actualPage}
            setActualPage={setActualPage}
            countriesPerPage={countriesPerPage}
            countryNameToSearch={countryNameToSearch}
            setCountryNameToSearch={setCountryNameToSearch}
          />
        </Route>
        <Route exact path="/creation">
          <NavBar />
          <Creation />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
