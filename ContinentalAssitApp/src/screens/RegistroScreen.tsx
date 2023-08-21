/**
 * @file RegistroScreen.tsx
 * @description Este archivo contiene el componente RegistroScreen, que es responsable de mostrar la pantalla de inicio de sesión de ContinentalAssitApp.
 * El componente incluye un formulario con campos para nombre, fecha de nacimiento, correo electrónico y número de teléfono. También incluye un componente DatePicker para seleccionar la fecha de nacimiento.
 * Los datos del formulario se envían al servidor mediante la función consultarRegistro del módulo ../api/apis.
 * @requiere React, useState, InicioBackgroundComponent, View, Text, TextInput, TouchableOpacity, Platform, Button, Keyboard, DatePicker, useForm, Controller, Style, StackScreenProps, usePhone, consultarRegistro, format
 * Pantalla de inicio de sesión de @exports
 */
// Imports de dependencias
import React, {useContext, useState} from 'react';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {View, Text, TextInput, TouchableOpacity, Platform, Keyboard, Image, ScrollView, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
import {Style} from '../theme/registro';
import {StackScreenProps} from '@react-navigation/stack';
import {usePhone} from '../hooks/usePhone';
import {UsuarioLogin} from '../interfaces/usuarioRegistro';
import {AuthContext} from '../context/authContext';
import {useTranslation } from 'react-i18next';

interface Props extends StackScreenProps<any, any> {}

export const RegistroScreen = ({navigation}: Props) => {
  const {signUp} = useContext(AuthContext);
  const { t } = useTranslation();
  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<UsuarioLogin>({
    defaultValues: {
      fechaNacimiento: new Date(), // Establece la fecha de nacimiento inicial como una fecha
    },
  });

  // ...
  const onLogin = async (data: UsuarioLogin) => {
    Keyboard.dismiss();
    signUp(data);
  };

  return (
    <>
      {/* pantalla de Formulario de registro  */}
      <InicioBackgroundComponent>
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
                    onSubmitEditing={handleSubmit(onLogin)}
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
                  setValue('fechaNacimiento', newDate);
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
                    onSubmitEditing={handleSubmit(onLogin)}
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
              {usePhone({control})}
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
                onPress={handleSubmit(onLogin)}>
                <Text style={Style.textButton}>{t('registro.botonContinuar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </InicioBackgroundComponent>
    </>
  );
};
