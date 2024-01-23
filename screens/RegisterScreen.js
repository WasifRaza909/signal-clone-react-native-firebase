import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Button, Input, Text } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(
          `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}`
        );
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL:
            imageUrl ||
            `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}`,
        })
          .then(() => {
            console.log("PROFILE UPDATED");
          })
          .catch(function (error) {
            console.log(error.message, 7000);
          });
      })

      .catch(function (error) {
        console.log(error.message, 7000);
      });
  };

  // useLayoutEffect works before printing the screen useEffect works after
  useLayoutEffect(() => {
    navigation.setOptions({
      // If you want to change screen options
      title: "Register",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="text"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },

  button: {
    width: 200,
    marginTop: 10,
  },

  inputContainer: {
    width: 300,
  },
});
