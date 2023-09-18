import { StyleSheet } from "react-native";
import { it } from '@jest/globals';


const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";
const AZUL_CLARO_COLOR = "#69C8EF";

export const Style = StyleSheet.create({
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
	textContainer: {
		flex: 1,
	},
	titleBoldList: {
		fontSize: 16,
		fontWeight: 'bold',
		color:BACKGROUND_COLOR
	},
	acordionContainer2:{
		flex: 1,
		paddingHorizontal: 20,
	},
	TitleContainer: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 15 ,
		backgroundColor: SECONDARY_COLOR,
		alignContent: 'center',
		marginVertical: 20,
		borderRadius: 10,
	},

	textoTitle:{
		fontSize: 20,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
		justifyContent: 'center',
	},
	infoContent:{
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 5,
		backgroundColor: BACKGROUND_COLOR,
		marginBottom:10
	},

	textContainerPreguntas: {
		flex: 1,
	},
	respuestaText: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
		paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
		color: PRIMARY_COLOR,
  },
})