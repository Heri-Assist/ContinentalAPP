import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Style } from '../theme/componentCSS';

const LoadingCompoment = () => {
  return (
	<View style={Style.loading}>
		<View>
			<ActivityIndicator size="large" color="#00184C" />
		</View>
	</View>
  );
};


export default LoadingCompoment;