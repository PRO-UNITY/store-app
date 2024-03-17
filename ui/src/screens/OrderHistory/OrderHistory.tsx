import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { OrderDelete, OrderList } from "../../services/Order";
import { useIsFocused } from "@react-navigation/native";

const OrderItem: React.FC<any> = ({ order, onDelete }) => (
  <View style={styles.orderContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: `https://api.prounity.uz/store${order.product[0].produtct_img}`,
        }}
        style={styles.image}
      />
    </View>
    <View style={styles.orderInfo}>
      <Text style={styles.orderText}>{order.product[0].name}</Text>
      <Text style={styles.orderText}>
        Price: ${order?.product[0]?.price?.toFixed(2)}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => onDelete(order.id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const OrderHistory: React.FC<any> = ({ navigation }) => {
  const focused = useIsFocused();
  const [orderData, setOrderData] = useState<any>([]);
  const handleDelete = (orderId: number) => {
    OrderDelete(orderId).then(() => {
      const newOrder = orderData.filter((item) => item.id !== orderId);
      setOrderData(newOrder);
    });
  };

  const handleOrderDetails = (order: any) => {
    navigation.navigate("OrderHistoryDetails", { order });
  };
  console.log(orderData);
  useEffect(() => {
    OrderList().then((res) => setOrderData(res.results));
  }, [focused]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders History</Text>
      <FlatList
        data={orderData}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleOrderDetails(item)}>
            <OrderItem order={item} onDelete={handleDelete} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Your cart is empty</Text>
        }
      />
      <Text style={styles.totalPrice}>Total: ${orderData[0]?.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#fff"
  },
  title: {
    fontSize: 30,
    color: "#7591cf",
    fontWeight: "600",
    paddingVertical: 20,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  orderInfo: {
    flex: 1,
    padding: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default OrderHistory;
