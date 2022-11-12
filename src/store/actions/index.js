import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_COUNTRY_SEARCH = "GET_COUNTRY_SEARCH";
export const ORDERED_COUNTRIES = "ORDERED_COUNTRIES";
export const FILTERED_COUNTRIES = "FILTERED_COUNTRIES";

export const THROW_ERROR_COUNTRY_DETAILS = "THROW_ERROR_COUNTRY_DETAILS";
export const THROW_ERROR_COUNTRY_SEARCH = "THROW_ERROR_COUNTRY_SEARCH";
export const THROW_ERROR_ACTIVITIES = "THROW_ERROR_ACTIVITIES";

export const EMPTY_ERROR_STATE = "EMPTY_ERROR_STATE";
export const EMPTY_COUNTRY_DETAILS_STATE = "EMPTY_COUNTRY_DETAILS_STATE";

// PROMISES
// export const getCountries = () => dispatch => {
//    axios
//       .get("http://localhost:3001/countries")
//       .then(countries => {
//          dispatch({
//             type: GET_COUNTRIES,
//             payload: countries.data
//          });
//       })
//       .catch(error => new Error("getCountries: ", error));
// };

export const getCountries = () => async dispatch => {
  try {
    const countries = await axios.get("http://localhost:3001/countries");
    dispatch({
      type: GET_COUNTRIES,
      payload: countries.data
    });
  } catch (error) {
    throw new Error("getCountries: ", error);
  }
};

export const getCountryDetails = idCountry => async dispatch => {
  try {
    const countryData = await axios.get(`http://localhost:3001/countries/${idCountry}`);
    dispatch({
      type: GET_COUNTRY_DETAILS,
      payload: countryData.data
    });
  } catch (error) {
    dispatch({
      type: THROW_ERROR_COUNTRY_DETAILS
    });
  }
};

export const getActivities = () => async dispatch => {
  try {
    const activities = await axios.get("http://localhost:3001/activities");
    dispatch({
      type: GET_ACTIVITIES,
      payload: activities.data
    });
  } catch (error) {
    dispatch({
      type: THROW_ERROR_ACTIVITIES
    });
  }
};

export const postActivity = activity => async dispatch => {
  try {
    const newActivity = await axios.post("http://localhost:3001/activities", activity);
    dispatch({
      type: POST_ACTIVITY,
      payload: newActivity.data
    });
  } catch (error) {
    throw new Error("postActivity: ", error);
  }
};

// PROMISES
// export function postActivity(activity) {
//    return function (dispatch) {
//       return axios
//          .post("http://localhost:3001/activities", activity)
//          .then(newActivity =>
//             dispatch({
//                type: POST_ACTIVITY,
//                payload: newActivity.data
//             })
//          )
//          .catch(error => new Error("postActivity: ", error));
//    };
// }

export const getCountrySearch = countryNameToSearch => async dispatch => {
  try {
    const countrySearched = await axios.get(`http://localhost:3001/countries?name=${countryNameToSearch}`);
    dispatch({
      type: GET_COUNTRY_SEARCH,
      payload: countrySearched.data
    });
  } catch (error) {
    dispatch({
      type: THROW_ERROR_COUNTRY_SEARCH
    });
  }
};

export const orderedCountries = countriesOrdered => dispatch => {
  dispatch({
    type: ORDERED_COUNTRIES,
    payload: countriesOrdered
  });
};

export const filteredCountries = countriesFiltered => dispatch => {
  dispatch({
    type: FILTERED_COUNTRIES,
    payload: countriesFiltered
  });
};

export const emptyErrorState = () => dispatch => {
  dispatch({
    type: EMPTY_ERROR_STATE
  });
};

export const emptyCountryDetailsState = () => dispatch => {
  dispatch({
    type: EMPTY_COUNTRY_DETAILS_STATE
  });
};
