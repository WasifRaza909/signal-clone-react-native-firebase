import { StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    const queryRef = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      } else {
        console.log("No chat documents found");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            `https://ui-avatars.com/api/?name=${chatMessages?.[0]?.displayName}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
