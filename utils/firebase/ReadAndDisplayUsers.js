import firebase from "./Firebase";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { db } from "./Firebase";
import { Text } from "react-native";
import Styles from "../Styles";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let commit = true;

    firebase
      .firestore()
      .collection("users")
      .get()
      .then(({ docs }) => {
        if (!commit) return;
        setUsers(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .catch((error) => {
        if (!commit) return;
        console.error(error);
      });

    return () => {
      commit = false;
    };
  }, [setUsers]);

  return (
    <View>
      {users?.map((user) => (
        <View style={Styles.button}>
          <Text key={user.id} style={Styles.buttonText}>
            {titleCase(user.campus)}: {titleCase(user.child)}{" "}
            {titleCase(user.father)} {titleCase(user.mother)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Users;
