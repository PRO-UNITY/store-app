import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CommentItem: React.FC<any> = ({ id, comment, user }) => {
  return (
    <View key={id} style={styles.comment}>
      <View style={styles.author}>
        <Icon name="person-circle-sharp" style={styles.icon} />
        <Text style={styles.authorTitle}>{user}:</Text>
      </View>
      <Text style={styles.commentText}>{comment}</Text>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  comment: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  authorTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    fontSize: 35,
    color: "#8BA4D9",
  },
  commentText: {
    paddingLeft: 30,
    fontSize: 16,
  },
});
