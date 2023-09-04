import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style } from '../theme/componentCSS';
import { BeneficiosRespuesta, Beneficios, TiposBeneficio } from '../interfaces/Beneficios';

interface ListBeneficiosProps {
  beneficiosRespuesta: BeneficiosRespuesta;
}

export const ListBeneficiosComponent = ({ beneficiosRespuesta }: ListBeneficiosProps) => {
  const { tipos_beneficios } = beneficiosRespuesta;
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const [beneficiosPorTipo, setBeneficiosPorTipo] = useState<{ [key: string]: Beneficios[] }>({});

  useEffect(() => {
    // Agrupar los beneficios por tipo
    const groupedBeneficios: { [key: string]: Beneficios[] } = {};
    beneficiosRespuesta.resultado.forEach((beneficio) => {
      const tipoBeneficioId = beneficio.id_tipo_beneficio;
      if (!groupedBeneficios[tipoBeneficioId]) {
        groupedBeneficios[tipoBeneficioId] = [];
      }
      groupedBeneficios[tipoBeneficioId].push(beneficio);
    });
    setBeneficiosPorTipo(groupedBeneficios);
  }, [beneficiosRespuesta]);

  const toggleExpansion = (index: number) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const isExpanded = (index: number) => expandedIndices.includes(index);

  const renderHeader = (item: TiposBeneficio, index: number) => {
    return (     
      <View style={Style.listRow}>
        <View>
          <Image 
            source={require('../../assets/iconos/icon-08.png')} 
            style={Style.imgList}
          />
        </View>
        <View style={Style.textContainer}>
          <Text style={Style.titleBoldList}>{item.nombre_tipo_beneficio}</Text>
        </View>
        <View style={{ alignContent: 'flex-end' }}>
          {isExpanded(index) ? (
            <Icon name="chevron-up" size={20} color="white" />
          ) : (
            <Icon name="chevron-down" size={20} color="white" />
          )}
        </View>
      </View>
    );
  };

  const renderContent = (item: TiposBeneficio, index: number) => {
    const beneficiosDelTipo = beneficiosPorTipo[item.id_tipo_beneficio] || [];

    return (
      <View>
        {beneficiosDelTipo.map((beneficio, innerIndex) => (
          <View key={innerIndex}>
            <TouchableOpacity onPress={() => toggleExpansion(index)}>
          <View style={Style.itemContent}>
            <View style={Style.listRow}>
                <View>
                  <Text style={ Style.textItem }>{beneficio.nombre}</Text>
                </View>
                <View style={{alignContent: 'flex-end'}}>
                  <Text style={ Style.textItem }>{ beneficio.valor} </Text>
                </View>
            </View>

          </View>       
        </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      {tipos_beneficios.map((content, index) => (
        <ListItem.Accordion
          icon={{ disabled: false }}
          key={index}
          content={renderHeader(content, index)}
          isExpanded={isExpanded(index)}
          onPress={() => toggleExpansion(index)}
          containerStyle={Style.listContainer}
        >
          {renderContent(content, index)}
        </ListItem.Accordion>
      ))}
    </View>
  );
};
