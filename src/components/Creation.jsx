import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../store/actions";
import MessagesToShow from "./MessagesToShow";
import creationCss from "../cssModules/Creation.module.css";
import loadingGif from "../assets/loading.gif";

export default function Creation() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const countries = useSelector(state => state.countries);

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesById: []
  });
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  function validation(input) {
    const errors = {};

    // if(!Number.isNaN(parseInt(input.name))) {
    //    errors.name = "The name must be a string";
    //    setDisabled(true);
    // }
    if (!input.name || /\s/.test(input.name)) {
      errors.name = (
        <p>
          The <strong>name</strong> is <u>required</u> and <u>cannot contain</u> spaces
        </p>
      );
      setDisabled(true);
    } else if (/[^a-zA-Z0-9]/.test(input.name)) {
      errors.name = (
        <p>
          The <strong>name</strong> <u>cannot contain</u> special characters
        </p>
      );
      setDisabled(true);
    } else if (!input.difficulty) {
      errors.difficulty = (
        <p>
          The <strong>difficulty</strong> is <u>required</u>. Please select an option
        </p>
      );
      setDisabled(true);
    } else if (!input.duration) {
      errors.duration = (
        <p>
          The <strong>duration</strong> is <u>required</u> and <u>must be</u> a number. Please select an option
        </p>
      );
      setDisabled(true);
    } else if (input.duration < 1 || input.duration > 24) {
      errors.duration = (
        <p>
          The <stronh>duration</stronh> <u>must be</u> a number between 1 and 24
        </p>
      );
      setDisabled(true);
    } else if (!input.season) {
      errors.season = (
        <p>
          The <strong>season</strong> is <u>required</u>. Please select an option
        </p>
      );
      setDisabled(true);
    } else if (!input.countriesById.length) {
      errors.countriesById = (
        <p>
          At least one <strong>country</strong> <u>must be</u> selected
        </p>
      );
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    return errors;
  }

  const orderedCountries = countries.sort((a, b) => {
    const na = a.name.toLowerCase().localeCompare(b.name);
    const nb = b.name.toLowerCase().localeCompare(a.name);

    if (na > nb) {
      return 1;
    }
    if (na < nb) {
      return -1;
    }
    return 0;
  });

  function handleOnChange(e) {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });

    if (e.target.name === "difficulty" || e.target.name === "duration") {
      setActivity({
        ...activity,
        [e.target.name]: parseInt(e.target.value)
      });
    }

    if (e.target.name === "name" || e.target.name === "season") {
      setActivity({
        ...activity,
        [e.target.name]: e.target.value.toLowerCase()
      });
    }

    setError(
      validation({
        ...activity,
        [e.target.name]: e.target.value
      })
    );
  }

  function handleOnChangeCountry(e) {
    const selectedCountry = countries.find(country => country.name === e.target.value);

    if (!selectedCountries.find(country => country.id === selectedCountry.id)) {
      const countriesId = [...activity.countriesById, selectedCountry.id];

      setActivity({
        ...activity,
        countriesById: countriesId
      });

      setError(
        validation({
          ...activity,
          countriesById: countriesId
        })
      );

      setSelectedCountries([...selectedCountries, selectedCountry]);
      document.getElementById("countriesById").selectedIndex = "";
    } else {
      setMessage("countryAlreadySelected");
      document.getElementById("countriesById").selectedIndex = "";
    }
  }

  function handleOnCloseCountryFlag(id) {
    const selectedCountryToDelete = selectedCountries.filter(country => country.id !== id);
    const countryToDelete = activity.countriesById.filter(countryId => countryId !== id);

    setActivity({
      ...activity,
      countriesById: countryToDelete
    });

    setError(
      validation({
        ...activity,
        countriesById: countryToDelete
      })
    );

    setSelectedCountries(selectedCountryToDelete);
    document.getElementById("countriesById").selectedIndex = "";
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(activity));

    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesById: []
    });
    document.getElementById("difficulty").selectedIndex = "";
    document.getElementById("season").selectedIndex = "";
    setSelectedCountries([]);
    setDisabled(true);
    setError(false);
    setMessage("activityCreated");
    // history.push("/home");
  }

  useEffect(() => {
    dispatch(getCountries());

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div className={creationCss.gifDiv}>
          <img src={loadingGif} alt="loading_gif" className={creationCss.gif} />
        </div>
      ) : (
        <div className={creationCss.container}>
          <div className={creationCss.containerIn}>
            <h1 className={creationCss.title}>Create a Tourist Activity</h1>

            <form onSubmit={e => handleOnSubmit(e)} className={creationCss.creationForm}>
              <div className={creationCss.creationDiv}>
                <label htmlFor="name" className={creationCss.label}>
                  Name:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={activity.name}
                    onChange={e => handleOnChange(e)}
                    required
                  />
                </label>
                <div visibility={error.name ? "visible" : "hidden"} className={error.name ? creationCss.danger : null}>
                  {error.name}
                </div>
              </div>

              <br />
              <div className={creationCss.creationDiv}>
                <label htmlFor="difficulty" className={creationCss.label}>
                  Difficulty level:
                  <select id="difficulty" name="difficulty" onChange={e => handleOnChange(e)} required>
                    <option hidden value="">
                      Choose an option
                    </option>
                    <option value={1}>Very easy</option>
                    <option value={2}>Easy</option>
                    <option value={3}>Normal</option>
                    <option value={4}>Difficult</option>
                    <option value={5}>Very difficult</option>
                  </select>
                </label>
                <div
                  visibility={error.difficulty ? "visible" : "hidden"}
                  className={error.difficulty ? creationCss.danger : null}
                >
                  {error.difficulty}
                </div>
              </div>

              <br />
              <div className={creationCss.creationDiv}>
                <label htmlFor="duration" className={creationCss.label}>
                  Duration (in hours):
                  <input
                    type="number"
                    min={1}
                    max={24}
                    id="duration"
                    name="duration"
                    value={activity.duration}
                    onChange={e => handleOnChange(e)}
                    required
                  />
                </label>
                <div
                  visibility={error.duration ? "visible" : "hidden"}
                  className={error.duration ? creationCss.danger : null}
                >
                  {error.duration}
                </div>
              </div>

              <br />
              <div className={creationCss.creationDiv}>
                <label htmlFor="season" className={creationCss.label}>
                  Season:
                  <select id="season" name="season" onChange={e => handleOnChange(e)} required>
                    <option hidden value="">
                      Choose an option
                    </option>
                    <option value="Spring">Spring</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                    <option value="Summer">Summer</option>
                  </select>
                </label>
                <div
                  visibility={error.season ? "visible" : "hidden"}
                  className={error.season ? creationCss.danger : null}
                >
                  {error.season}
                </div>
              </div>

              <br />
              <div className={creationCss.creationDiv}>
                <label htmlFor="countriesById" className={creationCss.label}>
                  Countries where the tourist activity can be practiced:
                  <select
                    id="countriesById"
                    name="countriesById"
                    onChange={e => handleOnChangeCountry(e)}
                    className={creationCss.chooseCountry}
                  >
                    <option hidden value="">
                      Choose any country
                    </option>
                    {orderedCountries &&
                      orderedCountries.map(country => (
                        <option key={country.id} value={country.name} defaultValue={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </label>
                <div
                  visibility={error.countriesById ? "visible" : "hidden"}
                  className={error.countriesById ? creationCss.danger : null}
                >
                  {error.countriesById}
                </div>

                {selectedCountries.length ? (
                  <>
                    <p className={creationCss.selectedCountries}>Countries selected:</p>
                    <div className={creationCss.flagsContainer}>
                      {selectedCountries &&
                        selectedCountries.map(country => (
                          <div key={country.id} className={creationCss.flagDiv}>
                            <button
                              type="button"
                              onClick={() => handleOnCloseCountryFlag(country.id)}
                              className={creationCss.flagButton}
                            >
                              x
                            </button>
                            <img src={country.flagImg} alt="flag_img" className={creationCss.countryFlag} />

                            <span className={creationCss.countryName}>{country.name}</span>
                          </div>
                        ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className={creationCss.containerSubmit}>
                <input type="submit" value="CREATE" disabled={disabled} className={creationCss.submitButton} />
              </div>
            </form>

            <MessagesToShow message={message} onClose={() => setMessage(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
