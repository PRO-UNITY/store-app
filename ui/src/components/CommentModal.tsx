import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { AddProductComment } from "../services/Products";
import CommentItem from "./CommentItem";
interface CommentProp {
  id: number;
  visible: boolean;
  onClose: () => void;
  comments: any;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}
const CommentModal: React.FC<CommentProp> = ({
  id,
  visible,
  onClose,
  comments,
  setComments,
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleAddComment = () => {
    setLoading(true);
    AddProductComment({ comment, product: id })
      .then((res) => {
        const newComment = { id: res.id, comment: res.comment, user: res.user };
        setComments((prevComments) => [...prevComments, newComment]);
        setComment("");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeUp={onClose}
        onSwipeDown={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.input}>
              <TextInput
                placeholder="Add a comment..."
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              <Pressable style={styles.addComment} onPress={handleAddComment}>
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text style={styles.AddBtntext}>Add</Text>
                )}
              </Pressable>
            </View>
            <FlatList
              style={{ width: "100%" }}
              data={comments}
              renderItem={({ item }) => <CommentItem {...item} />}
              keyExtractor={(item) => item?.id?.toString()}
            />
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </GestureRecognizer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    flex: 0.6,
  },
  input: {
    marginVertical: 20,
    padding: 15,
    height: 54,
    backgroundColor: "#F1F2F3",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  commentsContainer: {
    marginTop: 20,
    width: "100%",
  },
  addComment: {
    backgroundColor: "#8BA4D9",
    paddingHorizontal: 15,
    height: 35,
    justifyContent: "center",
    borderRadius: 10,
  },
  AddBtntext: {
    color: "#fff",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default CommentModal;
