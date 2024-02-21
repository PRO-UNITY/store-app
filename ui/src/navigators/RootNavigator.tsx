import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import {
  OrderHistoryDetails,
  Payment,
  ProductsDetails,
  SignIn,
  SignUp,
  Welcome,
} from "../screens";

const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <RootStack.Screen name="Welcome" component={Welcome} />
      <RootStack.Screen name="ProductDetails" component={ProductsDetails} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="Payment" component={Payment} />
      <RootStack.Screen
        name="OrderHistoryDetails"
        component={OrderHistoryDetails}
      />
      <RootStack.Screen name="TabStack" component={TabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
