import _ from 'lodash';

import { LIKED_JOB } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case LIKED_JOB:
      return _.uniqBy([action.payload, ...state], 'id');

    default:
      return state;
  }
}
