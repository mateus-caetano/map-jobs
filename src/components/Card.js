import React from 'react';
import { View, Animated, PanResponder, Easing, Dimensions } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

const height = Dimensions.get('window').height;

const RenderCard = ({ job, index }) => {
  const [limit, setLimit] = React.useState(false);
  const [bottom] = React.useState(new Animated.Value(0));
  const AnimatedCard = Animated.createAnimatedComponent(Card);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (e, gesture) => {
      bottom.setValue(-gesture.dy);
    },

    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy <= height * -0.2) {
        Animated.timing(bottom, {
          toValue: height,
          duration: 500,
          easing: Easing.quad,
        }).start(() => {
          actions.likeJob(job);
        });
        setLimit(true);
      } else {
        Animated.timing(bottom, {
          toValue: 0,
          duration: 200,
          easing: Easing.elastic(2),
        }).start();
      }
    },
  });

  if (limit) return null;

  return (
    <AnimatedCard
      style={{
        paddingBottom: 15,
        borderWidth: 1,
        marginTop: index * 5,
        bottom,
      }}
      {...panResponder.panHandlers}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 15,
        }}
      >
        <Title>{job.company}</Title>
        <Title>{job.relativeTime}</Title>
      </View>
      <Text style={{ padding: 15 }}>{job.snipet}</Text>
    </AnimatedCard>
  );
};

export default connect(null, actions)(RenderCard);
