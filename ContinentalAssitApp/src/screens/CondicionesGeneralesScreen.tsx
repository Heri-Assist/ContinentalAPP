import React from 'react';
import { View, Linking, Platform } from 'react-native';
import PDFView from 'react-native-view-pdf';

export const CondicionesGeneralesScreen = () => {

	const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://continentalassist.co/pdf/CONDICIONES_GENERALES_FEBRERO_2021.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
  };

	const resourceType = 'url';
  
      return (
        <View style={{ flex: 1 }}>
          <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1 }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log('Loading...')}
            onError={() => console.log('Error')}
          />
        </View>
      );

}