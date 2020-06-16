import { combineReducers } from 'redux';
import auth from './authReducer';
import jobs from './jobsReducer';
import like from './likeJobReducer';

export default combineReducers({
  auth,
  jobs,
  like,
});
