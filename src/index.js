import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import axios from "./axios";

// axios.defaults.baseURL = "http://localhost:3001"; // cuando querramos trabajar y/o probar nuestro proyecto de forma local
axios.defaults.baseURL = "https://countriesappback-production.up.railway.app"; // cuando querramos pushear o actualizar nuestro deploy del front

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
