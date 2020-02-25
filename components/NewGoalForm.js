import React from "react";
import { Button } from "react-native-elements";
import {useState} from 'react'
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
    alignContent: "center",

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
    textAlign: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    height: 150,
    padding: 20
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

  const [goalName, setGoalName] = useState('')
  const [actionItem1, setAction1] = useState('')
  const [actionItem2, setAction2] = useState('')
  const [actionItem3, setAction3] = useState('')


  const handleChange = (num, text) => {
    if (num === 1) {
      setGoalName(text)
    } else if (num === 2) {
      setAction1(text)
    } else if (num === 3) {
      setAction2(text)
    } else if (num === 4) {
      setAction3(text)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.blueBig}>
                <View style={styles.navyBackground}>
                  <Text style={styles.titleFont}>New Goal</Text>
        <View>
          <TextInput 
          style={styles.inputStyle} 
          placeholder="Goal" 
          name="goalName"
          onChangeText={goalText => handleChange(1, goalText)}
          />
          <TextInput
          numberOfLines={20}
          style={styles.inputStyle} 
          placeholder="Action 1" 
          name="actionItem1"
          onChangeText={goalText => handleChange(2, goalText)}
          />
          <TextInput
          numberOfLines={20}
          style={styles.inputStyle} 
          placeholder="Action 2"
          name="actionItem2"
          onChangeText={goalText => handleChange(3, goalText)}
          />
          <TextInput
          numberOfLines={20}
          style={styles.inputStyle} 
          placeholder="Action 3"
          name="actionItem3"
          onChangeText={goalText => handleChange(4, goalText)}
          />
        </View>
        <View style={{ alignItems:'center' }}>
        <Button 
        style={styles.buttonStyle} 
        color="#ff5c5c" 
        title='Add Goal' 
        onPress={() => props.saveNewGoal(
          {goalName, actionItem1, actionItem2, actionItem3}
        )}
        />
        </View>
      </View>

      </View>
    </ScrollView>
  );
};

export default NewGoalForm;
