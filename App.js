import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider } from "react-redux";

import store from "./src/store";
import Welcome from "./src/screens/welcome/welcome";
import Login from "./src/screens/login/login";

const Stack = createStackNavigator()
const Bottom = createMaterialBottomTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  )
}