import React from 'react';
import { View, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';

import Card from './Card';

export default function Swipe({ data = [] }) {
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
        justifyContent: 'center',
      }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {data.map((item, index) => (
        <View
          key={index.toString()}
          style={{
            position: 'absolute',
            marginHorizontal: 30,
          }}
        >
          <Card job={item} index={index} />
        </View>
      ))}
      <View
        style={{
          position: 'absolute',
          top: 0,
          backgroundColor: 'green',
          borderRadius: 5,
          padding: 5,
          paddingHorizontal: 15,
          marginLeft: 0,
        }}
      >
        <Title style={{ color: '#fff' }}>Swipe up to like a job</Title>
      </View>
    </View>
  );
}
