import React from "react";
import { Button } from "react-native-elements";
import { useEffect } from "react";
import API from '../components/API'


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

const GoalsScreen = () => {
  const [userData, setUserData] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    API.getUserData()
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          setUserData(response);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      {!userData.username ? (
        <Text>Loading data</Text>
      ) : ( 
        <View >
          <Text>FOUND THE DATA</Text>
          <Button 
          title="Add Goal"
          onPress={() => Alert.alert('Simple Button pressed')}
          style={styles.buttonStyle}
          />
          <Text>{userData.username}</Text>

        <ScrollView style={styles.somePadding}>
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
          </ScrollView>

        </View>
        // <View className="grid-container2">
        //   <View className="grid-item11">
        //     <Text> Your Current Goals </Text>
        //   </View>

        //   <View className="grid-item33">
        //     <View
        //       style={{
        //         backgroundImage:
        //           'url("https://images.unsplash.com/photo-1543682704-15adeb008ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60")',
        //         borderRadius: "25px",
        //         margin: "auto",
        //         opacity: "0.8"
        //       }}
        //     >
        //       <View
        //         style={{
        //           backgroundColor: "#236B8E",
        //           borderRadius: "25px",
        //           padding: "30px",
        //           margin: "auto",
        //           opacity: "0.9"
        //         }}
        //       >
        //         {/* <h2>Goals</h2>

        //       {this.state.showNewGoalForm ? (
        //       <NewGoalForm
        //         style={{ borderRadius: "25px" }}
        //         hideNewGoalForm={this.hideNewGoalForm}
        //       /> */}
        //         {/* ) : ( */}
        //         <View style={{ padding: "20px" }}>
        //           {this.state.dataSource.goals[0].numOfGoals === 0 ? (
        //             <h3 style={{ color: "red" }}>
        //               You are not currently working on any goals. Add a goal
        //               below.
        //             </h3>
        //           ) : (
        //             <View>
        //               {this.state.showActionItems ? (
        //                 <button
        //                   onClick={() => this.showActionItems()}
        //                   className="ui small button"
        //                   style={{ width: "120px", borderRadius: "25px" }}
        //                 >
        //                   Hide Action Items
        //                 </button>
        //               ) : (
        //                 <button
        //                   onClick={() => this.showActionItems()}
        //                   className="ui small button"
        //                   style={{ width: "120px", borderRadius: "25px" }}
        //                 >
        //                   Show Action Items
        //                 </button>
        //               )}
        //               <View style={{ textAlign: "center" }}>
        //                 <ul
        //                   style={{ textAlign: "left", display: "inline-block" }}
        //                 >
        //                   {this.state.userData.goals.map(mygoal => {
        //                     return (
        //                       <View
        //                         key={mygoal.goal[0]}
        //                         style={{ paddingTop: "30px" }}
        //                       >
        //                         <li style={{ padding: "10px" }}>
        //                           {mygoal.goal[2].completion_status ===
        //                           100.0 ? (
        //                             <View>
        //                               <h3
        //                                 style={{
        //                                   textDecoration: "line-through"
        //                                 }}
        //                               >
        //                                 {mygoal.goal[1]}{" "}
        //                                 <i
        //                                   className="em em-white_check_mark"
        //                                   aria-roledescription="presentation"
        //                                   aria-label="WHITE HEAVY CHECK MARK"
        //                                 ></i>{" "}
        //                               </h3>
        //                               <h4>Congrats! You smashed your goal!</h4>
        //                             </View>
        //                           ) : (
        //                             <h3>{mygoal.goal[1]}</h3>
        //                           )}{" "}
        //                         </li>
        //                         {this.props.dataSource.goals[0].numOfGoals ===
        //                         0 ? null : mygoal.goal[2].completion_status ===
        //                           "" ? (
        //                           <h4 style={{ display: "inline" }}>
        //                             {" "}
        //                             You haven't set any action items for this
        //                             goal.
        //                           </h4>
        //                         ) : (
        //                           <h4
        //                             style={{
        //                               display: "inline",
        //                               paddingLeft: "10px"
        //                             }}
        //                           >
        //                             Completion Status:{" "}
        //                             {Math.round(
        //                               mygoal.goal[2].completion_status
        //                             ) + "%"}
        //                           </h4>
        //                         )}{" "}
        //                         <br></br>
        //                         {/* this next part of code checks if the user wants to see the action items for their goals. 
        //               If the goal is completed it is striked out as complete. This logic also looks at whether 
        //               the action item is an empty string and does not display it if it is an empty string. */}
        //                         {this.state.showActionItems ? (
        //                           // <View style={{ border: "solid", borderColor: "purple", borderRadius: "20%", padding: '5px' }}>
        //                           <View>
        //                             <h4
        //                               style={{
        //                                 color: "black",
        //                                 paddingLeft: "10px",
        //                                 paddingTop: "10px"
        //                               }}
        //                             >
        //                               {" "}
        //                               <b>Action Items:</b>
        //                             </h4>
        //                             <ul>
        //                               {mygoal.action.map((myAction, index) => {
        //                                 return myAction.action !== "" ? (
        //                                   myAction.isComplete ? (
        //                                     <li
        //                                       key={index}
        //                                       style={{ padding: "10px" }}
        //                                     >
        //                                       <h4
        //                                         style={{
        //                                           color: "black",
        //                                           textDecoration: "line-through"
        //                                         }}
        //                                       >
        //                                         {myAction.action}{" "}
        //                                         <i
        //                                           className="em em-white_check_mark"
        //                                           aria-roledescription="presentation"
        //                                           aria-label="WHITE HEAVY CHECK MARK"
        //                                         ></i>
        //                                       </h4>
        //                                     </li>
        //                                   ) : (
        //                                     <li
        //                                       key={index}
        //                                       style={{ padding: "10px" }}
        //                                     >
        //                                       <h4
        //                                         style={{
        //                                           paddingRight: "15px",
        //                                           color: "white",
        //                                           textAlign: "left",
        //                                           display: "inline-block"
        //                                         }}
        //                                       >
        //                                         {myAction.action}
        //                                       </h4>
        //                                       <button
        //                                         onClick={() =>
        //                                           this.handleCompletedActionItem(
        //                                             myAction.id
        //                                           )
        //                                         }
        //                                       >
        //                                         Completed
        //                                       </button>
        //                                     </li>
        //                                   )
        //                                 ) : null;
        //                               })}
        //                             </ul>{" "}
        //                           </View>
        //                         ) : null}
        //                         <br></br>
        //                         {this.props.userData.goals[0].numOfGoals ===
        //                           0 || !this.state.showDeleteButton ? null : (
        //                           <button
        //                             key={mygoal.goal[0]}
        //                             className="ui small red button"
        //                             onClick={e => this.handleDeleteClick(e)}
        //                             style={{ borderRadius: "25px" }}
        //                           >
        //                             Delete Goal
        //                           </button>
        //                         )}
        //                         <br></br>
        //                         <br></br>
        //                       </View>
        //                     );
        //                   })}
        //                 </ul>{" "}
        //               </View>
        //             </View>
        //           )}
        //         </View>
        //         )}
        //         {!this.state.showNewGoalForm ? (
        //           <button
        //             onClick={() => this.setState({ showNewGoalForm: true })}
        //             className="ui small green button"
        //             style={{ borderRadius: "25px" }}
        //           >
        //             Add New Goal
        //           </button>
        //         ) : null}
        //         <br></br>
        //         <br></br>
        //         <button
        //           onClick={() => this.props.history.push("/")}
        //           className="ui small button"
        //           style={{ borderRadius: "25px" }}
        //         >
        //           Back To Home
        //         </button>
        //       </View>
        //     </View>
        //   </View>
        // </View>
      )}
    </View>
  );
};

export default GoalsScreen;
