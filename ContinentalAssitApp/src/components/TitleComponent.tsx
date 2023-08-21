import React from 'react';
import { View, Text } from 'react-native';
import { Style } from '../theme/component';

interface TitleComponentProps {
  titulo: string;
}

export const TitleComponent: React.FC<TitleComponentProps> = ({ titulo }) => {
  return (
    <View style={Style.container}>
      <Text style={Style.texto}>{titulo}</Text>
    </View>
  );
};