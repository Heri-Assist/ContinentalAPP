/**
 * @description This component renders the registration screen for a user's beneficiaries.
 * @param navigation - StackScreenProps navigation object.
 * @returns JSX element that displays the registration screen for a user's beneficiaries.
 */
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Style } from '../theme/registroCSS';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { TitleComponent } from '../components/TitleComponent';
import BeneficiarioComponent from '../components/BeneficiarioComponent';
import { Beneficiario, UsuarioRegistro, CodigoRegistro } from '../interfaces/usuarioRegistro';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';
import LoadingCompoment from '../components/LoadingComponent';
import continentalApi from '../api/continentalApi';
import { use } from 'i18next';
import { useForm } from 'react-hook-form';
import { is } from 'date-fns/locale';



interface Props extends StackScreenProps <any, any> { } 

export const RegistroResp = ({navigation} : Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const { idUsuario, updateIdUsuario, usuarioRegistro, formData } = useContext(AuthContext);
  const beneficiarios: Beneficiario[] = usuarioRegistro?.beneficiarios || [];
  const { control, handleSubmit } = useForm<UsuarioRegistro>()

  const { t } = useTranslation();

  
  const data = formData as UsuarioRegistro;
 
  
  const onContinuar = async () => {
    // Obtener los datos del formulario del estado global
  
    // console.log('ladata', data.email);

    Alert.alert('Registro Correcto', t('registroCodigo.texto1',{ correo: data.email }), [
      { text: 'si', onPress: () => SiEnviarCodigo() },
      { text: 'no', onPress: () => navigation.replace('Inicio')}

    ]);

  }

  const headers = {
    'Content-Type': 'application/json',
    'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
  };


  const enviarCodigo = async (id_usuario: CodigoRegistro) => {
    // console.log('id_usuario', id_usuario);
    try {
      const dataRespuesta = {
        ps: data.ps,
        id_usuario: id_usuario,
      }
      const enviarCodigo = await continentalApi.post('/app_enviar_codigo_registro', dataRespuesta, { headers })
      // console.log('enviarCodigo', enviarCodigo.data);
      navigation.navigate('Codigo')
    }
    catch (error) {
      setIsLoading(false); // Desactivar el indicador de carga en caso de error
    }
  }

  const SiEnviarCodigo = async () => {
    try {
        setIsLoading(true); // Activar el indicador de carga

        const dataConfirmar= {
          ps: data.ps,
          nombre: data.nombre,
          nacimiento: data.nacimiento,
          email: data.email,
          pais_name: data.pais_name,
          pais_flag:data.pais_flag,
          pais_callingCode: data.pais_callingCode,
          localCelular: data.telefono,
          id_emision: data.idEmision
        }

        // console.log('dataConfirmar', dataConfirmar);
        
        const resp = await continentalApi.post('/app_confirmar_registro_usuario', dataConfirmar, { headers });
        const id_usuario = resp.data.resultado.id_usuario;
        // console.log('id_usuario', id_usuario);
        updateIdUsuario(id_usuario); 
        await enviarCodigo(id_usuario);

        setIsLoading(false); // Desactivar el indicador de carga
    } catch (error) {
        console.log('error', error);
        setIsLoading(false); // Desactivar el indicador de carga en caso de error
    }
  };


  return (
    <ScrollView style={ Style.scrollView}>
    
      
      <Animatable.View animation="fadeInDown" duration={1200} style={Style.container}>
        <Image 
          source={require('../../assets/imagenes/logo.png')}
          style={ Style.imgLogoRespuesta }
        />
      </Animatable.View >
      
      <Animatable.View animation="fadeInUp" duration={1200} style={Style.container}>
       
        <Text style={Style.texto}>
          {t('registro.hemosEncontrado')}
        </Text>
        <View style={Style.fondoVaucher}>
          <Text style={Style.texto}>
            {t('registro.numeroVoucher')}
          </Text>
          <Text style={Style.contenVauche}>
           {usuarioRegistro?.codigo}
          </Text>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='tag' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.categoria')}
            </Text>

            <Text style={Style.textIconBold}>{usuarioRegistro?.categoria}</Text>
          </View>
          <View style={Style.columnas}>
            <Icon name='list' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.plan')}
            </Text>
            <Text style={Style.textIconBold}>{usuarioRegistro?.plan}</Text>
          </View>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='plane' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.origen')}
            </Text>
            <Text style={Style.textIconBold}>{usuarioRegistro?.origen}</Text>
          </View>
          <View style={Style.columnas}>
            <Icon name='globe' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.destino')}
            </Text>
            <Text style={Style.textIconBold}>{usuarioRegistro?.destino}</Text>
          </View>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='calendar' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.fechaSalida')}
            </Text>
            <Text style={Style.textIconBold}>{usuarioRegistro?.salida}</Text>
          </View>
          <View style={Style.columnas}>
              <Icon name='calendar' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.fechaRetorno')}
            </Text>
            <Text style={Style.textIconBold}>{usuarioRegistro?.retorno}</Text>
          </View>
        </View>
      </Animatable.View>
           
      <TitleComponent titulo={t('registro.titulares')} />
      
      <Animatable.View animation="fadeInUp" duration={1200} style={{paddingHorizontal:10}}>
        {/* Renderizar las tarjetas de beneficiarios */}
        {beneficiarios.map((beneficiario, index) => (
          <BeneficiarioComponent key={index} beneficiario={beneficiario} />
        ))}

        <TouchableOpacity 
            style={Style.buttonContinuar}
            onPress={handleSubmit(onContinuar)} 
          >
          <Text style={Style.textButton}>
            Confirmar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={Style.buttonCancelar}
          onPress={() => navigation.replace('Registro')}
        >
          <Text style={Style.textButton}>
            Cancelar
          </Text>
        </TouchableOpacity>
        
      </Animatable.View>
      <View style={Style.containerCenter2}>
            {isLoading && <LoadingCompoment />} 
        </View>
    </ScrollView>
  )
}

