import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MiCuentaScreen } from '../screens/MiCuentaScreen';
import { MiPlanScreen } from '../screens/MiPlanScreen';
import { EmergenciaScreen } from '../screens/EmergenciaScreen';
import { ReembolsosScreen } from '../screens/ReembolsosScreen';
import { ExtrasScreen } from '../screens/ExtrasScreen';
import { Image, Platform } from 'react-native';
import { LoginScreen } from '../screens/LoginScreen';
import { InicioScreen } from '../screens/InicioScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



//  TabBottons Ios Menu Inferior Ios o Android
export const TabNavigator = () => {
  return Platform.OS === 'ios' 
                ? <NavigationTabMenuInferior /> 
                : <NavigationTabMemuInferiorAndroid />; 
}


// Crear barra de navegacion inferior para ios y android

//  TabBottons Android Menu Inferior ANDROID
const TabButtonAndroid = createMaterialBottomTabNavigator();

//  TabBottons Android Menu Inferior ANDROID
const NavigationTabMemuInferiorAndroid = () => {
  return (
    <TabButtonAndroid.Navigator initialRouteName={'LoginScreen'}
  
    barStyle={{ 
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
    }}
    screenOptions={ ({route}) => ({
        tabBarIcon: ({ focused, color  }) => {
          let imageSource: number = 0;
          switch (route.name) {
            case 'MiCuenta':
              imageSource = require('../../assets/iconos/icon-12.png');
              break;
            case 'MiPlan':
              imageSource = require('../../assets/iconos/icon-09.png');
              break;
            case 'Emergencia':
              imageSource = require('../../assets/iconos/icon-15.png');
              break;
            case 'Reembolsos':
              imageSource = require('../../assets/iconos/icon-18.png');
              break;
            case 'Extras':
              imageSource = require('../../assets/iconos/icon-21.png');
              break;
          } 
          return <Image  source={ imageSource } style={{ width: 35, height: 35 }} />;
        }
    })}
     
    >
      <TabButtonAndroid.Screen name="Login" options={{title: 'Login'}} component={InicioScreen} />
      {/* <TabButtonAndroid.Screen name="MiCuenta" options={{title: 'Mi Cuenta'}} component={MiCuentaScreen} /> */}
      <TabButtonAndroid.Screen name="MiPlan" options={{title: 'Mi Plan'}} component={MiPlanScreen} />
      <TabButtonAndroid.Screen name="Emergencia" options={{title:'Emergencia'}} component={EmergenciaScreen} />
      <TabButtonAndroid.Screen name="Reembolsos" options={{title:'Reembolsos'}} component={ReembolsosScreen} />
      <TabButtonAndroid.Screen name="Extras" options={{title:'Extras'}} component={ExtrasScreen} />
    </TabButtonAndroid.Navigator>
  );
}

//  TabBottons Ios Menu Inferior Ios
const TabBottonIos = createBottomTabNavigator();
const NavigationTabMenuInferior = () => {

  return (
    <TabBottonIos.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={ ({route}) => ({
          tabBarStyle: {
            backgroundColor: 'white',
            borderWidth: 1,
            elevation:0,
            borderTopWidth: 1,
            borderRightWidth:1,
            height: 100,
          },
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ focused, color, size,  }) => {
            let imageSource: number = 0;
            switch (route.name) {
              case 'MiCuenta':
                imageSource = require('../../assets/iconos/icon-12.png');
                break;
              case 'MiPlan':
                imageSource = require('../../assets/iconos/icon-09.png');
                break;
              case 'Emergencia':
                imageSource = require('../../assets/iconos/icon-15.png');
                break;
              case 'Reembolsos':
                imageSource = require('../../assets/iconos/icon-18.png');
                break;
              case 'Extras':
                imageSource = require('../../assets/iconos/icon-21.png');
                break;
            } 
            return <Image  source={ imageSource } style={{ width: 40, height: 40 }} />;
          }
      })}
    > 
      <TabButtonAndroid.Screen name="Login" options={{title: 'Login'}} component={InicioScreen} />
      {/* <TabBottonIos.Screen name="MiPlan" options={{title: 'Mi Plan'}} component={MiPlanScreen} /> */}
      <TabBottonIos.Screen name="MiCuenta" options={{title: 'Mi Cuenta'}} component={MiCuentaScreen} />
      <TabBottonIos.Screen name="Emergencia" options={{title:'Emergencia'}} component={EmergenciaScreen} />
      <TabBottonIos.Screen name="Reembolsos" options={{title:'Reembolsos'}} component={ReembolsosScreen} />
      <TabBottonIos.Screen name="Extras" options={{title:'Extras'}} component={ExtrasScreen} />
    </TabBottonIos.Navigator>
  );
};
