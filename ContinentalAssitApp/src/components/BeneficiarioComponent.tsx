import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  { Beneficiario }  from '../interfaces/usuarioRegistro';
import { Style } from '../theme/componentCSS';
import { useTranslation } from 'react-i18next';

interface TarjetaBeneficiarioProps {
  beneficiario: Beneficiario;
}

const TarjetaBeneficiario: React.FC<TarjetaBeneficiarioProps> = ({ beneficiario }) => {

  const { t } = useTranslation();

  return (
    <View style={Style.cardContainer}>
      <View style={Style.row}>
        <Icon name="user" size={40} style={Style.icon}></Icon>
        <View style={Style.textContainer}>
          <Text style={Style.title}>{t('registro.nombreApellido')}</Text>
          <Text style={Style.content}>{beneficiario.nombre} {beneficiario.apellido}</Text>
        </View>
      </View>

      <View style={Style.row}>
        <Icon name="envelope" size={30} style={Style.icon}></Icon>
        <View style={Style.textContainer}>
          <Text style={Style.title}>{t('registro.correo')}</Text>
          <Text style={Style.content}>{beneficiario.email}</Text>
        </View>
      </View>

      <View style={Style.row}>
        <Icon name="phone" size={40} style={Style.icon}></Icon>
        <View style={Style.textContainer}>
          <Text style={Style.title}>{t('registro.telefono')}</Text>
          <Text style={Style.content}>{beneficiario.telefono}</Text>
        </View>
        <Icon name="calendar" size={35} style={Style.icon}></Icon>
        <View style={Style.textContainer}>
          <Text style={Style.title}>{t('registro.fechaNacimiento')}</Text>
          <Text style={Style.content}>{beneficiario.nacimiento}</Text>
        </View>
      </View>
    </View>
  );
};

 
export default TarjetaBeneficiario;