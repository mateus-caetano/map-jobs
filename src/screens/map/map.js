import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import * as actions from '../../actions/index';

function Map(props) {
  const navigation = useNavigation();

  const [region, setRegion] = React.useState({ latitude: 0, longitude: 0 });

  const onButtonPress = () => {
    props.fetchJobs();
    navigation.navigate('Jobs');
  };

  React.useEffect(() => {
    async function loadLocation() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry', 'We need your loacation to continue', [
          {
            text: 'Ok',
            onPress: () => {
              return;
            },
          },
        ]);
      }

      const location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }

    loadLocation();
  }, []);

  // if (region.latitude === 0) return <View />;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.09,
        }}
        style={{ flex: 1 }}
        onRegionChangeComplete={(region) => setRegion(region)}
      />

      <View style={styles.buttonContainer}>
        <Button
          color="#009688"
          icon="search-web"
          mode="contained"
          onPress={onButtonPress}
          style={{ height: 50, justifyContent: 'center' }}
        >
          Search This Area
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default connect(null, actions)(Map);
