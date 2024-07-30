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
			'EVA-AUTH-USER': 'eyJpdiI6Ino1dXRFVjh0UE1zMnJlWUdlL0x0Ync9PSIsInZhbHVlIjoiY3d0RVhOcVRnMGlsSE9ZTW43QXhUMWNIMk1XMURhSEdkY3FtMVN5ZHg0cz0iLCJtYWMiOiJhOTRhZDIxMDczYmE0ZDk1ZTAzZDQzYjgzZTdkYjkwODg5N2Y4NDRiYWM4N2I0NTJiODE0MDAyNWZiZjg5YmI2IiwidGFnIjoiIn0=',
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
								<Text style={{ color:'#00184C'}}>{ telefono.pais }</Text>
						</View>
						<View style={Style.column}>
								<Text style={{textAlign:'right', color:'#00184C'}}>{telefono.numero}</Text>
						</View>
				</View>
			))}
		</View>
	)
}