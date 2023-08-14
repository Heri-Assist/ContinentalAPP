import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";

export const Style = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },
  
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',      
  },

  imgFondo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 80
  },

  textInicio: {
    paddingTop: 40,
    color: PRIMARY_COLOR,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textBold:{
    fontWeight: 'bold',
  },

  textSuave: {
    fontWeight: 'normal',
    color: PRIMARY_COLOR,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

  textInicioSuave: {
    fontWeight: 'normal',  
    color: PRIMARY_COLOR, 
  },

  textButton: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonRegistro: {
    marginBottom: 10, 
    paddingHorizontal: 100,
    paddingVertical: 12,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 100,   
  },

  buttonInicio: {
    marginBottom: 10, 
    paddingHorizontal: 100,
    paddingVertical: 12,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 100,
  },

  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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

  inputModal:{
    backgroundColor: BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },  

  columnas: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
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
    borderRadius: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
    paddingHorizontal: 100,
    paddingVertical: 16,
    textAlign: 'center',
  },

  doneButtonText: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});
