import React, { ReactNode } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Style } from '../theme/themeStyle';

const image = require('../../assets/imagenes/bg-01.jpg');

interface InicioBackgroundComponentProps {
  children: ReactNode;
}

export const InicioBackgroundComponent = ({ children }: InicioBackgroundComponentProps ) => {
  return (

    <ImageBackground source={image || null }  style={Style.container}>
      <KeyboardAvoidingView
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      {children}
     </KeyboardAvoidingView>
    </ImageBackground>
  )
}
