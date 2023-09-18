import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PreguntasFrecuentes } from '../interfaces/consultaPreguntasFrecuentes';
import { Style } from '../theme/extraCSS';
import { InicioBackgroundComponent } from './InicioBackgroundComponent';



interface PreguntasFrecuentesComponentProps {
  preguntasFrecuentes: PreguntasFrecuentes[];
}

export const PreguntasFrecuentesComponent: React.FC<PreguntasFrecuentesComponentProps> = ({ preguntasFrecuentes }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpansion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (

			<View>
				{preguntasFrecuentes.map((pregunta, index) => (
					<View key={index}>
						<TouchableOpacity onPress={() => toggleExpansion(index)}>
							<View style={Style.listRow}>
									<View>
											<Image
													source={require('../../assets/iconos/icon-08.png')}
													style={Style.imgList}
											/>
									</View>
									<View style={Style.textContainerPreguntas}>
											<Text style={Style.titleBoldList} >{pregunta.pregunta} </Text>
									</View>
									<View>
											{expandedIndex === index ? (
													<Icon name="arrow-up" size={18} color="white" />
											) : (
													<Icon name="arrow-down" size={18} color="white" />
											)}
									</View> 
							</View>
						
						</TouchableOpacity>

						{expandedIndex === index && ( 
							<View style={Style.infoContent}>			
								 <Text style={Style.respuestaText}>{pregunta.respuesta}</Text>
							</View>
						)}
					</View>
				))}
			</View>
	
  );
};


