import { StyleSheet } from "react-native";
import { te } from 'date-fns/locale';

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";
const AZUL_CLARO_COLOR = "#69C8EF";

export const Style = StyleSheet.create({

  container: {
  flex: 1,
  alignItems: 'center',
	paddingVertical: 15 ,
	backgroundColor: PRIMARY_COLOR,
	alignContent: 'center',
	marginVertical: 20,
	borderRadius: 10,
  },

	texto: {
		fontSize: 24,
		fontWeight: 'bold',
		color: BACKGROUND_COLOR,
		justifyContent: 'center',
	},


	textItem: {
		fontSize: 14,
		color: PRIMARY_COLOR,
		
	},

	textItem2: {
		fontSize: 14,
		color: PRIMARY_COLOR,
		textAlign: 'right',
	},

	cardContainer: {
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 20,
	},

	sliderContainer: {
		backgroundColor: '#fff',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10,
	},


	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},

	row2:{
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		width: '100%',	
	},

	sliderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		paddingHorizontal: 20,
	},

	sliderRowAzul:{
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		backgroundColor:PRIMARY_COLOR,
		color: BACKGROUND_COLOR,
		borderBottomLeftRadius: 20, // Redondea la esquina inferior izquierda
  		borderBottomRightRadius: 20,
	},


	icon: {
		marginRight: 10,
		color: BORDER_COLOR,
	},

	icon2: {
		marginRight: 10,
		color: PRIMARY_COLOR,
	},

	icon3: {
		marginRight: 10,
		color: BACKGROUND_COLOR,
	},

	textContainer: {
		flex: 1,
	},

	title: {
		fontSize: 14,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},

	titleAzul: {
		fontSize: 16,
		fontWeight: 'bold',
		color: AZUL_CLARO_COLOR,
	},

	textBold: {
		fontSize: 14,
		fontWeight: 'bold',
		color:BACKGROUND_COLOR
	},
	titleBoldList: {
		fontSize: 18,
		fontWeight: 'bold',
		color:BACKGROUND_COLOR
	},

	content: {
		fontSize: 13,
	},

	loading: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		zIndex: 9999,
	},	

	listContainer: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
		color: BACKGROUND_COLOR,
		paddingHorizontal: 10,
		width: '100%',
		marginBottom: 4,
		borderRadius: 5,	
	},

	itemContent:{
		backgroundColor: BACKGROUND_COLOR,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: '100%',
		borderBottomWidth: 2,
		borderBottomColor: AZUL_CLARO_COLOR,
	},

	imgList:{
		width: 30, 
		height: 30, 
		marginRight: 10
	},

	column: {
		flex: 7,
	},

	column2: {
		flex: 3,
		alignContent: 'flex-end'
	},	

	rowEmergencia: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: AZUL_CLARO_COLOR,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	// Estilos para el componente de preguntas frecuentes

	preguntaContainer: {
		width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:PRIMARY_COLOR,
		paddingHorizontal: 20,
		paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  preguntaText: {
    fontSize: 16,
    fontWeight: 'bold',
		color: BACKGROUND_COLOR,
  },
  respuestaText: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
		paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
		color: PRIMARY_COLOR,
  },

	infoContent:{
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 5,
		backgroundColor: BACKGROUND_COLOR,
		marginBottom:10
	},


	listRow2:{
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		width: '100%',
		backgroundColor: BACKGROUND_COLOR,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginBottom:5
	},


	listRow:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		width: '100%',
		backgroundColor: PRIMARY_COLOR,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginBottom:5
	},

	textContainerPreguntas: {
		flex: 1,
	},

	card: {
    margin: 10,
    borderRadius: 10,
		backgroundColor: '#fff',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
		
	
  },
  pais: {
    fontSize: 16,
    fontWeight: 'bold',
		marginTop:10
  },
  numero: {
    fontSize: 14,
		fontWeight: 'bold',
    // textAlign: 'right',
  },

	cardContainerColor: {
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 10,
		borderRadius: 10,
		paddingVertical:10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		}

});  