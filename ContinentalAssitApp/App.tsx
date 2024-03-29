
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigatorDashboard } from './src/navigation/NavigationStack';
import { AuthProvider } from './src/context/authContext';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from './src/i18n'; // Importa la configuración de i18n
import 'intl';
import 'intl-pluralrules';
import { FirebaseProvider } from './src/context/firebaseContext';
import 'react-native-localize';

const AppState = ({children}:any) => {
  return(
      <AuthProvider>
          {children}
      </AuthProvider>
  )
}


const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
          <AppState>
            <FirebaseProvider>
              <SafeAreaProvider>
                <NavigatorDashboard />
              </SafeAreaProvider>
            </FirebaseProvider>
          </AppState>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
