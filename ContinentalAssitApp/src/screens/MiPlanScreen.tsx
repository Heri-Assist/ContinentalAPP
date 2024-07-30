/**
 * @component MiPlanScreen
 * Pantalla que muestra la información del plan del usuario, incluyendo su número de bono, categoría, fechas de viaje, detalles del plan y beneficiarios.
 * También busca y muestra una lista de beneficios asociados con el plan del usuario.
 * @returns Un componente React Native ScrollView que contiene la información del plan del usuario y una lista de beneficios.
 */
/**
 * @component MiPlanScreen
 * Pantalla que muestra la información del plan del usuario, incluyendo su número de bono, categoría, fechas de viaje, detalles del plan y beneficiarios.
 * También busca y muestra una lista de beneficios asociados con el plan del usuario.
 * @returns Un componente React Native ScrollView que contiene la información del plan del usuario y una lista de beneficios.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { Style } from '../theme/MiPlanCSS';
import {useTranslation } from 'react-i18next'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import  CardSliderComponent  from '../components/CardSliderComponent';
import { Beneficiario, UsuarioRegistro } from '../interfaces/usuarioRegistro';
import { AuthContext } from '../context/authContext';
import Swiper from 'react-native-swiper';
import { InicioBackgroundComponent } from '../components/InicioBackgroundComponent';
import { ListBeneficiosComponent } from '../components/ListBeneficiosComponent';
import continentalApi from '../api/continentalApi';
import { BeneficiosRespuesta } from '../interfaces/Beneficios';



const { t } = useTranslation();

export const MiPlanScreen = () => {
    const {  usuarioRegistro, idioma, usuarioLogin } = useContext(AuthContext);
    const beneficiarios: Beneficiario[] = usuarioRegistro?.beneficiarios || [];
    const [beneficiosRespuesta, setBeneficioRespuesta] = useState({} as BeneficiosRespuesta);
    
    // console.log('beneficiosRespuesta',beneficiosRespuesta)

    useEffect(() => {
        // console.log('usuarioRegistro====>',usuarioRegistro)
        if (usuarioRegistro?.codigo === undefined) {
            return;
        }
        console.log("Ejecutando useEffect en MiPlanScreen");
        const fetchBeneficios = async () => {
            try {
                const response = await consultarBeneficios();
                // Almacena los datos en el estado como un array
                setBeneficioRespuesta(response);
            } catch (error) {
                // Manejar errores de la petición
                console.log(error);
            }
        };
    
        fetchBeneficios();
    }, []);

    const consultarBeneficios = async() => {
        const headers = {
            'Content-Type': 'application/json',
            'EVA-AUTH-USER': 'eyJpdiI6Ino1dXRFVjh0UE1zMnJlWUdlL0x0Ync9PSIsInZhbHVlIjoiY3d0RVhOcVRnMGlsSE9ZTW43QXhUMWNIMk1XMURhSEdkY3FtMVN5ZHg0cz0iLCJtYWMiOiJhOTRhZDIxMDczYmE0ZDk1ZTAzZDQzYjgzZTdkYjkwODg5N2Y4NDRiYWM4N2I0NTJiODE0MDAyNWZiZjg5YmI2IiwidGFnIjoiIn0=',
        };

        idioma === 'es' ? 'spa' : 'eng';
        
        const datosRegistro: UsuarioRegistro = {
            ps: 'www.continentalassist.com',
            codigo_voucher: usuarioRegistro?.codigo,
            limite_beneficios: 100,
            idioma:  idioma === 'es' ? 'spa' : 'eng'
        };

        const resp = await continentalApi.post<BeneficiosRespuesta>('/app_consulta_beneficios_voucher',  datosRegistro, { headers });
        // console.log('Beneficios',resp.data)

        return resp.data;
    }

    return (
        
        <ScrollView>
            <ImageBackground
                source={require('../../assets/imagenes/bg-01.jpg')}
            >
                <View style={Style.container4}> 
                    <View style={[Style.column, Style.separador]}>
                        <Text style={Style.text}>{t('miPlan.numeroVoucher')}
                        </Text>
                        <Text style={Style.textBoldAzul}>{usuarioRegistro?.codigo} </Text>              
                    </View>
                    <View style={[Style.column, Style.marginEspacio]}>
                        <Text style={Style.text}>{t('miPlan.categoria')}</Text>
                        <Text style={[Style.textBold, ]}>{usuarioRegistro?.categoria} </Text>
                    </View> 
                </View>
        
                <View style={Style.containerCalendar}>
                    <Icon name="calendar" size={20} style={Style.icon}></Icon>
                    <View style={Style.textContainer}>
                        <Text style={Style.title}>{t('miPlan.fechaInicio')}</Text>
                        <Text style={Style.content}>{usuarioRegistro?.salida}</Text>
                    </View>
                    <Icon name="calendar" size={20} style={Style.icon}></Icon>
                    <View style={Style.textContainer}>
                        <Text style={Style.title}>{t('miPlan.fechaRegreso')}</Text>
                        <Text style={Style.content}>{usuarioRegistro?.retorno}</Text>
                    </View>
                </View>
                <View style={Style.container}>
                    <View style={Style.column1}>
                        <View style={Style.container2}>
                            <View style={Style.column}>
                                <Image source={require('../../assets/iconos/icon-02.png')} />  
                            </View>
                            <View style={Style.column}>
                                <Text style={Style.textBold2}>{t('miPlan.plan')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Style.column2}>
                        <Text style={Style.textBold2}>{usuarioRegistro?.plan}</Text>
                    </View>
                </View>
                <View style={Style.container3}>
                    <Swiper  containerStyle={Style.slider} height={300}>
                        {beneficiarios.map((beneficiario, index) => (
                            <CardSliderComponent key={index} beneficiario={beneficiario} />
                        ))}
                    </Swiper>
                </View>
                            
                <View style={{paddingHorizontal:15, flex: 3}}>
                    {
                        beneficiosRespuesta.resultado? ( 
                            <ListBeneficiosComponent beneficiosRespuesta= { beneficiosRespuesta }  /> 
                        ) : ( <ActivityIndicator />)
                    }
                </View>     
            </ImageBackground>

         </ScrollView>
        
    );
};

