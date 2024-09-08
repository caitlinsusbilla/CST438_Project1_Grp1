import { View, Text, Image , ImageBackground, ScrollView, Button, Pressable} from "react-native";
const logoImg = require("./assets/pokeball-png-45334.png")


export default function App() {
  return (

    // this will show the same of the app in a pikachu colorway and will add the background
  <View style={{flex: 1, backgroundColor: "#F0EAD6", padding: 100 }}>


    {/* <Text>
      <Text style={{ color: "#e92929" }}>Po</Text>
      <Text style={{ color: "#f4dc26" }}>keA</Text>
      <Text style={{ color: "#e92929" }}>pp</Text>
    </Text> */}


    <Button title="Login" onPress={() => console.log("Welcome")} color="#e92929"/>

    
    <ImageBackground source={logoImg} style={{flex: 20 }}></ImageBackground>
    {/* <Image source={logoImg} style={{ width: 200, height: 200 }}/> */}

  </View>
  );
}