import React, { useContext, useState } from "react";
import { Text, SafeAreaView, StyleSheet, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  CardField,
  StripeProvider,
  useStripe,
} from "@stripe/stripe-react-native";
import { Spacing } from "../../constants";
import { AddOrder } from "../../services/Order";
import { ProductContext } from "../../context/ProductContext";
import SuccesModal from "../../components/SuccesModal";

const stripePublishableKey =
  "pk_test_51OirCFLZ26NOlTGBPqA4VQbX9UNih1vM8cJfm0xNohLNjMEEc2w3vxJjJdsFc0fSlfczmxGKFizW0H1rB0Dea2Jp00Flw7XUUR";

const PaymentScreen: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { cart, totalPrice } = useContext(ProductContext);
  const stripe = useStripe();

  const handlePay = async () => {
    setLoading(true);
    try {
      const token = await stripe.createPaymentMethod({
        paymentMethodType: "Card",
      });
      console.log(token?.paymentMethod?.id);
      await AddOrder({
        product: cart,
        token: token?.paymentMethod?.id,
        amount: totalPrice,
        is_payment: true,
      });
      setModalVisible(true);
    } catch (error) {
      alert("Error placing order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <StripeProvider publishableKey={stripePublishableKey}>
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={22} />
          </Pressable>
          <Text style={styles.title}>Payment</Text>
          <View></View>
        </View>
        <Text>Enter card details:</Text>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
        />
        <Pressable style={styles.payBtn} disabled={loading} onPress={handlePay}>
          <Text style={styles.btnText}>
            {loading ? "Processing..." : "Pay"}
          </Text>
        </Pressable>
      </SafeAreaView>
      <SuccesModal visibility={modalVisible} dismissAlert={setModalVisible} />
    </StripeProvider>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.default_padding,
    backgroundColor: "#fff",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Spacing.default_padding,
  },
  title: {
    fontSize: 30,
    color: "#7591cf",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#efefefef",
    borderRadius: 10,
  },
  cardContainer: {
    height: 55,
    marginVertical: 30,
  },

  payBtn: {
    backgroundColor: "#8BA4D9",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },

  // Modal styles
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeModalBtn: {
    backgroundColor: "#8BA4D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  closeModalText: {
    fontSize: 16,
    color: "#fff",
  },
});
