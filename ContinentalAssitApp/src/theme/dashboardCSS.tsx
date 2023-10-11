import { StyleSheet } from "react-native";
import { it } from '@jest/globals';

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";
const AZUL_CLARO_COLOR = "#69C8EF";

export const Style = StyleSheet.create({

	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		//paddingHorizontal: 10,
	},
	container4: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	modelContainer2: {
		justifyContent: 'center',
		paddingHorizontal: 10,
	},

	container3: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
	},

	container2: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	
	acordionContainer:{
		flex:1,
	},

	column: {
		flex: 1,		
	},
	text: {
		fontSize: 16,
		marginTop: 10,
		color: PRIMARY_COLOR,
	},
	textBold: {
		fontSize: 16,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	textBold2: {
		fontSize: 20,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	textBoldAzul: {
		fontSize: 20,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: AZUL_CLARO_COLOR,
	},
	textVahuche: {
		fontSize: 16,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},

	textoIcons:{
		fontSize: 14,
		textAlign: 'center',
		color: PRIMARY_COLOR,
		marginBottom: 5,
	},
	
	textIconBold:{
		fontSize: 16,
		textAlign: 'center',
		color: PRIMARY_COLOR,
		fontWeight: 'bold',
	},
	containerIconos: {
		color: BORDER_COLOR,
		textAlign: 'center',
		marginBottom: 10,
	},
	icon: {
		marginRight: 10,
		marginLeft: 10,
		color: PRIMARY_COLOR,
		paddingVertical: 10,
	},
	textContainer: {
		flex: 1,
	},

	title: {
		fontSize: 14,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
	},
	content: {
		fontSize: 14,
	},
	column1: {
		flex: 4,
		backgroundColor: AZUL_CLARO_COLOR,
		marginRight: 10,
		justifyContent: 'center',
		items: 'center',
		paddingVertical: 10,
	},
	column2: {
		flex: 6,
		marginLeft: 10,
	},
	img:{
			width: 100,
	},
	text2: {
		fontSize: 16,
		textAlign: 'center',
	},

	slider: {
		marginVertical:20,
		width: '80%',
	},

	//Emergencia
	containerText:{
		paddingHorizontal: 2,
		paddingVertical: 10,
		borderRadius: 5,
		backgroundColor: SECONDARY_COLOR,
		marginVertical: 20,
	},
	infoContent:{
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 5,
		backgroundColor: BACKGROUND_COLOR,
		marginBottom:10
	},

	textEmergenciaInit:{
		fontSize: 18,
		color: PRIMARY_COLOR,
		textAlign: 'center',	

	},	

	listRow:{
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		width: '100%',
		backgroundColor: PRIMARY_COLOR,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginBottom:5
	},

	imgList:{
		width: 30, 
		height: 30, 
		marginRight: 10
	},

	titleBoldList: {
		fontSize: 18,
		fontWeight: 'bold',
		color:BACKGROUND_COLOR
	},

	btnChat:{
		backgroundColor: SECONDARY_COLOR,
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginVertical: 10,
	},
	btnTextChat:{
		fontSize: 18,
		color: PRIMARY_COLOR,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	columnEmergencia: {
		flex: 1,
		paddingHorizontal: 10,		
	},

	modaContainer: {
		backgroundColor: BACKGROUND_COLOR,
		width: '90%',
		textAlign: 'center',
		marginLeft:20,
		padding: 20,
		borderRadius: 10,
	},

	containerBotton:{
		width:'100%', 
		paddingHorizontal:10
	},

	botonAgregar: {		
		backgroundColor: SECONDARY_COLOR,
		padding: 10,
		borderRadius: 30,
		marginVertical: 10,
		alignContent:'center'
	},

	textBotonAgregar: {
		fontSize: 16,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
		textAlign: 'center',
		width: '100%',
	},
	pickerContainer:{
		width: '100%',
    backgroundColor: BACKGROUND_COLOR,
		borderRadius: 5,
		marginTop:10,
		borderWidth: 1,
		borderColor: BORDER_COLOR,
		paddingHorizontal: 10,
		paddingVertical: 10,
		alignContent:'center',
	},

	
});