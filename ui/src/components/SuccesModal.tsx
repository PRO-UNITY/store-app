import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProductContext } from "../context/ProductContext";
interface ModalProp {
  visibility: boolean;
  dismissAlert: any;
}
const SuccessModal: React.FC<ModalProp> = ({ visibility }) => {
  const { clearCart } = useContext(ProductContext);
  const navigation = useNavigation<any>();
  const handleNavigationHome = () => {
    navigation.navigate("Home");
    clearCart();
  };
  return (
    <Modal visible={visibility} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-done-circle" color={"green"} size={80} />
          </View>
          <Text style={styles.modalText}>Order placed successfully!</Text>
          <Pressable onPress={handleNavigationHome} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    height: 200,
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    elevation: 10,
  },
  iconContainer: {
    alignItems: "center",
    margin: 10,
  },
  modalText: {
    fontSize: 18,
    marginTop: 5,
  },
  okButton: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#5b7abe",
    borderRadius: 10,
    bottom: 0,
    marginBottom: 10,
  },
  okButtonText: {
    color: "white",
    margin: 15,
  },
});

export default SuccessModal;
