import React from "react";
import pageNotFoundCss from "../cssModules/PageNotFound.module.css";

export default function PageNotFound({ error }) {
  if (error === false) return null;

  return (
    <div className={pageNotFoundCss.container}>
      <h2 className={pageNotFoundCss.mainMessage}>Error 404: Page Not Found</h2>
      <p className={pageNotFoundCss.secondMessage}>
        {error === "idNotFound" ? "There is no country with that id" : null}
      </p>
    </div>
  );
}
