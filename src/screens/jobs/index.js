import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Card, Button, Title, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import * as actions from '../../actions/index';
import Swipe from '../../components/swipe';

function Jobs(props) {
  const navigation = useNavigation();

  const renderCard = (job, index) => (
    <Card
      style={{
        paddingBottom: 15,
        borderWidth: 1,
        marginTop: index * 7,
      }}
    >
      <Card.Title title={`${job.job} ${index} `} />
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
    </Card>
  );

  const renderNoMoreCards = () => {
    <Card
      style={{
        paddingBottom: 15,
        borderWidth: 1,
      }}
    >
      <Card.Title title="No more jobs" />
      <Button
        onPress={navigation.navigate('Map')}
        icon="my-location"
        style={{ backgroundColor: '#03A9F4' }}
      >
        <Title>Back to map large</Title>
      </Button>
    </Card>;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Swipe
        data={props.jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeUp={(job) => props.likeJob(job)}
      />
    </View>
  );
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(Jobs);
