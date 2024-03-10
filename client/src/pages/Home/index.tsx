import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Estabelecimento from "../Estabelecimento";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Octicons } from "@expo/vector-icons";
import InputSearch from "../../components/InputSearch";

const Stack = createNativeStackNavigator();
interface NavbarProps {
  navigation: any;
}

const Estabelecimentos: React.FC<NavbarProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  let estabelecimentos = ["JM Distribuidora", "Altas Horas"];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* aqui seja um components */}
      <InputSearch
        style={styles.searchInput}
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* ate aqui */}
      <ScrollView style={{ flex: 1 }}>
        {estabelecimentos.map((estabelecimento, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Estabelecimento")}
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>{estabelecimento}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Home: React.FC<NavbarProps> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => <Estabelecimentos {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Estabelecimento" component={Estabelecimento} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 14,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 10,
    width: "80%",
  },
  searchButton: {
    height: 40,
    borderColor: "gray",
    alignItems: "center",
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    marginBottom: 10,
    width: 40,
  },
  card: {
    backgroundColor: "#71ff64",
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
