import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { Style } from '../theme/componentCSS';
import { InicioBackgroundComponent } from './InicioBackgroundComponent';

const LoadingCompoment = () => {
  return (
			
				<View style={Style.loading}>
					<ActivityIndicator size="large" color="#00184C" />
				</View>
	
  );
};


export default LoadingCompoment;