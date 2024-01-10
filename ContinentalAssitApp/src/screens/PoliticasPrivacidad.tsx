import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Linking, Platform, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Pdf from 'react-native-pdf';


interface Props extends StackScreenProps <any, any> { } 
export const PoliticasPrivacidad = ({navigation}: Props) => {

	const resourceType = 'url';
  
        const resources = {
          file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
          url: 'https://storage.googleapis.com/files-continentalassist-web/Pol%C3%ADtica%20de%20Tratamiento%20de%20la%20Informaci%C3%B3n%20y%20Privacidad%20Continental%20Assist.pdf',
          base64: 'JVBERi0xLjMKJcfs...',
        };
      
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <Text style={styles.backButtonText}>Regresar</Text>
            </TouchableOpacity>
          <Pdf 
            trustAllCerts={false}    
            source={{uri: resources.url, cache: true}}
            onLoadComplete={(numberOfPages,filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
           
        </View>
      );  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  backButtonText: {
      color: 'red', // Puedes personalizar el color del texto
  },
 
});