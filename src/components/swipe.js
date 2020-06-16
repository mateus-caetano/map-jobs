import React from 'react';
import {
  View,
  Animated,
  PanResponder,
  UIManager,
  LayoutAnimation,
  Easing,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;

export default function Swipe(props) {
  const [data, setData] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [bottom] = React.useState(new Animated.Value(0));

  React.useEffect(() => setData(props.data));
  React.useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

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
          props.onSwipeUp(data[index]);
          setIndex(index + 1);
          bottom.setValue(0);
        });
      } else {
        Animated.timing(bottom, {
          toValue: 0,
          duration: 500,
          easing: Easing.elastic(2),
        }).start();
      }
    },
  });

  const renderCards = () =>
    data
      .map((job, i) => {
        if (index >= data.length) return props.renderNoMoreCards();
        else if (i < index) return null;
        else if (i === index) {
          return (
            <Animated.View
              style={{ bottom, position: 'relative' }}
              key={i.toString()}
              {...panResponder.panHandlers}
            >
              {props.renderCard(job, i)}
            </Animated.View>
          );
        }

        return (
          <View style={{ position: 'absolute' }} key={i.toString()}>
            {props.renderCard(job, i)}
          </View>
        );
      })
      .reverse();

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 30 }}>
      {data ? renderCards() : null}
    </View>
  );
}
