import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigation/Navigation';
import { NavigatorDashboard } from './src/navigation/NavigationStack';


const App = () => {
  return (
    <NavigationContainer>
        <NavigatorDashboard />
    </NavigationContainer>
  );
};

export default App;
