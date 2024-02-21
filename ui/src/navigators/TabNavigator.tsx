import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Cart, Home, OrderHistory, UserProfile } from "../screens";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const focused = useIsFocused();
  const navigation = useNavigation<any>();

  const checkUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) navigation.navigate("SignIn");
    console.log("navigate");
  };
  useEffect(() => {
    checkUser();
  }, [focused]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: "#8BA4D9",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "",
        }}
        component={Home}
      />
      <Tab.Screen
        name="Store"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "bag" : "bag-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "",
        }}
        component={Cart}
      />
      <Tab.Screen
        name="Order-history"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "",
        }}
        component={OrderHistory}
      />
      <Tab.Screen
        name="UserProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "",
        }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
