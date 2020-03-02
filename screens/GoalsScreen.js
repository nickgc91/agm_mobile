import React from "react";
import { Button } from "react-native-elements";
import { useEffect } from "react";
import API from "../components/API";
import { connect } from "react-redux";
import NewGoalForm from "../components/NewGoalForm";
import Icon from "react-native-vector-icons/AntDesign";

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
    backgroundColor: "#02075d",
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
  whiteTitle: {
    textAlign: "center",
    marginBottom: 50,
    fontSize: 30,
    color: "white",
    borderRadius: 30
  },
    blackBackground: {
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
  },
  goalsContent: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
  },
  goalsContentComplete: {
    color: "green",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    textDecorationLine: 'line-through'
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
    setShowGoalForm(false);
    API.createNewGoal(newGoalData)
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          alert("that worked");
        }
      })
      .catch(error => {
        alert(error);
      })
      .then(getData());
  }

  function completedAction(actionID) {
    API.updateItemActionIsCompleted(actionID)
    .then(response => {
      if (response.error) {
        throw Error(response.error);
      } else {
        alert("action completed");
      }
    })
    .catch(error => {
      alert(error);
    })
    .then(getData());
  }

  function deleteGoal(goalID) {
    API.deleteGoal(goalID)
    .then(response => {
      if (response.error) {
        throw Error(response.error);
      } else {
        alert("goal deleted");
      }
    })
    .catch(error => {
      alert(error);
    })
    .then(getData());
  }

  return !userData.username ? (
    <View style={styles.container}>
      <Text>Loading data</Text>
    </View>
  ) : showGoalForm ? (
    <NewGoalForm saveNewGoal={saveNewGoal} />
  ) : (
    <View style={styles.container}>
      <ScrollView style={styles.someMargin}>
        <View >
        <Text style={styles.whiteTitle}>Welcome back {userData.username}</Text>
        </View>
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
                <View style={styles.greenBackground}>
                  <View style={{ marginBottom: 30 }}>
                  <Text style={styles.goalsContent}>
                    Goal: {element.goal[1]}
                  </Text>
                  {element.action.map((actionItem, index) => {
                    return (
                      actionItem.isComplete ? 
                      <Text key={index} style={styles.goalsContentComplete}>
                          Action Item: {actionItem.action}
                      </Text>
                      :
                      <View
                        key={index}
                        style={{ alignItems: "center", marginBottom: 20 }}
                      >
                        <Text style={styles.goalsContent}>
                          Action Item: {actionItem.action}
                        </Text>
                        <Button
                          icon={<Icon name="check" size={15} color="white" />}
                          type="outline"
                          color="white"
                          style={{ borderRadius: 30, width: 75, backgroundColor: "green" }}
                          onPress={() => completedAction({id: actionItem.id})}
                        />
                      </View>
                    );
                  })}
                  </View>
                  <Text style={{ color: 'white', marginBottom: 5}}>Delete Goal</Text>
                  <Button
                          icon={<Icon name="closecircle" size={15} color="white" />}
                          type="outline"
                          color="white"
                          style={{ borderRadius: 30, width: 75, backgroundColor: "red", marginBottom: 20 }}
                          onPress={() => deleteGoal({ goalId: element.goal[0] })}
                        />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
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
