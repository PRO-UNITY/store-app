import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const OrderHistoryDetails: React.FC<any> = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();
  const handleDelete = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={22} />
        </Pressable>
        <Text style={styles.title}>Order History Detail</Text>
        <View></View>
      </View>
      <View style={styles.orderContainer}>
        <Image
          source={{
            uri: `https://api.prounity.uz/store${order?.product[0]?.produtct_img}`,
          }}
          style={styles.image}
        />
        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>
            Product Name: {order?.product[0]?.name}
          </Text>
          <Text style={styles.orderText}>
            Price: ${order.product[0]?.price?.toFixed(2)}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    color: "#7591cf",
    fontWeight: "600",
    paddingVertical: 20,
  },
  orderContainer: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 20,
    objectFit: "contain",
  },
  orderInfo: {
    flex: 1,
  },
  orderText: {
    fontSize: 18,
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
    fontSize: 18,
  },
});

export default OrderHistoryDetails;
