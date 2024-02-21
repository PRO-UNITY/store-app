import React from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Spacing } from "../constants";

const ProductCard: React.FC<any> = ({ id, name, produtct_img, price }) => {
  const navigation = useNavigation<any>();
  const handleNavigate = () => {
    navigation.navigate("ProductDetails", id);
  };
  return (
    <Pressable style={styles.prductContainer} onPress={handleNavigate}>
      <View style={styles.cardHead}>
        <Image
          style={styles.productImage}
          source={{
            uri: `https://api.prounity.uz/store${produtct_img}`,
          }}
        />
      </View>
      <View style={styles.cardBottom}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>${price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  prductContainer: {
    backgroundColor: "#e7e9ee",
    borderRadius: 15,
    width: "49%",
    padding: 10,
    marginTop: 6,
  },
  cardHead: {
    alignItems: "center",
    padding: Spacing.default_padding,
  },
  productImage: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },
  cardBottom: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 15,
    color: "#516797",
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 14,
    color: "#516797",
    fontWeight: "500",
  },
});
