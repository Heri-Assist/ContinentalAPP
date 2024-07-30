import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { PreguntasFrecuentesComponent } from '../components/PreguntasFrecuentesComponent'; // Asegúrate de importar el componente
import continentalApi from '../api/continentalApi';
import { AuthContext } from '../context/authContext';
import { t } from 'i18next';
import { ConsultasPreguntasFrecuentes } from '../interfaces/consultaPreguntasFrecuentes';
import { InicioBackgroundComponent } from '../components/InicioBackgroundComponent';
import { Style } from '../theme/extraCSS';
import { TitleComponent } from '../components/TitleComponent';
import { StackScreenProps } from '@react-navigation/stack';



const obtenerPreguntasFrecuentesDesdeAPI = async () => {
    
    // const {idioma} = useContext(AuthContext);   

    const headers = {
        'Content-Type': 'application/json',
        'EVA-AUTH-USER': 'eyJpdiI6Ino1dXRFVjh0UE1zMnJlWUdlL0x0Ync9PSIsInZhbHVlIjoiY3d0RVhOcVRnMGlsSE9ZTW43QXhUMWNIMk1XMURhSEdkY3FtMVN5ZHg0cz0iLCJtYWMiOiJhOTRhZDIxMDczYmE0ZDk1ZTAzZDQzYjgzZTdkYjkwODg5N2Y4NDRiYWM4N2I0NTJiODE0MDAyNWZiZjg5YmI2IiwidGFnIjoiIn0=',
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
             <View style={Style.acordionContainer2}>
                <View style={Style.TitleContainer}>
                    <Text style={Style.textoTitle}>{t("extras.normativas")}</Text>
                </View>
            </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('CondicionesGeneralesScreen')}
                    style={{paddingVertical:8, paddingHorizontal:20}} >
                        <View style={Style.listRow}>
                            <View>
                                <Image
                                    source={require('../../assets/iconos/ContinentalAssist-App-Icono-Documentos.png')}
                                    style={Style.imgList}
                                />
                            </View>
                            <View style={Style.textContainer}>
                                <Text style={Style.titleBoldList} >{t('extras.condicionesGenerales')} </Text>
                            </View>
                            
                        </View>                            
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Politicas')}
                    style={{paddingVertical:5, paddingHorizontal:20}} >
                        <View style={Style.listRow}>
                            <View>
                                <Image
                                    source={require('../../assets/iconos/ContinentalAssist-App-Icono-Documentos.png')}
                                    style={Style.imgList}
                                />
                            </View>
                            <View style={Style.textContainer}>
                                <Text style={Style.titleBoldList} >{t('extras.politicas')} </Text>
                            </View>
                            
                        </View>                            
                </TouchableOpacity>

                <View style={Style.acordionContainer2}>
                     <View style={Style.TitleContainer}>
                        <Text style={Style.textoTitle}>{t('extras.faqs')}</Text>
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