import {FETCH_MOVIES} from './types';
import axios from "axios";
export const fetchMovies = (url) => dispatch => {
    axios
    .get(url)
    .then(res => res)
    .then(movies => {
        console.log(movies.data);
        dispatch({
            type:FETCH_MOVIES,
            payload:movies.data
        })
    }
    )
    console.log("yeet");
};