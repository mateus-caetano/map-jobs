import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Card, Button, Title, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

function LikedJobs(props) {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        marginTop: StatusBar.currentHeight + 15,
        marginHorizontal: 30,
      }}
      showsVerticalScrollIndicator={false}
    >
      {props.likedJobs.map((job, index) => (
        <Card
          style={{
            paddingBottom: 15,
            borderWidth: 1,
            marginBottom: 20,
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
          <Button
            style={{
              marginHorizontal: 30,
              backgroundColor: '#009688',
              marginTop: 10,
              elevation: 10,
            }}
            onPress={() => {}}
            mode="contained"
          >
            <Title style={{ color: '#fff' }}>Apply</Title>
          </Button>
          <Text style={{ padding: 15 }}>{job.snipet}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return { likedJobs: state.like };
}

export default connect(mapStateToProps)(LikedJobs);
