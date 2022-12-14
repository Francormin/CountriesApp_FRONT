import { applyMiddleware, legacy_createStore as createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
