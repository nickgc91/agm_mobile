import React from "react";
import { Button } from "react-native-elements";
import { useEffect } from "react";
import API from '../components/API'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { setGoalData } from '../Reducers/GoalActions';


import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox,
  Alert,
  
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "green"
  },
  contentContainer: {
    marginTop: 30
  },
  buttonStyle: {
    borderRadius: 30
  },
  redBig: {
    textAlign: "center",
    borderRadius: 30,
    padding: 20,
    fontSize: 20,
    color: "white",
    backgroundColor: "navy"
  },
  somePadding: {
    margin: 30,
  }
});

const GoalsScreen = ({ userData, setGoalData }) => {


  function getData() {
    API.getUserData()
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          debugger
          setGoalData(response)
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      {!userData.username ? (
        <View>
        <Text>Loading data</Text>
        <Button 
          title="Add Goal"
          onPress={() => getData()}
          style={styles.buttonStyle}
          />
          </View>
      ) : (
      
        <View >
          {/* <Text>FOUND THE DATA</Text> */}
          
          
          <Text style={styles.redBig}>{userData.username}</Text>
          {/* <Text style={styles.redBig}>{userData[1]}</Text> */}
          </View> )}
   
   </View>)
 


          {/* <Text>{userData.username}</Text> */}

        {/* <ScrollView style={styles.somePadding}>
          <View style={styles.redBig}>
            <Text style={styles.redBig}>Goal: {userData.goals[0].goal[1]}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[0].action[0].action}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[0].action[1].action}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[0].action[2].action}</Text>
          </View>

          <View style={styles.redBig}>
            <Text style={styles.redBig}>Goal: {userData.goals[1].goal[1]}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[1].action[0].action}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[1].action[1].action}</Text>
            <Text style={styles.redBig}>Action Item: {userData.goals[1].action[2].action}</Text>
          </View>
          </ScrollView> */}

        }


const mapStateToProps = (state) => ({
  userData: state.goals
})

const mapDispatchToProps = dispatch => ({
  setGoalData: data => {
    dispatch({ type: "SET_GOAL_DATA", payload: data });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);

