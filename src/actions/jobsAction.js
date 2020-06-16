import axios from 'axios';

import { FETCH_JOBS, LIKED_JOB } from './types';

export const fetchJobs = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://10.0.0.106:3333/results');

    dispatch({ type: FETCH_JOBS, payload: data });
  } catch (error) {
    console.log({ error });
  }
};

export const likeJob = (job) => {
  return { type: LIKED_JOB, payload: job };
};
