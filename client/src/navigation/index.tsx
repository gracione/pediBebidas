import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import Home from "../pages/Home";
import RegisterScreen from "../screens/RegisterScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { removeToken } from "../service/api";
import { ADM } from "../service/types";
import Pedidos from "../pages/Pedidos";
import CadastrarProduto from "../pages/CadastrarProduto";
import Perfil from "../pages/Perfil";
import { SimpleLineIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { AuthProvider, AuthContext } from "../contexts/auth";
import { Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sairDoPerfil = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(context) => (
          <NavigationContainer>
            {isLoggedIn ? (
              <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <SimpleLineIcons name="home" size={size} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Pedidos"
                  component={Pedidos}
                  options={{
                    tabBarLabel: "Pedidos",
                    tabBarIcon: ({ color, size }) => (
                      <Entypo name="drink" size={size} color={color} />
                    ),
                  }}
                />
                {context.tipoUser == ADM && (
                  <Tab.Screen
                    name="Cadastrar Produto"
                    component={CadastrarProduto}
                    options={{
                      tabBarLabel: "Cadastrar Produto",
                      tabBarIcon: ({ color, size }) => (
                        <Octicons name="plus-circle" size={size} color={color} />
                      ),
                    }}
                  />
                )}
                <Tab.Screen
                  name="Perfil"
                  options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="profile" size={size} color={color} />
                    ),
                  }}
                >
                  {() => <Perfil sairDoPerfil={sairDoPerfil} />}
                </Tab.Screen>
              </Tab.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login">
                  {(props) => (
                    <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="Cadastrar Usuario"
                  component={RegisterScreen}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};
