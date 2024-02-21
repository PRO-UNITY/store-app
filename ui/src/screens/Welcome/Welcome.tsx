import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Image,
} from "react-native";
import { Colors } from "../../constants";

const Welcome: React.FC<any> = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Store App</Text>
        <Image
          style={styles.welcomeImg}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/012/487/829/original/3d-credit-card-paper-shopping-bag-floating-on-transparent-digital-marketing-online-e-commerce-store-app-shopping-online-concept-sale-promotion-business-cartoon-style-concept-3d-icon-render-png.png",
          }}
        />
        <Text style={styles.description}>
          An app to manage your online store effortlessly.
        </Text>
      </View>
      <View>
        <Pressable onPress={handleNavigate} style={styles.getStartedBtn}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    color: "#7591cf",
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    paddingVertical: 20,
    color: "#516797",
    fontSize: 18,
  },
  welcomeImg: {
    width: 300,
    height: 250,
    resizeMode: "contain",
    marginTop: 80,
  },
  getStartedBtn: {
    backgroundColor: "#8BA4D9",
    padding: 20,
    borderRadius: 15,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
});
