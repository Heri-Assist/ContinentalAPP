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
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Style } from '../theme/dashboardCSS';
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
    const {  usuario, idioma } = useContext(AuthContext);
    const beneficiarios: Beneficiario[] = usuario?.beneficiarios || [];
    const [beneficiosRespuesta, setBeneficioRespuesta] = useState({} as BeneficiosRespuesta);


   
    useEffect(() => {
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
            'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
        };

        idioma === 'es' ? 'spa' : 'eng';
        
        const datosRegistro: UsuarioRegistro = {
            ps: 'www.continentalassist.com',
            codigo_voucher: usuario?.codigo,
            limite_beneficios: 100,
            idioma:  idioma === 'es' ? 'spa' : 'eng'
        };

        const resp = await continentalApi.post<BeneficiosRespuesta>('/app_consulta_beneficios_voucher',  datosRegistro, { headers });
        // console.log('Beneficios',resp.data)

        return resp.data;
    }


    return (
        
        <ScrollView>
            <InicioBackgroundComponent>
                <View style={Style.container4}>
                    <View style={Style.column}>
                        <Text style={Style.text}>{t('miPlan.numeroVoucher')}</Text>
                        <Text style={Style.textBoldAzul}>{usuario?.codigo} </Text>
                    </View>
                    <View style={Style.column}>
                        <Text style={Style.text}>{t('miPlan.categoria')}</Text>
                        <Text style={Style.textBold}>{usuario?.categoria} </Text>
                    </View>
                </View>
        
                <View style={Style.container}>
                    <Icon name="calendar" size={35} style={Style.icon}></Icon>
                    <View style={Style.textContainer}>
                        <Text style={Style.title}>{t('miPlan.fechaInicio')}</Text>
                        <Text style={Style.content}>{usuario?.salida}</Text>
                    </View>
                    <Icon name="calendar" size={35} style={Style.icon}></Icon>
                    <View style={Style.textContainer}>
                        <Text style={Style.title}>{t('miPlan.fechaRegreso')}</Text>
                        <Text style={Style.content}>{usuario?.retorno}</Text>
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
                        <Text style={Style.textBold2}>{usuario?.plan}</Text>
                    </View>
                </View>
                <View style={Style.container3}>
                    <Swiper  containerStyle={Style.slider} height={300}>
                        {beneficiarios.map((beneficiario, index) => (
                            <CardSliderComponent key={index} beneficiario={beneficiario} />
                        ))}
                    </Swiper>
                </View>
                            
                <View style={{paddingHorizontal:10, flex: 3}}>
                    {
                        beneficiosRespuesta.resultado? ( 
                            <ListBeneficiosComponent beneficiosRespuesta= { beneficiosRespuesta }  /> 
                        ) : ( <ActivityIndicator />)
                    }
                </View>     
            </InicioBackgroundComponent>

         </ScrollView>
        
    );
};

