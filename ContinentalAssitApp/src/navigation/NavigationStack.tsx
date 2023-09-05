import { createStackNavigator } from '@react-navigation/stack';

import { InicioScreen } from '../screens/InicioScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { RegistroCodigo } from '../screens/RegistroCodigo';
import { RegistroResp } from '../screens/RegistroResp';
import { DashboardScreen } from '../screens/DashboardScreen';

const Stack = createStackNavigator();



/**
 * Navigator for the dashboard screens.
 * @returns A stack navigator for the dashboard screens.
 */
export const NavigatorDashboard = () => {
  return (
    <Stack.Navigator
        initialRouteName='Inicio'
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            }   
        }}
    >

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Respuesta" component={RegistroResp} />
      <Stack.Screen name="Codigo" component={RegistroCodigo} />
    </Stack.Navigator>
  );
}