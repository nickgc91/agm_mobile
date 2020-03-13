import React from "react";
import { Button } from "react-native-elements";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#02075d",
    textAlign: "center",
    alignContent: "center"
  },
  whiteTitle: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    borderRadius: 30
  },
  greenBackground: {
    borderRadius: 20,
    backgroundColor: "#013220",
    alignItems: "center"
  },
  titleBox: {
    borderRadius: 40
  },
  theButton: {
    borderRadius: 50
  },
  redBig: {
    borderRadius: 40,
    textAlign: "center",
    padding: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "yellow"
  },
  entriesListStyle: {
    textAlign: "center",
    padding: 10,
    color: "white"
  },
  titleInput:{
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    backgroundColor: "#FFFFFF",
    marginBottom: 20
  },
  inputStyle: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    height: 100
  },
  buttonStyle: {
    textAlign: "center",
    marginBottom: 20,
    width: 150
  }
});

const NewGoalForm = props => {
  const [title, setJournalTitle] = useState("");
  const [text, setJournalEntry] = useState("");

  const handleChange = (num, text) => {
    if (num === 1) {
      console.log(text)
      setJournalTitle(text);
    } else if (num === 2) {
      console.log(text)
      setJournalEntry(text);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <TextInput
        style={styles.titleInput}
        value={title}
        placeholder="Title"
        name="journalTitle"
        onChangeText={journalTitle => handleChange(1, journalTitle)}
      />
      <TextInput
        value={text}
        multiline={true}
        style={styles.inputStyle}
        placeholder="What's on your mind... "
        name="journalEntry"
        onChangeText={journalEntry => handleChange(2, journalEntry)}
      />

      <View style={{ alignItems: "center" }}>
        <Button
          style={styles.buttonStyle}
          color="#ff5c5c"
          title="Add Goal"
          onPress={() => { 
            props.saveNewJournalEntry({title, text})
            setJournalTitle('');
            setJournalEntry('');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default NewGoalForm;
