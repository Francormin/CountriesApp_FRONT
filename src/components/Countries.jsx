import React from "react";
import { Link } from "react-router-dom";
import countriesCss from "../cssModules/Countries.module.css";

export default function Country({ id, flagImg, name, continent }) {
  return (
    <div className={countriesCss.bigContainer}>
      <div className={countriesCss.container}>
        <div className={countriesCss.infoContainer}>
          <Link to={`/countries/${id}`}>
            <img src={flagImg} alt="country_flag" className={countriesCss.countryFlag} />
          </Link>
          <h2>{name}</h2>
          <h3>Continent: {continent}</h3>
        </div>
      </div>
    </div>
  );
}
