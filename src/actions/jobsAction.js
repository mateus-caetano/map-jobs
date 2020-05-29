import axios from 'axios'
import reverseGeocode from 'latlng-to-zip';

import { FETCH_JOBS } from "./types";

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
}

export const fetchJobs = region => async dispatch => {
    try {
        const zip = await reverseGeocode(region)
        const { data } = await axios.get(JOB_ROOT_URL, {...JOB_QUERY_PARAMS, zip})
        dispatch({ type: FETCH_JOBS, payload: data });
    } catch (error) {
        console.log({error});
    }
} 