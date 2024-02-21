import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { ProductContext } from "../../context/ProductContext";
import CartItem from "../../components/CartItem";
interface Navigation {
  navigation: any;
}
const Cart: React.FC<Navigation> = ({ navigation }) => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    totalPrice,
  } = useContext(ProductContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store name</Text>
      <View style={styles.priceBox}>
        <Text>Items: {cart.length}</Text>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>
      <FlatList
        style={{ borderTopWidth: 1, borderColor: "#a2a2a2" }}
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onDelete={() => deleteFromCart(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Your cart is empty</Text>
        }
      />

      <Pressable
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.btnText}>Buy Now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
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

export default Cart;
