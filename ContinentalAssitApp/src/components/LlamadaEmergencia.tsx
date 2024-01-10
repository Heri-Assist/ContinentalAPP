import React, { useContext, useEffect, useState } from 'react'
import continentalApi from '../api/continentalApi'
import { AuthContext } from '../context/authContext';
import { ListaTelefonos, Telefonos } from '../interfaces/listaTelefonos';
import { Style } from '../theme/componentCSS';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';



export const LlamadaEmergencia = () => {

	useEffect(() => {
		consultarTelefonos();
	}, [])

	const { idioma, session } = useContext(AuthContext);
	const [listaTelefonos, setListaTelefonos] = useState({} as Telefonos[]);

	const dataSession = JSON.parse(session as string);

	//  console.log('sessionPais', dataSession.resultado.usuario.telefonos[0].pais_callingCode )

	const consultarTelefonos = async() => {
		
		const headers = {
			'Content-Type': 'application/json',
			'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
		}
		const datosRegistro = {
			ps: 'www.continentalassist.com',
			idioma: idioma === 'es' ? 'spa' : 'eng'
		}
		try{

			const resp = await continentalApi.post<ListaTelefonos>('/app_consulta_telefonos', datosRegistro, { headers });	
			const paisFind = resp.data.resultado.filter((pais) => pais.pais === dataSession.resultado.usuario.telefonos[0].pais_name);
			// console.log('paisFind', paisFind)
			await setListaTelefonos(paisFind);
			// console.log('Lista Telefonos', resp.data.resultado)	

		}catch(error){
			console.log(error)
		}


	}

	const handleCallPress = () => {
		// Utiliza Linking para realizar la llamada telefónica
		const numeroClear = listaTelefonos[0]?.numero.replace(/-/g, '');
		Linking.openURL(`tel:${numeroClear}`);
	};
  
	return (
		<View>
			<Card style={Style.card}>
				<View style={Style.cardContent}>
					<Text style={Style.pais}>{listaTelefonos[0]?.pais}</Text>
					<TouchableOpacity onPress={handleCallPress} style={Style.cardContainerColor}>
						
						<Text style={Style.numero}>
							{/* <Text style={{alignContent:'center'}}>
								<Icon name="phone" size={20} color="#00184C"/> 
							</Text> */}
							<Text style={{color: '#00184C'}} >
								{listaTelefonos[0]?.numero}
							</Text>
						</Text>
					</TouchableOpacity>
				</View>
    	</Card>
		</View>
	)
}
