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
import { SignUpUser } from "../../services/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp: React.FC<any> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    setLoading(true);
    SignUpUser(formData)
      .then(async (res) => {
        await AsyncStorage.setItem("token", res?.access);
        navigation.navigate("TabStack");
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid data");
        console.log(err);
      });
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
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={formData.confirm_password}
            onChangeText={(text) =>
              setFormData({ ...formData, confirm_password: text })
            }
          />
        </View>
      </View>
      <View>
        <Pressable
          style={styles.getStartedBtn}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign Up</Text>
          )}
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.bottomText}>Already have an account? SignIn</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  bottomText: {
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});
