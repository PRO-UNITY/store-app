import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { Spacing } from "../../constants";

import { useIsFocused } from "@react-navigation/native";
import { EditUser, GetUser } from "../../services/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile: React.FC<any> = ({ navigation }) => {
  const focuced = useIsFocused();
  const [userProfile, setUserProfile] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    GetUser().then((res) => setUserProfile(res));
  }, [focuced]);
  const handleEdit = () => {
    setloading(true);
    EditUser(userProfile)
      .then((res) => {
        setUserProfile(res);
        Alert.alert("Profile Edit", "Successfull changes");
      })
      .finally(() => setloading(false));
  };
  const handleLogOut = () => {
    navigation.navigate("SignIn");
    AsyncStorage.clear();
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: Spacing.default_padding,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        <Icon name="person" style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={userProfile?.username}
            onChangeText={(text) =>
              setUserProfile((prev) => ({ ...prev, username: text }))
            }
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={userProfile?.email}
            onChangeText={(text) =>
              setUserProfile((prev) => ({ ...prev, email: text }))
            }
          />
          <Text style={styles.label}>Last name:</Text>
          <TextInput
            style={styles.input}
            value={userProfile?.first_name}
            onChangeText={(text) =>
              setUserProfile((prev) => ({ ...prev, first_name: text }))
            }
          />
          <Text style={styles.label}>Last name:</Text>
          <TextInput
            style={styles.input}
            value={userProfile?.last_name}
            onChangeText={(text) =>
              setUserProfile((prev) => ({ ...prev, last_name: text }))
            }
          />
        </View>
      </View>
      <Pressable style={styles.getStartedBtn} onPress={handleEdit}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>Save</Text>
        )}
      </Pressable>
      <Pressable style={styles.logOutBtn} onPress={handleLogOut}>
        <Text style={styles.btnText}>Log out</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    fontSize: 50,
    marginTop: 30,
  },
  userInfo: {
    marginTop: 20,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 16,
  },
  input: {
    padding: 15,
    height: 54,
    backgroundColor: "#F1F2F3",
    borderRadius: 15,
  },
  getStartedBtn: {
    backgroundColor: "#8BA4D9",
    height: 55,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
  },
  logOutBtn: {
    backgroundColor: "red",
    height: 55,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 10,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
});

export default UserProfile;
