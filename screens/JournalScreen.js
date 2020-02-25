import React from "react";
import { Button } from "react-native-elements";

import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex:1,
  paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
  margin:20,
  },
  titleBox: {
    borderRadius: 40
  },
  theButton: {
    borderRadius: 50
  },
  redBig: {
    borderRadius: 40,
    padding: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "yellow"
  },
  inputStyle: {
    height: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    height: 150,
    padding: 20
  },
});

class JournalScreen extends React.Component {
  state = {
    dataSource: [],
    text: ''
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

      <ScrollView style={styles.container}>
      <View style={{flex: 1,
        flexDirection: 'column', justifyContent: 'center'}}>
        
        <View>
        <Text style={styles.redBig}>Journaling</Text>
        </View>
        <View>
        <TextInput
          style={styles.inputStyle}
        />
        </View>
        </View>
      </ScrollView>
    );
  }
}

export default JournalScreen;
