/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { emptyCountryDetailsState, emptyErrorState, getCountryDetails } from "../store/actions";
import detailsCss from "../cssModules/Details.module.css";
import PageNotFound from "./PageNotFound";
import loadingGif from "../assets/loading.gif";

export default function Details() {
  const { idCountry } = useParams();
  const dispatch = useDispatch();
  const countryDetails = useSelector(state => state.countryDetails);
  const errorMessage = useSelector(state => state.errorMessage);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCountryDetails(idCountry));

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      dispatch(emptyCountryDetailsState());
    };
  }, [dispatch, idCountry]);

  useEffect(() => {
    if (errorMessage.name === "countryDetails") {
      setError("idNotFound");
    }

    return () => {
      dispatch(emptyErrorState());
    };
  }, [dispatch, errorMessage.name]);

  return (
    <div>
      {loading ? (
        <div className={detailsCss.gifDiv}>
          <img src={loadingGif} alt="loading_gif" className={detailsCss.gif} />
        </div>
      ) : countryDetails.id ? (
        <div className={detailsCss.backgroundImg}>
          <div className={detailsCss.bigContainer}>
            <div className={detailsCss.details}>
              <div className={detailsCss.detailsContainerOut}>
                <div className={detailsCss.detailsContainerIn}>
                  <h2>{countryDetails.name}</h2>
                  <img src={countryDetails.flagImg} alt="country_flag" className={detailsCss.flagImg} />
                  <h3>Code: {countryDetails.id}</h3>
                  <h3>Continent: {countryDetails.continent}</h3>
                  <h3>Capital: {countryDetails.capital}</h3>
                  <h3>Subregion: {countryDetails.subregion}</h3>
                  <h3>Area: {new Intl.NumberFormat().format(countryDetails.area)} km2</h3>
                  <h3>Population: {new Intl.NumberFormat().format(countryDetails.population)}</h3>
                  <h3>Tourist Activities:</h3>
                  {countryDetails.activities?.length ? (
                    countryDetails.activities?.map(activity => (
                      <div key={activity.id} className={detailsCss.activityContainer}>
                        <p>
                          <strong>
                            <u>{activity.name[0].toUpperCase() + activity.name.slice(1)}</u>
                          </strong>
                        </p>
                        <p>
                          Difficulty:
                          {activity.difficulty === 1
                            ? " Very easy"
                            : activity.difficulty === 2
                            ? " Easy"
                            : activity.difficulty === 3
                            ? " Normal"
                            : activity.difficulty === 4
                            ? " Difficult"
                            : activity.difficulty === 5
                            ? " Very difficult"
                            : null}
                        </p>
                        <p>
                          Duration:
                          {activity.duration === 1 ? ` ${activity.duration} hour` : ` ${activity.duration} hours`}
                        </p>
                        <p>Season: {activity.season[0].toUpperCase() + activity.season.slice(1)}</p>
                      </div>
                    ))
                  ) : (
                    <p className={detailsCss.message}>No tourist activity was created for this country</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageNotFound error={error} />
      )}
    </div>
  );
}
