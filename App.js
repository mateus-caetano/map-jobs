import React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';

import store from './src/store';
import Welcome from './src/screens/welcome/welcome';
import Login from './src/screens/login/login';
import Map from './src/screens/map/map';
import Jobs from './src/screens/jobs/index';

const Stack = createStackNavigator();
const Bottom = createMaterialBottomTabNavigator();

const MapScreen = () => (
  <Bottom.Navigator>
    <Bottom.Screen
      name="MapJobs"
      component={Map}
      options={{ tabBarIcon: 'map' }}
    />
    <Bottom.Screen
      name="Jobs"
      component={Jobs}
      options={{ tabBarIcon: 'briefcase' }}
    />
  </Bottom.Navigator>
);

export default function App() {
  const [token, setToken] = React.useState();
  const [initial, setInitial] = React.useState();

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('fb_token');
    const initial = token ? 'Map' : 'Welcome';
    setToken(token);
    setInitial(initial);
  };

  React.useEffect(() => {
    loadToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {initial && (
          <Stack.Navigator headerMode="none" initialRouteName={initial}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
