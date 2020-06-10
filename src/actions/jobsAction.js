import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';

// import { GOOGLE_API_KEY } from "react-native-dotenv";
import { FETCH_JOBS } from './types';

// const JOB_QUERY_PARAMS = {
//     publisher: '4201738803816157',
//     format: 'json',
//     v: '2',
//     latlong: 1,
//     radius: 10,
//     q: 'javascript'
// }

// const getPlacesUrl = () => {
//     const baseUrl = `https: //maps.googleapis.com/maps/api/place/nearbysearch/json?` ;
//     const location = `location = $ {latitude}, $ {longitude} & radius = $ {radius}` ;
//     const typeData = `& types = $ {type}` ;
//     const api = `& key = $ {GOOGLE_API_KEY}` ;
//     return `$ {baseUrl} $ {location} $ {typeData} $ {api}` ;
// }

// const api = axios.create({
//   baseURL: 'http://10.0.0.106:3333',
// });

export const fetchJobs = () => async (dispatch) => {
  try {
    // const zip = await reverseGeocode(region)
    // getPlacesUrl()
    const { data } = await axios.get('http://10.0.0.106:3333/results');

    dispatch({ type: FETCH_JOBS, payload: data });
  } catch (error) {
    console.log({ error });
  }
};
