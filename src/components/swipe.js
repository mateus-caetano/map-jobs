import React from 'react';
import {
  ScrollView,
  View,
  PanResponder,
  Animated,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

export default function Swipe({ data = [] }) {
  const [bottom] = React.useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gesture) => {
      bottom.setValue(-gesture.dy);
    },

    onPanResponderRelease: (event) => {},
  });

  const RenderCard = (job) => {
    return (
      <Card
        style={{
          paddingHorizontal: 20,
          paddingBottom: 15,
          borderWidth: 1,
          left: job.id * 5,
        }}
      >
        <Card.Title title={job.job} />
        <Card.Content style={{ height: 200 }}>
          <MapView
            style={{ flex: 1 }}
            scrollEnabled={false}
            initialRegion={{
              ...job.location,
              latitudeDelta: 0.045,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              title={job.job}
              coordinate={{
                ...job.location,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
            />
          </MapView>
        </Card.Content>
        <View>
          <Title>{job.company}</Title>
          <Title>{job.relativeTime}</Title>
        </View>
        <Text>{job.snipet}</Text>
      </Card>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginVertical: StatusBar.currentHeight + 15,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {data.reverse().map((job) => {
        return (
          <Animated.View
            style={{
              flex: 1,
              marginHorizontal: 30,
              position: 'absolute',
              bottom,
            }}
            key={job.id}
          >
            {RenderCard(job)}
          </Animated.View>
        );
      })}
    </View>
  );
}
