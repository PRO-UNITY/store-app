import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigators/RootNavigator";
import ProductProvider from "./src/context/ProductContext";

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ProductProvider>
  );
}
