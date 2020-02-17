import React from "react";
import { Button } from "react-native-elements";
import { useEffect } from "react";
import API from '../components/API'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { getGoalData } from '../Reducers/GoalActions';


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

const GoalsScreen = ({ userData, getGoalData }) => {


  // useEffect(() => {
  //   getData();
  // }, []);

  // function getData() {
  //   API.getUserData()
  //     .then(response => {
  //       if (response.error) {
  //         throw Error(response.error);
  //       } else {
  //         setUserData(response);
  //       }
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // }

  return (
    <View style={styles.container}>
      {/* {!userData.username ? (
        <Text>Loading data</Text>
      ) :  */}
      
        <View >
          {/* <Text>FOUND THE DATA</Text> */}
          <Button 
          title="Add Goal"
          onPress={() => getGoalData()}
          style={styles.buttonStyle}
          />
          
          <Text>{userData[0]}</Text>


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

        </View>
   
    </View>
  );
};


const mapStateToProps = (state) => ({
  userData: state.goals
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getGoalData,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);

