import React from "react";
import { Button } from "react-native-elements";

import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox,
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
    alignItems: "center",
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
  inputStyle: {
    height: '90%',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: "#9E9E9E",
    backgroundColor: "#FFFFFF",
  },
  buttonStyle: {
    textAlign: "center",
    marginBottom: 20,
    width: 150
  },
});

class JournalScreen extends React.Component {
  state = {
    dataSource: [],
    text: ""
  };

  componentDidMount() {
    return fetch("https://agm-backend.herokuapp.com/users")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.dataSource) return <div>Loading data</div>;

    return (
      <View style={styles.container}>
      <ScrollView >
        <View style={{ padding: 20 }}>
          <View >
          <Text style={styles.whiteTitle}>Journaling</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput 
            style={styles.inputStyle} 
            />
            <View style={{ marginTop: 20, alignItems: "center" }}>
            <Button
            style={styles.buttonStyle}
            title='Submit Entry'
              />
           </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

export default JournalScreen;
