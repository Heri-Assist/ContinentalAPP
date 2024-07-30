import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import { Card } from '@rneui/themed';
import { Modal, Portal, PaperProvider, Button } from 'react-native-paper';
import { Style } from '../theme/miCuentaCss';
import { useTranslation } from 'react-i18next';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { usePhone} from '../hooks/usePhone';
import { ICountry } from 'react-native-international-phone-number';
import { UsuarioLogin, Telefono, RespuestaTelefonos, TelefonosRespuesta } from '../interfaces/Login';
import { AuthContext } from '../context/authContext';
import LoadingCompoment from '../components/LoadingComponent';
import continentalApi from '../api/continentalApi';



const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<Telefono>({});

const image = require('../../assets/imagenes/logo-avatar-2.jpg');

export const MiCuentaScreen = () => {

    const { t } = useTranslation(); 
    const { usuarioLogin, idioma, usuarioRegistro } = useContext(AuthContext);
    const [telefonos, setTelefonos] = useState<Telefono[]>([]);  
    

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    // actuliza el estado de los teléfonos
    useEffect(() => {
        // console.log('usuarioRegistro====>',usuarioRegistro?.id)
        // console.log("Ejecutando UsuarioLogin en MiCuentaScreen", usuarioLogin);
        if (usuarioLogin) {
          setTelefonos(usuarioLogin.telefonos);
        }
    }, [usuarioLogin]);
    
   
    const headers = {
        'Content-Type': 'application/json',
        'EVA-AUTH-USER': 'eyJpdiI6Ino1dXRFVjh0UE1zMnJlWUdlL0x0Ync9PSIsInZhbHVlIjoiY3d0RVhOcVRnMGlsSE9ZTW43QXhUMWNIMk1XMURhSEdkY3FtMVN5ZHg0cz0iLCJtYWMiOiJhOTRhZDIxMDczYmE0ZDk1ZTAzZDQzYjgzZTdkYjkwODg5N2Y4NDRiYWM4N2I0NTJiODE0MDAyNWZiZjg5YmI2IiwidGFnIjoiIn0=',
    };

    // Alerta para eliminar teléfono
    const AlertEliminar = (telefono:Telefono) => {
        Alert.alert(
          "Eliminar",
          "¿Está seguro de eliminar este teléfono?",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Eliminar", onPress: () => eliminarTelefono(telefono) }
          ]
        );
    }

    // Eliminar teléfono
    const eliminarTelefono = async (telefono: Telefono) => {

        const datosLogin = {
            ps: 'www.continentalassist.com',
            id: telefono.id,
            id_usuario: telefono.id_usuario
        }
        try{
            const resp = await continentalApi.post<Telefono>('/app_eliminar_telefono',  datosLogin, { headers })
            
            if(resp.data){
                Alert.alert('Teléfono eliminado', 'El teléfono se eliminó correctamente', [
                    { text: 'Ok', onPress: () => console.log('ok') }
                ]);
            }
        }catch(error){
            console.log(error)
        }

        const updatedTelefonos = telefonos.filter((t) => t.id !== telefono.id);
        setTelefonos(updatedTelefonos);
    }

    // Agregar teléfono
    const agregarTelefono = async (data:Telefono ) => {

        const { telefono } = data;

        const dataTelefono = {
            ps: 'www.continentalassist.com',
            id_usuario: usuarioLogin?.id_usuario,
            pais_callingCode: selectedCountryData.pais_callingCode,
            pais_flag: selectedCountryData.pais_flag,
            pais_name: selectedCountryData.pais_name,
            telefono
        }
        
        try{
            const resp = await continentalApi.post<TelefonosRespuesta>('/app_insertar_telefono',  dataTelefono, { headers })
            if(resp.data){
              
               const respuestas = resp.data.resultado;
                Alert.alert('Teléfono agregado', 'El teléfono se agregó correctamente', [
                    { text: 'Ok', onPress: () =>{ 
                        hideModal();  
                        setTelefonos(respuestas);
                    } }
                    
                ]);
            }
     
        }catch(error){
            console.log(error)
            Alert.alert('Error', 'No se pudo agregar el teléfono', [
                { text: 'Ok', onPress: () =>{ 
                    hideModal();
                   
                } }
            ]);
        }
    }

    // Actualizar teléfono
    const [selectedCountryData, setSelectedCountryData] = useState<{
        pais_callingCode: string;
        pais_flag: string;
        pais_name: string;
        }>({
        pais_callingCode: '',
        pais_flag: '',
        pais_name: '',
    });
      
      // Actualizar pais bandera 
      const handleCountryChange = (country: ICountry) => {
        // Aquí puedes hacer lo que necesites con el país seleccionado
        setSelectedCountryData({
          pais_callingCode: country.callingCode || '',
          pais_flag: country.flag || '',
          pais_name: idioma === 'es' ? country.name.es : country.name.en || '',
        });
      };

    return (
        <>
            { usuarioLogin ? (
            <PaperProvider>
                <ScrollView> 
                    <View style={Style.imgContainer}>
                        {
                            usuarioLogin.avatar ? 
                                (<Image source={{ uri:usuarioLogin.avatar }} style={Style.imagen}/> ) 
                                :( <Image source={ image } style={Style.imagen}/> )
                        }
                    
                    </View>

                    <Card containerStyle={Style.cardContainer}>
                        <View style={Style.container}>
                            <View style={Style.nombreContainer}>
                                <Text style={Style.textTitulo}>{t('miCuenta.nombreApellido')}</Text>
                                <Text style={Style.texto}>{usuarioLogin?.nombre}</Text>
                            </View>
                            <Card.Divider style={Style.divider} />
                            <View style={Style.nombreContainer}>
                                <Text style={Style.textTitulo}>{t('miCuenta.fechaNacimiento')}</Text>
                                <Text style={Style.texto}>{usuarioLogin?.nacimiento}</Text>
                            </View>
                            <Card.Divider style={Style.divider} />
                            <View style={Style.nombreContainer}>
                                <Text style={Style.textTitulo}>{t('miCuenta.correoElectronico')}</Text>
                                <Text style={Style.texto}>{usuarioLogin?.email}</Text>
                            </View>
                            <Card.Divider style={Style.divider} />
                            <View style={Style.nombreContainer}>
                                <View style={Style.telContainer}>
                                    <View>
                                        <Text style={Style.textTitulo2}>
                                            {t('miCuenta.telefonos')}
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity  onPress={showModal}>
                                            <Text>
                                                <Icon style={Style.icon} name='plus'/> 
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>   
                            </View>
                        
                            {telefonos.map((telefono, index) => (
                            
                                <View  key={index}>
                                    <View  style={Style.telContainer}>
                                        <View>
                                            <Text style={Style.textTitulo}>{telefono.pais_name}</Text>
                                            <Text style={Style.texto}>
                                                {telefono.pais_callingCode} {telefono.telefono}
                                            </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => AlertEliminar(telefono)}>
                                                <Text>
                                                     <Icon style={Style.icon} name='minus'/>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Card.Divider style={Style.divider} />
                                </View>
                            ))}

                            {/* Resto de la información del usuario */}
                        </View>  
                    </Card>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={Style.modaContainer}>
                            {usePhone({ control, defaultValue: '', onCountryChange: handleCountryChange })}
                        
                            <View style={Style.telBotonContainer }>
                                <View style={Style.containerBotton}>
                                    <TouchableOpacity  onPress={handleSubmit(agregarTelefono) } style={ Style.botonAgregar }>
                                        <Text style={Style.textBotonAgregar}>
                                            {t('miCuenta.botonAgregar')} 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Style.containerBotton}>
                                    <TouchableOpacity  onPress={hideModal} style={ Style.botonCancelar }>
                                        <Text style={Style.textBotonCancelar}>
                                            {t('miCuenta.botonCancelar')} 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>   
                        
                        </Modal>
                    </Portal>
                </ScrollView>
            </PaperProvider>
        ): (<LoadingCompoment />) }
        </>           
    );
};

