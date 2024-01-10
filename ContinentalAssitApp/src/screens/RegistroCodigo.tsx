import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, Alert, Image } from 'react-native';
import { Style } from '../theme/registroCSS'
import { Controller, useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/authContext';
import { UsuarioRegistro, CodigoRegistro, Usuario } from '../interfaces/usuarioRegistro';
import continentalApi from '../api/continentalApi';
import LoadingCompoment from '../components/LoadingComponent';
import { InicioBackgroundComponent } from '../components/InicioBackgroundComponent';

 
interface PropsStack extends StackScreenProps <any, any> { } 


export const RegistroCodigo = ({navigation} : PropsStack) => {

  const { errorMessage, removeError, usuarioRegistro, formData } = useContext(AuthContext);
  const { t } = useTranslation();
  const { idUsuario, login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  
  const [dataForm, setDataForm] = useState(formData as UsuarioRegistro);

  // console.log('dataForm', dataForm)

  const IDUsuario = idUsuario;

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro Incorrecto' ,errorMessage, [
            { text: 'Ok', onPress:removeError }
        ]);
    // console.log('idUsuario====>', idUsuario);
  }, [errorMessage, idUsuario]);

  const { control, handleSubmit, formState: {errors} } = useForm<UsuarioRegistro>({});


  const onValidarCodigo = async (data: UsuarioRegistro) => {
      const headers = {
        'Content-Type': 'application/json',
        'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
      };

      try {
        const dataRespuesta = {
            ps: 'www.continentalassist.com',
            id_usuario: IDUsuario,
            "codigo_registro": data.codigo
        };
        setIsLoading(true);
        const enviarCodigo = await continentalApi.post(
            '/app_validar_codigo_registro',
            dataRespuesta,
            { headers }
        );
        
        if(enviarCodigo.data.error === false){
          await login(dataForm as UsuarioRegistro)
          setIsLoading(false);
          
          navigation.replace('Dashboard') 
         
        }else{
          setIsLoading(false);
          Alert.alert('Codigo Incorrecto', enviarCodigo.data.resultado[0].mensaje_error, [
            { text: 'Ok', onPress: () => console.log('Cancel Pressed')},
          ]);
        }

    } catch (error) {
      // Manejo de errores
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
  };

  const onReenviarValidarCodigo = async () => {
    try {
      const dataRespuesta = {
        ps: 'www.continentalassist.com',
        id_usuario: idUsuario,
      }
      const enviarCodigo = await continentalApi.post('/app_enviar_codigo_registro', dataRespuesta, { headers })
      
    
    }
    catch (error) {
     
    }
  } 

  return (
    <InicioBackgroundComponent>
      <View style={Style.containerCenter}>
        {isLoading && <LoadingCompoment />}
        <View>
          <Image
              source={require('../../assets/imagenes/logo.png')}
              style={Style.imgFondo}
            />
        </View>

        <View style={{marginVertical:30, paddingHorizontal:20}}>
          <Text style={Style.texto}>
              {t('registroCodigo.texto1', {correo: dataForm.email})}
          </Text>
        </View>
        <View style={Style.formContainer}>
            <View style={Style.columnas}>
              <Text style={Style.label}>{t('registroCodigo.codigo')}</Text>
              <Controller
                control={control}
                name="codigo"
                defaultValue=""
                rules={{
                  required: t('registroCodigo.errorRequerido'),
                  pattern: {
                    value: /^[0-9]*$/,
                    message: t('registroCodigo.errorNumerico'),
                  },
                  minLength: {
                    value: 5,
                    message: t('registroCodigo.errorMinimo'),
                  }
                }}
                render={({field}) => (
                  <TextInput
                    placeholder={t('registroCodigo.ingreseCodigo')}
                    placeholderTextColor="#00184C"
                    underlineColorAndroid="white"
                    style={Style.input}
                    keyboardType="numeric"
                    selectionColor="white"
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit(onValidarCodigo)}
                    editable={true}
                    maxLength={5}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.codigo && (
                  <Text style={Style.errorText}>{errors.codigo.message}</Text>
              )}
            </View>
        </View>
        <View style={Style.formContainer} >
          <TouchableOpacity
            activeOpacity={0.8}
            style={Style.buttonContinuar }
            onPress={handleSubmit(onValidarCodigo)}>
            <Text style={Style.textButton}>{t('registroCodigo.validarCodigo')}</Text>
          </TouchableOpacity>  
        </View>
        <View style={Style.formContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Style.buttonCancelar }
            onPress={() => onReenviarValidarCodigo()}>
            <Text style={Style.textButton}>{t('registroCodigo.volverAEnviar')}</Text>
          </TouchableOpacity>  
        </View>
      </View>
    </InicioBackgroundComponent>
  )
}
	