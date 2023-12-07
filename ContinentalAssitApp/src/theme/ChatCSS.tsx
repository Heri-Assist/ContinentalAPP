import { StyleSheet } from "react-native";


const COLOR_AZUL_OSCURO = "#00184C";
const COLOR_AMARILLO = "#F2DB85";
const COLOR_BLANCO = "#FFFFFF";
const COLOR_GRIS = "#D4D4D4";
const COLOR_AZUL_CLARO = "#69C8EF";

 export const Style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
		paddingHorizontal: 12,
		marginTop:20,
    marginBottom: 10,
    paddingVertical: 10,
  },
  
	messagesContainer: {
		marginVertical:40,
    flexGrow: 1,
    paddingVertical: 15,
		borderWidth: 1,
		borderColor: COLOR_GRIS,
		borderRadius: 15,
    padding:5,
  },
  
	message: {
    paddingHorizontal: 10,
		paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '70%',
		marginRight: 10,
		position: 'relative'
  },
  
	inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR_GRIS,
    backgroundColor: 'white',
		marginTop: 10,
		borderRadius: 20,
  },
  
	input: {
    flex: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  
	sendButton: {
		flex: 3,
    backgroundColor: COLOR_AMARILLO,
    borderBottomRightRadius: 20,
		borderTopRightRadius: 20,
    paddingVertical: 12,
  },
  
	sendButtonText: {
    color: COLOR_AZUL_OSCURO,
		fontWeight: 'bold',
		textAlign: 'center',
  },

	sent: {
    alignSelf: 'flex-end',
  },
  received: {
    alignSelf: 'flex-start',
  },

  attachButton: {
    padding: 10,
    marginHorizontal: 10,
  },

  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },

  receivedMessage: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },

  mensajeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },


});
