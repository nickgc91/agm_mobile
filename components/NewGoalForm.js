import React from "react";
import { Button } from "react-native-elements";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "green",
    textAlign: "center",
    alignContent: "center"
  },
  navyBackground: {
    borderRadius: 20,
    backgroundColor: "navy",
    padding: 20,
    alignContent: "center",

  },
  titleFont: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
  },
  inputStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    backgroundColor: 'white'
  },
  blueBig: {
    textAlign: "center",
    marginBottom: 40
  },
  buttonStyle: {
    marginBottom: 20,
    width: 150,
    padding: 20,
  },
});

const NewGoalForm = props => {

  return (
    <View style={styles.container}>
      <View style={styles.blueBig}>
                <View style={styles.navyBackground}>
                  <Text style={styles.titleFont}> New Goal </Text>
        <View>
          <TextInput style={styles.inputStyle} placeholder="Goal" />
          <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Action 1" />
          <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Action 2" />
          <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Action 3" />
        </View>
        <View style={{ alignItems:'center' }}>
        <Button 
        style={styles.buttonStyle} 
        color="#ff5c5c" 
        title='Add Goal' 
        onPress={() => props.navigation()}
        />
        </View>
      </View>

      </View>
    </View>
  );
};

export default NewGoalForm;
