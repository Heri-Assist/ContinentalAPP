import { createStackNavigator } from '@react-navigation/stack';

import { InicioScreen } from '../screens/InicioScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { RegistroCodigo } from '../screens/RegistroCodigo';
import { RegistroResp } from '../screens/RegistroResp';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { CondicionesGeneralesScreen } from '../screens/CondicionesGeneralesScreen';
import { PoliticasPrivacidad } from '../screens/PoliticasPrivacidad';
import { Title } from 'react-native-paper';
import { IntroScreen } from '../screens/IntroScreen';

const Stack = createStackNavigator();


/**
 * Navigator for the dashboard screens.
 * @returns A stack navigator for the dashboard screens.
 */
export const NavigatorDashboard = () => {
  return (
    <Stack.Navigator
        initialRouteName='Intro'
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            }   
        }}
    >
      <Stack.Screen name="Intro"  component={IntroScreen} />
      <Stack.Screen name="Login"  component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Respuesta" component={RegistroResp} />
      <Stack.Screen name="Codigo" component={RegistroCodigo} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="CondicionesGeneralesScreen" component={CondicionesGeneralesScreen}/>
      <Stack.Screen name="Politicas" component={PoliticasPrivacidad}/>
    </Stack.Navigator>
  );
}