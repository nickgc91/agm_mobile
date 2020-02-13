import React from "react";
import { Button } from 'react-native-elements';

import { ScrollView, FlatList, StyleSheet, View, Text, YellowBox } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "blue", 
  },
  titleBox: {
    borderRadius: 40,
  },
  theButton: {
    borderRadius: 50
  },
  redBig: {
    borderRadius: 40,
    padding: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "yellow",
  },
});

class JournalScreen extends React.Component {
  state = {
    dataSource: []
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


    if (!this.state.dataSource) 
      return <div>Loading data</div>;

    return (
      <View style={styles.container}>
        <Text style={styles.redBig}>Journaling</Text>    
      </View>
    );
  }
}

export default JournalScreen;
