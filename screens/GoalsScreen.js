import React from "react";
import { Button, withTheme } from 'react-native-elements';

import { ScrollView, FlatList, StyleSheet, View, Text, YellowBox } from "react-native";

const RaisedButton = props => <Button raised {...props} />;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "blue"
  },
  titleBox: {
    borderRadius: 40
  },
  theButton: {
    borderRadius: 50
  },
  redBig: {
    padding: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "yellow"
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
    const { theme, updateTheme, replaceTheme } = this


    if (!this.state.dataSource) 
      return <div>Loading data</div>;

    return (
      <View style={styles.container}>
          <Text style={{ color: theme.colors.primary }}>Yo!</Text>;

      {/* <FlatList style={styles.redBig}
      styles={styles.container}
      data={this.state.dataSource}
      renderItem={({item}) => <Text>Username: {item.username}, {"\n"}
      First goal: {item.goals[0].goal[1]}{"\n"}{"\n"}</Text>}
      keyExtractor={({id}, index) => id}
    /> */}
    </View>
    );
  }
}

export default GoalsScreen;
