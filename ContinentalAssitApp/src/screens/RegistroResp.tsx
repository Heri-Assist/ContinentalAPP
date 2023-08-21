import React from 'react'
import { ScrollView, Text, View, Image, TextInput } from 'react-native';
import { Style } from '../theme/registro';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { TitleComponent } from '../components/TitleComponent';

const { t } = useTranslation();

export const RegistroResp = () => {
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
            123456789
          </Text>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='tag' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.categoria')}
            </Text>

            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
          <View style={Style.columnas}>
            <Icon name='list' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.plan')}
            </Text>
            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='plane' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.origen')}
            </Text>
            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
          <View style={Style.columnas}>
            <Icon name='globe' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.destino')}
            </Text>
            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
        </View>
        <View style={Style.formContainer}>
          <View style={Style.columnas}>
            <Icon name='calendar' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.fechaSalida')}
            </Text>
            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
          <View style={Style.columnas}>
            <Icon name='calendar' size={20} style={Style.containerIconos}></Icon>
            <Text style={Style.textoIcons}>
                {t('registro.fechaRetorno')}
            </Text>
            <Text style={Style.textIconBold}>Cualquiera</Text>
          </View>
        </View>
      </Animatable.View>         
      <TitleComponent titulo={t('registro.titulares')} />
    </ScrollView>
  )
}

