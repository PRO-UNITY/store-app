import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
interface CartItemProp {
  name: string;
  price: number;
  quantity: number;
  produtct_img: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}
const CartItem: React.FC<CartItemProp> = ({
  name,
  price,
  quantity,
  produtct_img,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://api.prounity.uz/store${produtct_img}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onDecrease}>
          <Icon name="remove-outline" size={24} color="black" />
        </Pressable>
        <Text>{quantity}</Text>
        <Pressable onPress={onIncrease}>
          <Icon name="add-outline" size={24} color="black" />
        </Pressable>
        <Pressable onPress={onDelete}>
          <Icon name="trash-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartItem;
