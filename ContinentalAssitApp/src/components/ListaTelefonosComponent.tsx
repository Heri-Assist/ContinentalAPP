import React, { useContext, useEffect, useState } from 'react'
import continentalApi from '../api/continentalApi'
import { AuthContext } from '../context/authContext';
import { ListaTelefonos, Telefonos } from '../interfaces/listaTelefonos';
import { Style } from '../theme/componentCSS';
import { Text, View } from 'react-native';


export const ListaTelefonosComponent = () => {

	useEffect(() => {
		consultarTelefonos();
	}, [])

	const { idioma } = useContext(AuthContext);
	const [listaTelefonos, setListaTelefonos] = useState({} as ListaTelefonos);

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
			await setListaTelefonos(resp.data);
			// console.log('Lista Telefonos', resp.data.resultado)	

		}catch(error){
			console.log(error)
		}
	}

	return (
		<View>
			{ listaTelefonos.resultado?.map((telefono:Telefonos, index:number) => (
				<View style={Style.rowEmergencia} key={index}>
						<View style={Style.column}>
								<Text>{ telefono.pais }</Text>
						</View>
						<View style={Style.column}>
								<Text style={{textAlign:'right'}}>{telefono.numero}</Text>
						</View>
				</View>
			))}
		</View>
	)
}
