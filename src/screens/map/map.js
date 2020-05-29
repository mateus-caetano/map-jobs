import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as actions from "../../actions/index";

function Map(props) {

  const navigation = useNavigation()

  const [ region, setRegion ] = React.useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  })

  const onButtonPress = () => {
    props.fetchJobs(region);
  }

  return (
    <View style={{flex: 1}}
    >
      <MapView 
        region={region}
        style={{ flex: 1 }}
        onRegionChangeComplete={(region) => setRegion(region)}
      />

      <View style={styles.buttonContainer}>
        <Button
          color="#009688"
          icon='search-web'
          mode='contained'
          onPress={onButtonPress}
          style={{height: 50, justifyContent: 'center'}}
        >
          Search This Area
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  }
})

export default connect(null, actions)(Map)