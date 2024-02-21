import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SignInUser } from "../../services/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn: React.FC<any> = ({ navigation }) => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    SignInUser(signInData)
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.access);
        navigation.navigate("TabStack");
        setSignInData((prev) => ({ ...prev, username: "", password: "" }));
      })
      .catch(() => Alert.alert("Error", "Invalid username or password"))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.welcomeImg}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/012/487/829/original/3d-credit-card-paper-shopping-bag-floating-on-transparent-digital-marketing-online-e-commerce-store-app-shopping-online-concept-sale-promotion-business-cartoon-style-concept-3d-icon-render-png.png",
          }}
        />
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={signInData.username}
            onChangeText={(text) =>
              setSignInData({ ...signInData, username: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={signInData.password}
            onChangeText={(text) =>
              setSignInData({ ...signInData, password: text })
            }
          />
        </View>
      </View>
      <View>
        <Pressable
          style={styles.getStartedBtn}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </Pressable>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.bottomText}>Don't have an account? SignUp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  welcomeImg: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginTop: 40,
  },
  inputBox: {
    marginTop: 50,
    gap: 8,
  },
  input: {
    padding: 15,
    height: 54,
    backgroundColor: "#F1F2F3",
    borderRadius: 15,
  },
  getStartedBtn: {
    backgroundColor: "#8BA4D9",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  bottomText: {
    textAlign: "center",
    marginTop: 10,
  },
});
