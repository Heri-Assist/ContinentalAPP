import React, { useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps <any, any> { } 

export const IntroScreen = ({navigation} : Props) => {

	useEffect(() => {
		SplashScreen.hide();
		setTimeout(() => {
			navigation.replace('Inicio');
		}, 100);
	}, []);
  return (
	
		<></>
  );
};

