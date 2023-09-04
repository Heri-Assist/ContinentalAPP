import React from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { Beneficiario } from '../interfaces/usuarioRegistro';
import { Style } from '../theme/componentCSS';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

const { t } = useTranslation();

interface TarjetaBeneficiarioProps {
	beneficiario: Beneficiario;
  }

const CardSliderComponent : React.FC<TarjetaBeneficiarioProps> = ({ beneficiario }) => {
	return (
		<View style={Style.sliderContainer}>


			<View style={Style.sliderRow}>
				<Icon name="file" size={30} style={Style.icon2}></Icon>
				<View style={Style.textContainer}>
					<Text style={Style.title}>{t('miPlan.voucher')}</Text>
					<Text style={Style.content}>{beneficiario.voucherBeneficiario}</Text>
				</View>
			</View>

			<View style={Style.sliderRow}>
				<Icon name="user" size={40} style={Style.icon2}></Icon>
				<View style={Style.textContainer}>
					<Text style={Style.title}>{t('miPlan.nombreBeneficiario')}</Text>
					<Text style={Style.content}>{beneficiario.nombre } {beneficiario.apellido}</Text>
				</View>
			</View>

			

			<View style={Style.sliderRowAzul}>
				<Icon name="calendar" size={35} style={Style.icon3}></Icon>
				<View style={Style.textContainer}>
					<Text style={Style.textBold}>{t('miPlan.nacimientoBeneficiario')}</Text>
					<Text style={Style.textBold}>{beneficiario.nacimiento}</Text>
				</View>
				<Icon name="calendar" size={35} style={Style.icon3}></Icon>
				<View style={Style.textContainer}>
					<Text style={Style.textBold}>{t('miPlan.edad')}</Text>
					<Text style={Style.textBold}>{beneficiario.edad}</Text>
				</View>
      		</View>
		</View>
	)
}

export default CardSliderComponent;