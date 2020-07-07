import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import moviereducer from "./moviereducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  movies: moviereducer
});