
import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";

export const Style = StyleSheet.create({


  scrollView: {
    flex: 1,
    paddingHorizontal: 10,

  },

  containerCenter2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 999,
  },

  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },
  
  container2: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,  
  },

  containerIconos: {
    color: BORDER_COLOR,
    textAlign: 'center',
    marginBottom: 10,
  },

  imgFondo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 60,
  },

  imgLogoRespuesta: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 20,
  },

  fondoVaucher: {
    backgroundColor: SECONDARY_COLOR,
    width: '100%',
    height: 80,
    marginVertical:10,
    borderRadius: 10,
  },
  
  texto:{
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
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

  contenVauche: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  }, 

  textInicio: {
    paddingTop: 40,
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textBold:{
    fontWeight: 'bold',
  },

  textSuave: {
    fontWeight: 'normal',
    color: PRIMARY_COLOR,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  
  textButton: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },

  label: {    
    color: PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },

  input: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: BORDER_COLOR, 
    color: PRIMARY_COLOR,
    fontSize: 14,
    height: 50,
    textAlign: 'center',
    width: '100%',   
    justifyContent: 'center',
    alignItems: 'center',   
  },

  columnas: {
    flex: 1,
    justifyContent: 'space-between',
    width: '90%',
    margin: 5,
  },

  regresarIOS: {
    position: 'absolute',
    top: 40,
    left: 20,
  },

  regresarAndroid: {
    position: 'absolute',
    top: 10,
    left: 20,
  },

  buttonRegresar: {
    color: '#00184C',
  },

  buttonContinuar: {
    color: PRIMARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 30,
    fontWeight: 'bold',
    marginBottom: 10,  
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    textAlign: 'center',
  },


  buttonCancelar: {
    color: PRIMARY_COLOR,
    backgroundColor: BORDER_COLOR,
    borderRadius: 30,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, 
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BACKGROUND_COLOR,
  },


  doneButtonText: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
	  fontStyle: 'italic',
  },

  hiddenInput: {
    width: 0,
    height: 0,
    opacity: 0,
  },

  

});

