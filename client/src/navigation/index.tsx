import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import Home from "../pages/Home";
import RegisterScreen from "../screens/RegisterScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { removeToken } from "../service/api";
import Pedidos from "../pages/Pedidos";
import CadastrarProduto from "../pages/CadastrarProduto";
import Perfil from "../pages/Perfil";
import { SimpleLineIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { AuthProvider, AuthContext } from "../contexts/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const sairDoPerfil = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="home" size={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Pedidos"
            options={{
              tabBarLabel: "Pedidos",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="drink" size={color} size={size} />
              ),
            }}
            component={Pedidos}
          />
          {authContext.tipoUser === "1" ? (
            <Tab.Screen
              name="Cadastrar Produto"
              options={{
                tabBarLabel: "Cadastrar Produto",
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="drink" size={color} size={size} />
                ),
              }}
              component={CadastrarProduto}
            />
          ) : (
            <></>
          )}

          <Tab.Screen
            name="Perfil"
            options={{
              tabBarLabel: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="profile" size={color} size={size} />
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
              <AuthProvider>
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              </AuthProvider>
            )}
          </Stack.Screen>
          <Stack.Screen name="Cadastrar Usuario" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
