import {
  GET_COUNTRIES,
  GET_COUNTRY_DETAILS,
  GET_ACTIVITIES,
  POST_ACTIVITY,
  GET_COUNTRY_SEARCH,
  THROW_ERROR_COUNTRY_DETAILS,
  THROW_ERROR_COUNTRY_SEARCH,
  EMPTY_ERROR_STATE,
  EMPTY_COUNTRY_DETAILS_STATE,
  ORDERED_COUNTRIES,
  THROW_ERROR_ACTIVITIES,
  FILTERED_COUNTRIES
} from "../actions";

const initialState = {
  countries: [],
  searchedCountries: [],
  orderedCountries: [],
  filteredCountries: [],
  countryDetails: {},
  activities: [],
  errorMessage: {}
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload
      };
    case GET_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetails: payload
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload
      };
    case POST_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, payload]
      };
    case GET_COUNTRY_SEARCH:
      return {
        ...state,
        searchedCountries: payload
      };
    case FILTERED_COUNTRIES:
      return {
        ...state,
        filteredCountries: payload
      };
    case ORDERED_COUNTRIES:
      return {
        ...state,
        orderedCountries: payload
      };
    case THROW_ERROR_COUNTRY_DETAILS:
      return {
        ...state,
        errorMessage: { name: "countryDetails" }
      };
    case THROW_ERROR_COUNTRY_SEARCH:
      return {
        ...state,
        errorMessage: { name: "countrySearch" }
      };
    case THROW_ERROR_ACTIVITIES:
      return {
        ...state,
        errorMessage: { name: "activities" }
      };
    case EMPTY_ERROR_STATE:
      return {
        ...state,
        errorMessage: {}
      };
    case EMPTY_COUNTRY_DETAILS_STATE:
      return {
        ...state,
        countryDetails: {}
      };
    default:
      return state;
  }
}
