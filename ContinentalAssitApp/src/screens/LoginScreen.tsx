import React, {useState} from 'react';
import {InicioBackgroundComponent} from '../components/InicioBackgroundComponent';
import {View, Text, TextInput, TouchableOpacity, Platform, Button, Keyboard} from 'react-native';
import DatePicker from 'react-native-date-picker'
import {useForm, Controller} from 'react-hook-form';
import {Style} from '../theme/themeStyle';
import {StackScreenProps} from '@react-navigation/stack';
import {usePhone} from '../hooks/usePhone';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { consultarRegistro } from '../api/apis';

interface Props extends StackScreenProps<any, any> {}


type FormData = {
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  phoneNumber: string;
};

export const LoginScreen = ({navigation}: Props) => {
  
  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);


  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fechaNacimiento: new Date(), // Establece la fecha de nacimiento inicial como una fecha
    },
  });

 
  const onLogin = async (data: FormData) => {
    try {
      const { nombre, fechaNacimiento, email } = data;
      const formattedDate = fechaNacimiento.toLocaleDateString();

      const datosUsuario = {
        ps: 'www.continentalassist.com',
        nombre,
        nacimiento: formattedDate,
        email,
      };

      const response = await consultarRegistro(datosUsuario);
      console.log('Respuesta del registro:', response);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };


  return (
    <>
      <InicioBackgroundComponent>
      
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
        
          <View style={Style.container2}>
            {/* Campo Nombre */}
            <View style={Style.formContainer}>
              {/* Campo Nombre */}
              <View style={Style.columnas}>
                <Text style={Style.label}>Nombre Y Apellido</Text>
                <Controller
                  control={control}
                  name="nombre"
                  defaultValue=""
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
              </View>
              {/* Campo Fecha de Nacimiento */}
              <View style={Style.columnas}>
                <Text style={Style.label}>Fecha Nacimiento</Text>
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
                  onConfirm={(newDate) => {
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
                <Text style={Style.label}>Correo electrónico</Text>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
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
              </View>
            </View>
            {/* campo Numero de Tel con el codigo y la bandera  */}
            <View style={Style.formContainer}>
              <View style={Style.columnas}>
                <Text style={Style.label}>Número de Teléfono</Text>
                {usePhone({control})}
              </View>
            </View> 
            {/* texto  */}
            <View style={Style.formContainer}>
              <View style={Style.columnas}>    
                <Text style={Style.textSuave}>
                Al presionar el botón 'Continuar', confirmas que entiendes
                y aceptas <Text style={Style.textBold}>las condiciones de uso de Continental Assist</Text>, así como las políticas de privacidad y cookies.
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
                  <Text style={Style.textButton}>Continual</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
              
      </InicioBackgroundComponent>
    </>
  );
};
