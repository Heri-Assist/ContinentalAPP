import { createStackNavigator } from '@react-navigation/stack';
import { InicioScreen } from '../screens/InicioScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';

const Stack = createStackNavigator();

export const NavigatorDashboard = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }   
        }}
    >
      <Stack.Screen name="Dashboard" component={InicioScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      {/* <Stack.Screen name="dashboard" component={dashboard} /> */}
    </Stack.Navigator>
  );
}