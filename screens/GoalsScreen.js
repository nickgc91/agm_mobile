import React from "react";
import { Button } from "react-native-elements";
import { useEffect } from "react";
import API from "../components/API";
import { connect } from "react-redux";
import NewGoalForm from "../components/NewGoalForm"

import { bindActionCreators } from "redux";
import { setGoalData } from "../Reducers/GoalActions";

import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "green",
    textAlign: "center",
    alignContent: "center"
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  buttonStyle: {
    textAlign: "center",
    marginBottom: 20,
    width: 100
  },
  blueBig: {
    textAlign: "center",
    marginBottom: 40
  },
  navyBackground: {
    borderRadius: 20,
    backgroundColor: "navy"
  },
  goalsContent: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    margin: 20
  },
  greenBig: {
    textAlign: "center",
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
    fontSize: 30,
    color: "white"
  },
  someMargin: {
    margin: 10
  }
});

const GoalsScreen = ({ userData, setGoalData }, props) => {
  function getData() {
    API.getUserData()
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          debugger;
          setGoalData(response);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const [showGoalForm, setShowGoalForm] = React.useState(false);

  function navigateToGoalsScreen() {
    setShowGoalForm(false)
  }


  return !userData.username ? (
    <View style={styles.container}>
      <Text>Loading data</Text>
      <Button
        title="Grab Data"
        onPress={() => getData()}
        style={styles.buttonStyle}
      />
    </View>
  ) 
  : 
  showGoalForm ? 
  
   <NewGoalForm navigation={navigateToGoalsScreen} />
  
  :  
  <View style={styles.container}>
      <ScrollView style={styles.someMargin}>
        <Text style={styles.greenBig}>Welcome back {userData.username}</Text>
        <View style={styles.contentContainer}>
          <Button
            style={styles.buttonStyle}
            title="Add Goal"
            onPress={() => setShowGoalForm(true)}
          />
        </View>
        <View>
          {userData.goals.map((element, index) => {
            return (
              <View key={index} style={styles.blueBig}>
                <View style={styles.navyBackground}>
                  <Text style={styles.goalsContent}>
                    Goal: {element.goal[1]}
                  </Text>
                  {element.action.map((actionItem, index) => {
                    return (
                      <Text key={index} style={styles.goalsContent}>
                        Action Item: {actionItem.action}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  
};

// <ScrollView style={styles.somePadding}>

/* <View style={styles.redBig}>
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
          </ScrollView>
        </View>) */

const mapStateToProps = state => ({
  userData: state.goals
});

const mapDispatchToProps = dispatch => ({
  setGoalData: data => {
    dispatch({ type: "SET_GOAL_DATA", payload: data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);
