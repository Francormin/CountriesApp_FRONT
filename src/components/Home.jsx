/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countries from "./Countries";
import homeCss from "../cssModules/Home.module.css";
import {
  getCountries,
  getCountrySearch,
  emptyErrorState,
  getActivities,
  filteredCountries,
  orderedCountries
} from "../store/actions";
import Pagination from "./Pagination";
import MessagesToShow from "./MessagesToShow";
import loadingGif from "../assets/loading.gif";

export default function Home({
  actualPage,
  setActualPage,
  countriesPerPage,
  countryNameToSearch,
  setCountryNameToSearch
}) {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const errorMessage = useSelector(state => state.errorMessage);
  const countriesSearched = useSelector(state => state.searchedCountries);
  const countriesOrdered = useSelector(state => state.orderedCountries);
  const countriesFiltered = useSelector(state => state.filteredCountries);

  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  let lastCountryIndex;
  if (actualPage === 1) lastCountryIndex = 9;
  else lastCountryIndex = actualPage * countriesPerPage - 1;

  let firstCountryIndex;
  if (actualPage === 1) firstCountryIndex = 0;
  else firstCountryIndex = lastCountryIndex - countriesPerPage;

  const actualCountriesToShow = countriesSearched.length
    ? countriesSearched.slice(firstCountryIndex, lastCountryIndex)
    : countriesOrdered.length
    ? countriesOrdered.slice(firstCountryIndex, lastCountryIndex)
    : countriesFiltered.length
    ? countriesFiltered.slice(firstCountryIndex, lastCountryIndex)
    : countries.slice(firstCountryIndex, lastCountryIndex);

  function pages(pageNumber) {
    setActualPage(pageNumber);
  }

  function handleCountryNameChange(e) {
    setCountryNameToSearch(e.target.value);
  }

  function handleCountryNameSubmit(e) {
    e.preventDefault();

    if (!countryNameToSearch.length) {
      setMessage("noLettersSearch");
    } else if (/\s/.test(countryNameToSearch)) {
      setMessage("spacesSearch");
      setCountryNameToSearch("");
    } else if (!/^[^0-9]+$/.test(countryNameToSearch)) {
      setMessage("numbersSearch");
      setCountryNameToSearch("");
    } else if (/[^a-zA-Z0-9]/.test(countryNameToSearch)) {
      setMessage("specialCharactersSearch");
      setCountryNameToSearch("");
    }

    setActualPage(1);
    document.getElementById("countriesOrdering").selectedIndex = 0;
    document.getElementById("countriesFiltering").selectedIndex = 0;

    return dispatch(getCountrySearch(countryNameToSearch));
  }

  function order(value) {
    const countriesCopy = [...countries];

    if (value === "AZ") {
      countriesCopy.sort((a, b) => {
        const countryAName = a.name.toLowerCase().localeCompare(b.name);
        const countryBName = b.name.toLowerCase().localeCompare(a.name);

        if (countryAName < countryBName) return -1;
        if (countryAName > countryBName) return 1;
        return 0;
      });
    }

    if (value === "ZA") {
      countriesCopy.sort((a, b) => {
        const countryAName = a.name.toLowerCase().localeCompare(b.name);
        const countryBName = b.name.toLowerCase().localeCompare(a.name);

        if (countryAName > countryBName) return -1;
        if (countryAName < countryBName) return 1;
        return 0;
      });
    }

    if (value === "POP-ASC") {
      countriesCopy.sort((a, b) => {
        const countryAPop = a.population;
        const countryBPop = b.population;

        if (countryAPop < countryBPop) return -1;
        if (countryAPop > countryBPop) return 1;
        return 0;
      });
    }

    if (value === "POP-DESC") {
      countriesCopy.sort((a, b) => {
        const countryAPop = a.population;
        const countryBPop = b.population;

        if (countryAPop > countryBPop) return -1;
        if (countryAPop < countryBPop) return 1;
        return 0;
      });
    }

    setActualPage(1);

    return dispatch(orderedCountries(countriesCopy));
  }

  const continentsObj = new Set(countries.map(country => country.continent));
  const continentsArr = [];
  for (const continent of continentsObj) {
    continentsArr.push(continent);
  }

  function filter(value) {
    const countriesCopy = [...countries];
    const countriesToFilter = [];

    if (isNaN(Number(parseInt(value)))) {
      const filtering = countriesCopy.filter(country => country.continent === value);

      setActualPage(1);

      return dispatch(filteredCountries(filtering));
    }

    for (const country of countriesCopy) {
      if (country.activities?.length) {
        for (const activity of country.activities) {
          activity.id === parseInt(value) ? countriesToFilter.push(country) : null;
        }
      }
    }

    setActualPage(1);

    return dispatch(filteredCountries(countriesToFilter));
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage.name === "countrySearch") {
      setCountryNameToSearch("");
      setMessage("nameNotFound");
    }

    // if (errorMessage.name === "activities") {
    //   setMessage("activitiesNotFound");
    // }

    return () => {
      dispatch(emptyErrorState());
    };
  }, [dispatch, errorMessage.name, setCountryNameToSearch]);

  return (
    <>
      {loading ? (
        <div className={homeCss.gifDiv}>
          <img src={loadingGif} alt="loading_gif" className={homeCss.gif} />
        </div>
      ) : (
        <div className={homeCss.backgroundImg}>
          <form onSubmit={e => handleCountryNameSubmit(e)} className={homeCss.searchBar}>
            <input
              type="text"
              placeholder="Search a country..."
              value={countryNameToSearch}
              onChange={e => handleCountryNameChange(e)}
              className={homeCss.searchBarInput}
            />
            <input type="submit" value="Search" className={homeCss.searchBarSubmit} />
          </form>

          <span className={homeCss.features}>
            <select onChange={e => order(e.target.value)} id="countriesOrdering" className={homeCss.featuresSelect}>
              <option value="" hidden>
                Order Countries by...
              </option>
              <option value="AZ">Alphabetically A - Z</option>
              <option value="ZA">Alphabetically Z - A</option>
              <option value="POP-ASC">Population (Asc)</option>
              <option value="POP-DESC">Population (Desc)</option>
            </select>

            <select onChange={e => filter(e.target.value)} id="countriesFiltering" className={homeCss.featuresSelect}>
              <option value="" hidden>
                Filter Countries by Continents
              </option>
              {continentsArr.map(continent => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>

            <select onChange={e => filter(e.target.value)} id="countriesFiltering" className={homeCss.featuresSelect}>
              <option value="" hidden>
                Filter Countries by Tourist Activities
              </option>
              {activities?.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.name && activity.name[0].toUpperCase() + activity.name.slice(1)}
                </option>
              ))}
            </select>
          </span>

          <div className={homeCss.mainSection}>
            <div className={homeCss.pagesSection}>
              <br />
              <button type="button" disabled={actualPage === 1} onClick={() => pages(actualPage - 1)}>
                <span>PREV</span>
              </button>

              <Pagination
                totalCountries={
                  countriesSearched.length
                    ? countriesSearched.length
                    : countriesOrdered.length
                    ? countriesOrdered.length
                    : countriesFiltered.length
                    ? countriesFiltered.length
                    : countries.length
                }
                actualPage={actualPage}
                countriesPerPage={countriesPerPage}
                pages={pages}
              />

              <button
                type="button"
                disabled={
                  actualPage ===
                  1 +
                    Math.ceil(
                      countriesSearched.length
                        ? (countriesSearched.length - 9) / countriesPerPage
                        : countriesOrdered.length
                        ? (countriesOrdered.length - 9) / countriesPerPage
                        : countriesFiltered.length
                        ? (countriesFiltered.length - 9) / countriesPerPage
                        : (countries.length - 9) / countriesPerPage
                    )
                }
                onClick={() => pages(actualPage + 1)}
              >
                <span>NEXT</span>
              </button>
            </div>
          </div>

          <br />
          <div className={homeCss.countriesToShow}>
            {countriesSearched.length
              ? actualCountriesToShow?.map(countrySearched => (
                  <Countries
                    key={countrySearched.id}
                    id={countrySearched.id}
                    flagImg={countrySearched.flagImg}
                    name={countrySearched.name}
                    continent={countrySearched.continent}
                  />
                ))
              : countriesOrdered.length
              ? actualCountriesToShow?.map(countryOrdered => (
                  <Countries
                    key={countryOrdered.id}
                    id={countryOrdered.id}
                    flagImg={countryOrdered.flagImg}
                    name={countryOrdered.name}
                    continent={countryOrdered.continent}
                  />
                ))
              : countriesFiltered.length
              ? actualCountriesToShow?.map(countryFiltered => (
                  <Countries
                    key={countryFiltered.id}
                    id={countryFiltered.id}
                    flagImg={countryFiltered.flagImg}
                    name={countryFiltered.name}
                    continent={countryFiltered.continent}
                  />
                ))
              : actualCountriesToShow.length
              ? actualCountriesToShow?.map(actualCountries => (
                  <Countries
                    key={actualCountries.id}
                    id={actualCountries.id}
                    flagImg={actualCountries.flagImg}
                    name={actualCountries.name}
                    continent={actualCountries.continent}
                  />
                ))
              : null}
          </div>

          <MessagesToShow message={message} onClose={() => setMessage(false)} />
        </div>
      )}
    </>
  );
}
