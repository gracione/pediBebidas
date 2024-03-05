import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Home from '../pages/Home';
import RegisterScreen from '../screens/RegisterScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {removeToken} from '../service/api';
import Pedidos from '../pages/Pedidos';
import Perfil from '../pages/Perfil';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const Navigation: React.FC<NavigationProps> = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const sairDoPerfil = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {/* {isLoggedIn && <Navbar navigation={navigation} sairDoPerfil={sairDoPerfil} />} */}
      {isLoggedIn ? (
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
              name="Home"
              component={Home}
            />
            <Tab.Screen
              name="Pedidos"
              component={Pedidos}
            />
            <Tab.Screen name="Perfil">
              {() => (
                <Perfil sairDoPerfil={sairDoPerfil} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
