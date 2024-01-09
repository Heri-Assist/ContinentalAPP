import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, Alert, Linking } from 'react-native';
import { InicioBackgroundComponent } from '../components/InicioBackgroundComponent';
import { Style } from '../theme/dashboardCSS';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { ListaTelefonosComponent } from '../components/ListaTelefonosComponent';
import { AuthContext } from '../context/authContext';
import { Modal, Portal, PaperProvider, Button } from 'react-native-paper';
import { firebaseContext } from '../context/firebaseContext';
import RNPickerSelect from 'react-native-picker-select';
import { ChatMotivo, MotivoChat } from '../interfaces/motivoChatInterface';
import { StackScreenProps } from '@react-navigation/stack';
import { LlamadaEmergencia } from '../components/LlamadaEmergencia';


interface Props extends StackScreenProps<any, any> {}
// Pantalla de emergencia que muestra los datos de contacto de la empresa
export const EmergenciaScreen = ({navigation}: Props) => {
    const urls = '../../assets/iconos/ContinentalAssist-App-Icono-Chat-01.png'
    const { idioma } = useContext(AuthContext);
    const { t } = useTranslation();
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);
    const [isExpanded4, setIsExpanded4] = useState(false);
    const [visible, setVisible] = React.useState(false);
    
    const showModal =  () =>{ 
        setVisible(true) 
    };



    const getMotivosChat = async () => {
       await motivosChat()
    }
    const hideModal = () => setVisible(false);
    const [selectedMotivo, setSelectedMotivo] = useState(null);

    // Obtiene los motivos de chat al cargar la pantalla
    const { motivosChatData, motivosChat, entrarChat } = useContext(firebaseContext);
    useEffect(() => {
        getMotivosChat();
    }, []);

    
    // Abre el enlace de correo electrónico
    const openEmailLink = async (email: string) => {
        try {
          await Linking.openURL(`mailto:${email}`);
        } catch (error) {
          console.error('Error al abrir el enlace de correo electrónico:', error);
        }
    };

   
    // despliega el contenido de cada item  de la lista
    /**
     * Toggles the expansion of a section based on its index.
     * @param index - The index of the section to toggle.
     */
    const toggleExpansion = (index: number) => {
        switch (index) {
        case 1:
            setIsExpanded1(!isExpanded1);
            break;
        case 2:
            setIsExpanded2(!isExpanded2);
            break;
        case 3:
            setIsExpanded3(!isExpanded3);
            break;
        case 4:
            setIsExpanded4(!isExpanded4);
            break;
        default:
            break;
        }
    };

    const getEntrarChat = async () => {
       await entrarChat(selectedMotivo!)
        navigation.navigate('Chat')
    }

    // Renderiza la pantalla de emergencia
    return (
        <PaperProvider>
            <InicioBackgroundComponent>
                <ScrollView>
                    <View style={Style.acordionContainer}>
                        <View>
                            <View  style={Style.containerText}>
                                <Text style={Style.textEmergenciaInit}>
                                    {t('emergencia.paraComunicarte')}
                                </Text> 
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => toggleExpansion(1)}>
                                <View style={Style.listRow}>
                                    <View>
                                        <Image
                                            source={require('../../assets/iconos/ContinentalAssist-App-Icono-Chat-01.png')}
                                            style={Style.imgList}
                                        />
                                    </View>
                                    <View style={Style.textContainer}>
                                        <Text style={Style.titleBoldList} >{t('emergencia.chatEmergencia')} </Text>
                                    </View>
                                    <View>
                                        {isExpanded1 ? (
                                            <Icon name="arrow-up" size={18} color="white" />
                                        ) : (
                                            <Icon name="arrow-down" size={18} color="white" />
                                        )}
                                    </View>
                                </View>
                                {isExpanded1 && (
                                    <View style={Style.infoContent}>
                                        <TouchableOpacity style={Style.btnChat} 
                                                onPress={showModal}>
                                            <Text style={Style.btnTextChat}>
                                                {t('emergencia.inciarChat')} 
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>

                            {/* Repite el mismo patrón para los otros elementos */}
                            <TouchableOpacity onPress={() => toggleExpansion(2)}>
                            <View style={Style.listRow}>
                                    <View>
                                        <Image
                                            source={require('../../assets/iconos/ContinentalAssist-App-Icono-Telefono-01.png')}
                                            style={Style.imgList}
                                        />
                                    </View>
                                    <View style={Style.textContainer}>
                                        <Text style={Style.titleBoldList} >{t('emergencia.telefonoEmergencia')}</Text>
                                    </View>
                                    <View>
                                        {isExpanded2 ? (
                                            <Icon name="arrow-up" size={18} color="white" />
                                        ) : (
                                            <Icon name="arrow-down" size={18} color="white" />
                                        )}
                                    </View>
                                </View>
                                {isExpanded2 && (
                                    <View style={Style.infoContent}>
                                     <LlamadaEmergencia />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => toggleExpansion(3)}>
                            <View style={Style.listRow}>
                                    <View>
                                        <Image
                                            source={require('../../assets/iconos/ContinentalAssist-App-Icono-Documentos.png')}
                                            style={Style.imgList}
                                        />
                                    </View>
                                    <View style={Style.textContainer}>
                                        <Text style={Style.titleBoldList}>{t('emergencia.listadoTelefonos')}</Text>
                                    </View>
                                    <View>
                                        {isExpanded3 ? (
                                            <Icon name="arrow-up" size={18} color="white" />
                                        ) : (
                                            <Icon name="arrow-down" size={18} color="white" />
                                        )}
                                    </View>
                                </View>
                                {isExpanded3 && (
                                    <View style={Style.infoContent}>
                                        <ListaTelefonosComponent/>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => toggleExpansion(4)}>
                            <View style={Style.listRow}>
                                    <View>
                                        <Image
                                            source={require('../../assets/iconos/ContinentalAssist-App-Icono-Mail-01.png')}
                                            style={Style.imgList}
                                        />
                                    </View>
                                    <View style={Style.textContainer}>
                                        <Text style={Style.titleBoldList}> {t('emergencia.correoEmergencia')} </Text>
                                    </View>
                                    <View>
                                        {isExpanded4 ? (
                                            <Icon name="arrow-up" size={18} color="white" />
                                        ) : (
                                            <Icon name="arrow-down" size={18} color="white" />
                                        )}
                                    </View>
                                </View>
                                {isExpanded4 && (
                                    <View style={Style.infoContent}>
                                    {
                                            (   idioma == 'en') ?
                                                <TouchableOpacity onPress={() => openEmailLink('emergency@continentalassist.com')}>
                                                    <Text style={Style.text2}>Email: emergency@continentalassist.com</Text>
                                                </TouchableOpacity>
                                            :
                                                <TouchableOpacity onPress={() => openEmailLink('emergencia@continentalassist.com')}>
                                                    <Text style={Style.text2}>Email: emergencia@continentalassist.com</Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={Style.modaContainer}>
                        
                            <View style={Style.modelContainer2 }>
                                <View style={{ alignItems:'center'}}>
                                    <Text style={Style.text}>Selecciona un motivo:</Text>
                                    <View style={Style.pickerContainer}>
                                        {idioma == 'en' ? (
                                                <RNPickerSelect
                                                    pickerProps={{ style: { backgroundColor:'#ffffff' } }}
                                                    placeholder={{ label: 'Select a reason', value: null }}
                                                    onValueChange={(value) => {
                                                    // Realiza acciones según el motivo seleccionado
                                                    console.log('Motivo seleccionado:', value);
                                                    // hideModal(); // Cierra el modal después de la selección
                                                    }}
                                                    items={motivosChatData?.map((motivo: ChatMotivo) => ({
                                                            label: motivo?.nombre_motivo_ingles,
                                                            value: motivo?.id_motivo_chat,
                                                        })) || []
                                                    }
                                                />
                                            ): 
                                            (   <RNPickerSelect
                                                    pickerProps={{ style: { backgroundColor:'#ffffff', color:'#00184C' } }}
                                                    placeholder={{ label: 'Seleccione un motivo', value: null }}
                                                    onValueChange={(value) => {
                                                    // Realiza acciones según el motivo seleccionado
                                                        setSelectedMotivo(value);
                                                    }}
                                                    items={motivosChatData?.map((motivo: ChatMotivo) => ({
                                                            label: motivo?.nombre_motivo,
                                                            value: motivo?.id_motivo_chat,
                                                        })) || []
                                                    }
                                                />
                                            ) 
                                        }
                                    </View>
                                </View>

                                <View style={Style.containerBotton}>
                                    <TouchableOpacity   style={ Style.botonAgregar } onPress={getEntrarChat}>
                                        <Text style={Style.textBotonAgregar} >
                                            {t('chat.entrarChat')} 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>   
                        
                        </Modal>
                    </Portal>   
                </ScrollView>
            </InicioBackgroundComponent>
        </PaperProvider>
    );
};