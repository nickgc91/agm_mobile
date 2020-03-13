import React from "react";
import { Button, ButtonGroup } from "react-native-elements";
import API from '../components/API'
import { useEffect, useState } from "react";
import NewJournalEntryForm from '../components/NewJournalEntryForm'
import Icon from "react-native-vector-icons/AntDesign";

import { connect } from "react-redux";


import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  YellowBox,
  TextInput
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#02075d",
    textAlign: "center",
    alignContent: "center"
  },
  whiteTitle: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    borderRadius: 30,
  },
  greenBackground: {
    borderRadius: 20,
    backgroundColor: "#013220",
    alignItems: "center"
  },
  titleBox: {
    borderRadius: 40
  },
  theButton: {
    borderRadius: 50
  },
  redBig: {
    borderRadius: 40,
    textAlign: "center",
    padding: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "yellow",
  },
  entriesListStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    textDecorationLine: 'underline',
  },
  inputStyle: {
    borderRadius: 20,
    padding: 10,
    height: "60%",
    borderWidth: 1,
    borderColor: "#9E9E9E",
    backgroundColor: "#FFFFFF"
  },
  buttonStyle: {
    textAlign: "center",
    marginBottom: 20,
    width: 150
  },
  
});

const JournalScreen = ({ userData, setGoalData }, props) => {
  useEffect(() => {
    getData();
  }, []);
  
  // const [text, setText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);



  function updateIndex(selectedIndex) {
    console.log(selectedIndex)
    setSelectedIndex(selectedIndex)
  }


  function saveNewJournalEntry(journalEntry) {
    API.createNewJournalEntry(journalEntry)
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          return response
        }
      })
      .catch(error => {
        alert(error);
      })
      .then(getData());
  }

  function deleteJournalItem(journalEntry) {
    API.deleteJournalEntry(journalEntry)
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          return response
        }
      })
      .catch(error => {
        alert(error);
      })
      .then(getData());
  }



  function getData() {
    API.getUserData()
      .then(response => {
        if (response.error) {
          throw Error(response.error);
        } else {
          setGoalData(response)
        }
      })
      .catch(error => {
        alert(error);
      });
  }

    const buttons = ['WRITE', 'VIEW ENTRIES']


    return !userData ? <View>
      <TextInput>Loading data</TextInput>
      </View> : (
      
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <View>
              <Text style={styles.whiteTitle}>Journaling</Text>
            </View>
            <ButtonGroup
              onPress={updateIndex.bind(this)}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 50,  borderRadius: 20,  }}
            />
            {selectedIndex === 0 ? (
              <NewJournalEntryForm saveNewJournalEntry={saveNewJournalEntry} />
             ) : (
            <View style={styles.container}>
              {userData.journalings.map((element, index) => {
            return (
              <View key={element.journal_id} style={{ alignItems: 'center' }}>
              <TextInput style={styles.entriesListStyle}>{element.journal_title}</TextInput>
              <Button
                          icon={<Icon name="closecircle" size={15} color="white" />}
                          type="outline"
                          color="white"
                          style={{ borderRadius: 20, width: 75, backgroundColor: "red", marginBottom: 20 }} 
                          onPress={() => {
                            console.log(element.journal_id)
                            deleteJournalItem({journalId: element.journal_id})}

                          }
                          />
              </View>
            )})}
            </View> )}
          </View>
        </ScrollView>
      </View>
    );
}

const mapStateToProps = state => ({
  userData: state.data
});

const mapDispatchToProps = dispatch => ({
  setGoalData: data => {
    dispatch({ type: "SET_GOAL_DATA", payload: data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalScreen);
