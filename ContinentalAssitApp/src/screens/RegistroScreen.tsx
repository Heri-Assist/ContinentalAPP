/**
 * @file RegistroScreen.tsx
 * @description Este archivo contiene el componente RegistroScreen, que es responsable de mostrar la pantalla de inicio de sesión de ContinentalAssitApp.
 * El componente incluye un formulario con campos para nombre, fecha de nacimiento, correo electrónico y número de teléfono. También incluye un componente DatePicker para seleccionar la fecha de nacimiento.
 * Los datos del formulario se envían al servidor mediante la función consultarRegistro del módulo ../api/apis.
 * @requiere React, useState, InicioBackgroundComponent, View, Text, TextInput, TouchableOpacity, Platform, Button, Keyboard, DatePicker, useForm, Controller, Style, StackScreenProps, usePhone, consultarRegistro, format
 * Pantalla de inicio de sesión de @exports
 */
// Imports de dependencias
import React, {useContext, useState, useEffect} from 'react';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {View, Text, TextInput, TouchableOpacity, Platform, Keyboard, Image, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
import {Style} from '../theme/registroCSS';
import {StackScreenProps} from '@react-navigation/stack';
import {usePhone} from '../hooks/usePhone';
import {UsuarioRegistro} from '../interfaces/usuarioRegistro';
import {AuthContext} from '../context/authContext';
import {useTranslation } from 'react-i18next';
import LoadingComponent from '../components/LoadingComponent';
import { ICountry } from 'react-native-international-phone-number';


interface Props extends StackScreenProps<any, any> {}

export const RegistroScreen = ({navigation}: Props) => {

  const { signUp, errorMessage, removeError, usuarioRegistro, idioma } = useContext(AuthContext);
  // Inicializa selectedCountry con valores vacíos o los valores adecuados
  const { t } = useTranslation();


  useEffect(() => {
    if (errorMessage.length === 0) return;
      Alert.alert('Registro Incorrecto', errorMessage, [
        { text: 'Ok', onPress: removeError },
      ]);
  
  }, [errorMessage]);
  
  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<UsuarioRegistro>({
    defaultValues: {
      nacimiento: new Date(), // Establece la fecha de nacimiento inicial como una fecha
    },
  });
  

  // ...
  const onRegistro = async (data: UsuarioRegistro) => {
    Keyboard.dismiss();
   
      setIsLoading(true); // Activar el indicador de carga

      data.pais_callingCode = selectedCountryData.pais_callingCode;
      data.pais_flag = selectedCountryData.pais_flag;
      data.pais_name = selectedCountryData.pais_name;
      try {
        await signUp(data);
        setIsLoading(false); // Desactivar el indicador de carga después de obtener la respuesta
       
          navigation.navigate('Respuesta')
          // Navegar si no hay errores
      
        } catch (error) {
          setIsLoading(false); // Desactivar el indicador de carga en caso de error
        }
  };

  const [selectedCountryData, setSelectedCountryData] = useState<{
    pais_callingCode: string;
    pais_flag: string;
    pais_name: string;
  }>({
    pais_callingCode: '',
    pais_flag: '',
    pais_name: '',
  });

  const handleCountryChange = (country: ICountry) => {
    // Aquí puedes hacer lo que necesites con el país seleccionado
    setSelectedCountryData({
      pais_callingCode: country.callingCode || '',
      pais_flag: country.flag || '',
      pais_name: country.name || '',
    });
  };

  return (
    <>
      {/* pantalla de Formulario de registro  */}
      <InicioBackgroundComponent>
        {/* Indicador de carga */}
        {isLoading && <LoadingComponent />}
        <Image
          source={require('../../assets/imagenes/logo.png')}
          style={Style.imgFondo}
        />
        {/* Boton de navegación Inicio */}
        <View
          style={
            Platform.OS === 'ios' ? Style.regresarIOS : Style.regresarAndroid
          }>
            
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Dashboard')}>
            <Text style={Style.buttonRegresar}>Regresar</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.container}>
          {/* Campo Nombre */}
          <View style={Style.formContainer}>
            {/* Campo Nombre */}
            <View style={Style.columnas}>
              <Text style={Style.label}>{t('registro.nombreApellido')}</Text>
              <Controller
                control={control}
                name="nombre"
                defaultValue=""
                rules={{
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres',
                  },
                }}
                render={({field}) => (
                  <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#00184C"
                    underlineColorAndroid="white"
                    style={Style.input}
                    selectionColor="white"
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit(onRegistro)}
                    editable={true}
                  />
                )}
              />
              {errors.nombre && (
                <Text style={Style.errorText}>{errors.nombre.message}</Text>
              )}
            </View>
            {/* Campo Fecha de Nacimiento */}
            <View style={Style.columnas}>
              <Text style={Style.label}>{t('registro.fechaNacimiento')}</Text>
              <TouchableOpacity
                style={Style.input}
                onPress={() => setOpen(true)}
                disabled={open} // Deshabilita el botón cuando el DatePicker está abierto
              >
                <Text>{fechaNacimiento.toDateString()}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={fechaNacimiento}
                onConfirm={newDate => {
                  setOpen(false);
                  setFechaNacimiento(newDate);
                  setValue('nacimiento', newDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
          {/* Campo Email */}
          <View style={Style.formContainer}>
            <View style={Style.columnas}>
              <Text style={Style.label}>{t('registro.correo')}</Text>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Dirección de correo electrónico no válida',
                  },
                }}
                render={({field}) => (
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#00184C"
                    underlineColorAndroid="white"
                    style={Style.input}
                    selectionColor="white"
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit(onRegistro)}
                    editable={true}
                  />
                )}
              />
              {errors.email && (
                  <Text style={Style.errorText}>{errors.email.message}</Text>
              )}
            </View>
          </View>
          {/* campo Numero de Tel con el codigo y la bandera  */}
          <View style={Style.formContainer}>
            <View style={Style.columnas}>
              <Text style={Style.label}>{t('registro.telefono')}</Text>
              {usePhone({ control, defaultValue: '', onCountryChange: handleCountryChange })}
            </View>
          </View>
          {/* texto  */}
          <View style={Style.formContainer}>
            <View style={Style.columnas}>
              <Text style={Style.textSuave}>
                {t('registro.texto1')}
                <Text style={Style.textBold}>
                {t('registro.texto2')}
                </Text>
                {t('registro.texto3')}
              </Text>
            </View>
          </View>
          {/* Boton Continuar */}
          <View style={Style.formContainer}>
            <View style={Style.columnas}>
              <TouchableOpacity
                style={Style.buttonContinuar}
                activeOpacity={0.8}
                onPress={handleSubmit(onRegistro)}
                disabled={isLoading} // Deshabilita el botón cuando el indicador de carga está activo
              >
                <Text style={Style.textButton}>{t('registro.botonContinuar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
            
        </View>
      </InicioBackgroundComponent>
    </>
  );
};
