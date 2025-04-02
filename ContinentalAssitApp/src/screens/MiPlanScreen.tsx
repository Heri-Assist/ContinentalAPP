import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Style } from '../theme/MiPlanCSS';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardSliderComponent from '../components/CardSliderComponent';
import { Beneficiario, UsuarioRegistro } from '../interfaces/usuarioRegistro';
import { AuthContext } from '../context/authContext';
import Swiper from 'react-native-swiper';
import { ListBeneficiosComponent } from '../components/ListBeneficiosComponent';
import continentalApi from '../api/continentalApi';
import { BeneficiosRespuesta } from '../interfaces/Beneficios';

export const MiPlanScreen = () => {
  const { t } = useTranslation();
  const { usuarioRegistro, idioma, session } = useContext(AuthContext);
  const parseBeneficiarios = JSON.parse(session || '{}');
  const beneficiarios: Beneficiario[] = parseBeneficiarios.resultado.beneficiarios || [];
  const [beneficiosRespuesta, setBeneficioRespuesta] = useState(
    {} as BeneficiosRespuesta,
  );

  useEffect(() => {
    if (usuarioRegistro?.codigo === undefined) {
      return;
    }
    console.log('Ejecutando useEffect en MiPlanScreen');

    const consultarBeneficios = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'EVA-AUTH-USER':
          'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=',
      };

      const datosRegistro: UsuarioRegistro = {
        ps: 'www.continentalassist.com',
        codigo_voucher: usuarioRegistro?.codigo,
        limite_beneficios: 100,
        idioma: idioma === 'es' ? 'spa' : 'eng',
      };

      console.log('Consultando beneficios con datos:', datosRegistro);
      try {
        const resp = await continentalApi.post<BeneficiosRespuesta>(
          '/app_consulta_beneficios_voucher',
          datosRegistro,
          { headers },
        );
        setBeneficioRespuesta(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    consultarBeneficios();
  }, [usuarioRegistro?.codigo, idioma]);

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/imagenes/bg-01.jpg')}>
        <View style={Style.container4}>
          <View style={[Style.column, Style.separador]}>
            <Text style={Style.text}>{t('miPlan.numeroVoucher')}</Text>
            <Text style={Style.textBoldAzul}>{usuarioRegistro?.codigo} </Text>
          </View>
          <View style={[Style.column, Style.marginEspacio]}>
            <Text style={Style.text}>{t('miPlan.categoria')}</Text>
            <Text style={[Style.textBold]}>{usuarioRegistro?.categoria} </Text>
          </View>
        </View>

        <View style={Style.containerCalendar}>
          <Icon name="calendar" size={20} style={Style.icon} />
          <View style={Style.textContainer}>
            <Text style={Style.title}>{t('miPlan.fechaInicio')}</Text>
            <Text style={Style.content}>{usuarioRegistro?.salida}</Text>
          </View>
          <Icon name="calendar" size={20} style={Style.icon} />
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
          <Swiper containerStyle={Style.slider} height={300}>
            {beneficiarios && beneficiarios.length > 0 ? (
              beneficiarios.map((beneficiario, index) => (
                <CardSliderComponent key={index} beneficiario={beneficiario} />
              ))
            ) : (
              <Text>No hay beneficiarios disponibles.</Text>
            )}
          </Swiper>
        </View>

        <View style={{ paddingHorizontal: 15, flex: 3 }}>
          {beneficiosRespuesta.resultado ? (
            <ListBeneficiosComponent
              beneficiosRespuesta={beneficiosRespuesta}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
