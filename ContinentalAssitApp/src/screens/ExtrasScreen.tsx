import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { PreguntasFrecuentesComponent } from '../components/PreguntasFrecuentesComponent'; // Asegúrate de importar el componente
import continentalApi from '../api/continentalApi';
import { AuthContext } from '../context/authContext';
import { t } from 'i18next';
import { ConsultasPreguntasFrecuentes } from '../interfaces/consultaPreguntasFrecuentes';
import { InicioBackgroundComponent } from '../components/InicioBackgroundComponent';
import { Style } from '../theme/dashboardCSS';
import { TitleComponent } from '../components/TitleComponent';
import { StackScreenProps } from '@react-navigation/stack';



const obtenerPreguntasFrecuentesDesdeAPI = async () => {
    
    // const {idioma} = useContext(AuthContext);   

    const headers = {
        'Content-Type': 'application/json',
        'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
    }

    const dataPreguntas = {
        ps: 'www.continentalassist.com',
        idioma: 'spa'
    }

    try{
        const response = await continentalApi.post('/app_consulta_preguntas_frecuentes', dataPreguntas, { headers});
        const data = response.data;

        return data;
    }catch(error){
        console.log(error);
    }
    
   
};

interface Props extends StackScreenProps<any, any> {}

export const ExtrasScreen = ({navigation}: Props) => {
  const [preguntasFrecuentes, setPreguntasFrecuentes] = useState([]); // Inicializa el estado con un arreglo vacío
  const image = require('../../assets/imagenes/bg-01.jpg');
  useEffect(() => {
    // Cuando el componente se monta, obtén las preguntas frecuentes desde el API
    obtenerPreguntasFrecuentesDesdeAPI().then((data) => {
      // Actualiza el estado con las preguntas frecuentes obtenidas
      setPreguntasFrecuentes(data.resultado);
    });
  }, []);

  return (
        <ImageBackground source={image || null }>
             <ScrollView>

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('CondicionesGeneralesScreen')}
                            style={{paddingVertical:20, paddingHorizontal:10}} >
                                <View style={Style.listRow}>
                                    <View>
                                        <Image
                                            source={require('../../assets/iconos/icon-08.png')}
                                            style={Style.imgList}
                                        />
                                    </View>
                                    <View style={Style.textContainer}>
                                        <Text style={Style.titleBoldList} >{t('extras.condicionesGenerales')} </Text>
                                    </View>
                                    
                                </View>
                                
                            </TouchableOpacity>

                <View style={Style.acordionContainer2}>
                     <View style={Style.TitleContainer}>
                        <Text style={Style.textoTitle}>Preguntas Frecuentes</Text>
                    </View>
                    <View style={{ width:'100%'}}>
                        <PreguntasFrecuentesComponent preguntasFrecuentes={preguntasFrecuentes} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
       
    // </InicioBackgroundComponent>
  );
};