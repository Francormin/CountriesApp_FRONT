import React from "react";
import { Link } from "react-router-dom";
import landingPageCss from "../cssModules/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={landingPageCss.container}>
      <div className={landingPageCss.content}>
        <h1 className={landingPageCss.title}>Welcome to Countries APP</h1>
        <Link to="/home">
          <button type="button" className={landingPageCss.button}>
            To Home
          </button>
        </Link>
      </div>
    </div>
  );
}
