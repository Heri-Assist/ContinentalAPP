import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {Style} from '../theme/themeStyle';
import { StackScreenProps } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/authContext';
import { useTranslation } from 'react-i18next';




interface Props extends StackScreenProps <any, any> { } 

export const InicioScreen = ( {navigation} : Props ) => {
  
  const { t } = useTranslation();
  const { session, isGeolocation, idioma, logout } = useContext(AuthContext);

  // console.log('idioma', idioma);

  useEffect(() => {
    if (isGeolocation?.location) {
      const { latitude, longitude } = isGeolocation.location;
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else if (isGeolocation?.error) {
      console.error('Error de geolocalización:', isGeolocation.error);
    }
   
  }, [isGeolocation]);

  const cerrarSession = async () => {
    console.log('cerrar session');
    await logout(); 
  }   

  useEffect(() => {
    detectarInternet(); // Llamar a la función detectarInternet al iniciar la pantalla
  }, []);


  // funcion para dectart si tenemos internet o no
    const detectarInternet = async () => {
      const stateInternet = await NetInfo.fetch();
      if (stateInternet.isConnected === true) {
        console.log('conectado');
      } else {
        Alert.alert('La conexión a Internet ha fallado, algunas funciones podrían no estar disponibles')
      }
    };

  return (
    //  Componenete Background y del logo inicio
    <InicioBackgroundComponent >

      <Animatable.View animation="fadeInDown" duration={1200}>
        <Image
          source={require('../../assets/imagenes/logo.png')}
          style={ Style.imgFondo }
        />
      </Animatable.View >
      {/* Texto de bienvenida */}
      <Animatable.View animation="fadeInUp" duration={1200}>
        <View>
          <View style={Style.containerCenter}>
            <Text style={Style.textInicio}>
              {t('intro.bienvenida')}
              <Text style={Style.textInicioSuave}>
                {t('intro.bienvenida2')}
              </Text>
            </Text>
          </View>
          <View style={Style.container}>
            {/* Boton De crear una nueva cuenta  */}
            {
              session === null ?  (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={Style.buttonRegistro}
                    onPress={() => navigation.replace('Registro')}>
                  <Text style={Style.textButton}>{t('intro.boton_ingresar')}</Text>
                </TouchableOpacity>
              )
              :
              (  
                <>   
                  <TouchableOpacity
                      activeOpacity={0.8}
                      style={Style.buttonInicio}
                      onPress={() => navigation.navigate('Inicio')}>
                    <Text style={Style.textButton}>{t('intro.boton_inicio')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                        activeOpacity={0.8}
                        style={Style.buttonCerrar}
                        onPress={() => cerrarSession()} >
                    <Text style={Style.textButton}>{t('intro.boton_cerrar')}</Text>
                  </TouchableOpacity>
                </>
              )
            } 
          </View>
        </View>
        
      </Animatable.View>
      
    </InicioBackgroundComponent>
  );
};


