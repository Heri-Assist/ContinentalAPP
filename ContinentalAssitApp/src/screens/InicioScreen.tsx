import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {Style} from '../theme/themeStyle';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps <any, any> { } 

export const InicioScreen = ( {navigation} : Props ) => {
  useEffect(() => {
    console.log('InicioScreen');
  }, []);

  return (
    //  Componenete Background y del logo inicio
    <InicioBackgroundComponent>
      <View style={Style.container}>
        <Text style={Style.textInicio}>
          Te damos la bienvenidad a la asistencia en viaje{' '}
          <Text style={Style.textInicioSuave}>
            que protege los momentos que valen la pena vivir con cobertura
            global
          </Text>
        </Text>
      </View>
      <View style={{marginBottom:80}}>
        {/* Boton De crear una nueva cuenta  */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={Style.buttonRegistro}
          onPress={() => navigation.replace('Registro')}>
          <Text style={Style.textButton}>Registrate</Text>
        </TouchableOpacity>
        {/* Boton de Iniciar sesion */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={Style.buttonInicio}
          onPress={() => navigation.replace('Login')}>
          <Text style={Style.textButton}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </InicioBackgroundComponent>
  );
};
