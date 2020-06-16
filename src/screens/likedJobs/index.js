import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Card, Button, Title } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

function LikedJobs(props) {
  const navigation = useNavigation();

  return <View></View>;
}

function mapStateToProps(state) {
  return { likedJobs: state.like };
}

export default connect(mapStateToProps)(LikedJobs);
