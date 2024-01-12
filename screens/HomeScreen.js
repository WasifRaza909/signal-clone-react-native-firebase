import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { query, onSnapshot, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const db = getFirestore();

    const query = collection(db, "chats");

    const unsubscribe = onSnapshot(query, (snapshot) => {
      if (snapshot.docs.length > 0) {
        snapshot.docs.map((doc) =>
          setChats((prevChats) => [
            ...prevChats,
            { id: doc.id, data: doc.data() },
          ])
        ); // Log document data
        // Process snapshot data here
      } else {
        console.log("No chat documents found");
      }
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {chats.length > 0 ? (
          <ScrollView>
            {chats.map(({ id, data: { chatName } }) => (
              <CustomListItem id={id} chatName={chatName} key={id} />
            ))}
          </ScrollView>
        ) : (
          <Text>Loading chats...</Text> // Or any loading indicator
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
