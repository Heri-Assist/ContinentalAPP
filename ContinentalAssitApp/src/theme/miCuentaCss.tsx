import { StyleSheet } from "react-native";
import { it } from '@jest/globals';


const COLOR_AZUL_OSCURO = "#00184C";
const COLOR_AMARILLO = "#F2DB85";
const COLOR_BLANCO = "#FFFFFF";
const COLOR_GRIS = "#D4D4D4";
const COLOR_AZUL_CLARO = "#69C8EF";

export const Style = StyleSheet.create({

	imgContainer: {
		position:'absolute', 
		top:20, 
		left:30, 
		zIndex:999,
		backgroundColor: 'white', // Color de fondo
		shadowColor: 'black', // Color de la sombra
		shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
		shadowOpacity: 0.5, // Opacidad de la sombra
		shadowRadius: 5, // Radio de la sombra
		elevation: 5, // Para Android
		borderRadius: 150, // Borde redondeado
	},
	imagen: {
		width: 140, 
		height: 140, 
		borderRadius: 150, 
		borderWidth: 3, 
		borderColor: COLOR_BLANCO,  
	},
	container: {
		paddingHorizontal:10
	},
	cardContainer: {
		borderRadius: 20, 
		marginTop:90, 
		paddingTop:80,
		marginBottom: 20,
	
	},
	nombreContainer:{
		
	},
	textTitulo: {
		fontSize: 14,
		color: COLOR_AZUL_OSCURO,
	},

	textTitulo2: {
		fontSize: 16,
		color: COLOR_AZUL_OSCURO,
		fontWeight: 'bold',
	},

	texto: {
		fontSize: 14,
		fontWeight: 'bold',
		color: COLOR_AZUL_OSCURO,  
	},

	divider:{
		borderWidth:1,
		borderColor: COLOR_AZUL_CLARO,
		marginVertical: 10,
	},

	telContainer:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom:20
	},

	telBotonContainer:{
		flexDirection: 'row',
		justifyContent: 'center',
	},

	containerBotton:{
		width:'50%', 
		paddingHorizontal:10
	},

	icon:{
		color: COLOR_AZUL_CLARO,
		fontSize: 18,

	},

	// Modal
	modaContainer: {
		backgroundColor: COLOR_BLANCO,
		width: '90%',
		textAlign: 'center',
		marginLeft:20,
		padding: 20,
		borderRadius: 10,
	},

	botonAgregar: {		
		backgroundColor: COLOR_AMARILLO,
		padding: 10,
		borderRadius: 30,
		marginVertical: 10,
		alignContent:'center'
	},
	botonCancelar: {
		width: '100%',
		backgroundColor: COLOR_AZUL_OSCURO,
		padding: 10,
		borderRadius: 30,
		marginVertical: 10,
	},

	textBotonAgregar: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLOR_AZUL_OSCURO,
		textAlign: 'center',
		width: '100%',
	},
	textBotonCancelar: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLOR_BLANCO,
		textAlign: 'center',
	},

})