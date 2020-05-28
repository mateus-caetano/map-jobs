import { FACEBOOK_ID } from "react-native-dotenv";
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  await Facebook.initializeAsync(FACEBOOK_ID)
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};