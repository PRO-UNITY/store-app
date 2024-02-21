import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Spacing } from "../../constants";
import { ProductContext } from "../../context/ProductContext";
import { GetProductDetail } from "../../services/Products";
import CommentModal from "../../components/CommentModal";
interface ProductDetailProps {
  navigation: any;
  route: any;
}

const ProductsDetails: React.FC<ProductDetailProps> = ({
  navigation,
  route,
}) => {
  const [cardData, setcardData] = useState<any>({});
  const [comments, setComments] = useState<any>([]);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const { addToCart, cart } = useContext(ProductContext);

  const increaseQuantity = () => {
    setcardData((prev) => ({ ...prev, quantity: prev?.quantity + 1 }));
  };
  const handleRemoveQuantity = () => {
    if (cardData.quantity <= 1) return;
    setcardData((prev) => ({ ...prev, quantity: prev?.quantity - 1 }));
  };
  useEffect(() => {
    GetProductDetail(route?.params).then((res) => {
      setcardData({ ...res, quantity: 1 });
      setComments(res.comment);
    });
  }, []);
  const handleModalClose = () => setShowCommentModal((prev) => !prev);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={22} />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={handleModalClose}>
            <Icon name="chatbox-ellipses-outline" size={22} />
          </Pressable>
          <Pressable
            style={styles.cartIcon}
            onPress={() => navigation.navigate("Store")}
          >
            <Icon name="bag-handle-outline" size={22} />
            <View style={styles.cardCount}>
              <Text style={styles.cardCountText}>{cart.length}</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.productBox}>
        <Image
          style={styles.productImage}
          source={{
            uri: `https://api.prounity.uz/store${cardData.produtct_img}`,
          }}
        />
      </View>
      <View style={styles.productContent}>
        <View style={styles.productNameBox}>
          <Text style={styles.productName}>{cardData.name}</Text>
          <Text style={styles.productPrice}> ${cardData?.price}</Text>
        </View>
        <View style={styles.calcBox}>
          <Pressable style={styles.actionBtn} onPress={increaseQuantity}>
            <Icon name="add-outline" size={18} color={"#fff"} />
          </Pressable>
          <Text style={styles.actionBtn}>{cardData?.quantity}</Text>
          <Pressable style={styles.actionBtn} onPress={handleRemoveQuantity}>
            <Icon name="remove-outline" size={18} color={"#fff"} />
          </Pressable>
        </View>
        <Pressable style={styles.addBtn} onPress={() => addToCart(cardData)}>
          <Text style={styles.btnText}>Add to card</Text>
        </Pressable>
      </View>
      <CommentModal
        setComments={setComments}
        comments={comments}
        id={route?.params}
        visible={showCommentModal}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  );
};

export default ProductsDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  heading: {
    padding: Spacing.default_padding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productBox: {
    flex: 0.7,
    padding: Spacing.default_padding,
  },
  productContent: {
    backgroundColor: "#8BA4D9",
    flex: 0.3,
    marginTop: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  productNameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  productName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "400",
  },
  productPrice: {
    fontSize: 18,
    color: "#fff",
  },
  addBtn: {
    borderColor: "#fff",
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
  calcBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#fff",
    borderWidth: 1,
    width: "30%",
    borderRadius: 12,
    marginVertical: 10,
  },
  actionBtn: {
    padding: 10,
    color: "#fff",
  },
  actionBtnText: {
    color: "#fff",
  },
  cartIcon: {
    position: "relative",
  },
  cardCount: {
    position: "absolute",
    backgroundColor: "red",
    width: 20,
    height: 20,
    alignItems: "center",
    borderRadius: 10,
    marginStart: 10,
    marginTop: 10,
  },
  cardCountText: {
    color: "#fff",
  },
});
