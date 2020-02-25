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

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    API.getUserData()
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          setGoalData(response);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const [showGoalForm, setShowGoalForm] = React.useState(false);

  function saveNewGoal(newGoalData) {
    setShowGoalForm(false)
    API.createNewGoal(newGoalData)
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          alert('that worked')
        }
      })
      .catch(error => {
        alert(error);
      }).then(getData())
  }


  return !userData.username ? (
    <View style={styles.container}>
      <Text>Loading data</Text>
    </View>
  ) 
  : 
  showGoalForm ? 
  
   <NewGoalForm saveNewGoal={saveNewGoal} />
  
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


const mapStateToProps = state => ({
  userData: state.goals
});

const mapDispatchToProps = dispatch => ({
  setGoalData: data => {
    dispatch({ type: "SET_GOAL_DATA", payload: data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);
