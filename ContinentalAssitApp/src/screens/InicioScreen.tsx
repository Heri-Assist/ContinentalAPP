import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {Style} from '../theme/themeStyle';
import { StackScreenProps } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/authContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ca } from 'date-fns/locale';


interface Props extends StackScreenProps <any, any> { } 

export const InicioScreen = ( {navigation} : Props ) => {
  
  const { t } = useTranslation();
  const { session, isGeolocation, idioma, logout, login } = useContext(AuthContext);
  const [obtenerSession, setLoadSession] = useState(null || session);

  
  
  useEffect(() => {
    if (isGeolocation?.location) {
      const { latitude, longitude } = isGeolocation.location;
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else if (isGeolocation?.error) {
      console.error('Error de geolocalización:', isGeolocation.error);
    }
   
  }, [isGeolocation]);
  
  useEffect(() => {
    loadSession(); // Llamar a la función detectarInternet al iniciar la pantalla
    detectarInternet();
    obtenerSession
  }, [obtenerSession]);
  
  
  // funcion para cargar la session
  const loadSession = async () => {
    try {
      const session = await AsyncStorage.getItem('session');

        // console.log('session', session);
        setLoadSession(session);
    }catch (error) {
      console.log(error);
    }
  }
  
  // funcion para cerrar session
  const cerrarSession = async () => {
    console.log('cerrar session');
    await logout(); 
    loadSession();
  }   


  // funcion para detectar si tenemos internet o no
  /**
   * Detects the internet connection status and logs a message if connected or shows an alert if disconnected.
   */
  const detectarInternet = async () => {
    const stateInternet = await NetInfo.fetch();
    if (stateInternet.isConnected === true) {
      console.log('conectado');
    } else {
      Alert.alert('La conexión a Internet ha fallado, algunas funciones podrían no estar disponibles')
    }
  };


  // funcion para iniciar session
  const onLogin = async () => {
    await login(); // No es necesario proporcionar un argumento
    navigation.replace('Dashboard');
  };


  // Renderizar la pantalla
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
        <View style={{marginBottom:20}}>
          <View style={Style.containerCenter}>
            <Text style={Style.textInicio}>
              {t('intro.bienvenida')}
              <Text style={Style.textInicioSuave}>
                {t('intro.bienvenida2')}
              </Text>
            </Text>
          </View>
          <View style={Style.containerBtn}>
             
            {/* Boton De crear una nueva cuenta  */}
            {
              obtenerSession === null ?  (
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
                      onPress={() => onLogin()}>
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


