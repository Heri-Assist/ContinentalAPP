import { Dimensions, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";


export const Style = StyleSheet.create({


  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
   
  },
  
  container2: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,  
  },    

  imgFondo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 60,

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
    width:'100%',
    paddingVertical: 12,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 100,   
  },

  buttonInicio: {
    marginBottom: 10, 
    width:'100%',
    paddingVertical: 12,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 100,
  },

  buttonCerrar: {
    marginBottom: 10, 
    width:'100%',
    paddingVertical: 12,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 100,   
  },

});
