import React from "react";
import { Button } from "react-native-elements";

import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "blue"
  },
  contentContainer: {
    marginTop: 30,
  },
  redBig: {
    textAlign: 'center',
    borderRadius: 40,
    padding: 20,
    fontSize: 35,
    color: 'white',
    backgroundColor: "green"
  }
});

class GoalsScreen extends React.Component {
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
    if (!this.state.dataSource) return <div>Loading data</div>;

    return (
      <View style={styles.container}>
                <Text style={styles.redBig}>MY GOALS</Text>

        <View>
          <FlatList 
          contentContainerStyle={styles.contentContainer}
            style={styles.redBig}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Text >
                Username: {item.username}, {"\n"}
                First goal: {item.goals[0].goal[1]}
                {"\n"}
                {"\n"}
              </Text>
            )}
            keyExtractor={({ id }, index) => id}
          />
          </View>
      </View>
    );
  }
}

export default GoalsScreen;
