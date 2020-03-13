import * as WebBrowser from "expo-web-browser";
import React from "react";
import API from "../components/API";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

const HomeScreen = () => {
  const [status, setStatus] = React.useState([]);

  useEffect(() => {
    getStatusUpdate();
  }, []);

  function getStatusUpdate() {
    API.provideMastermindUpdates()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          setStatus(data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      {status.actionUpdates === undefined ? (
        <Text>Loading Data</Text>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={[styles.pinkBig]}>
            {/* remember to change name below */}
            <Text style={[styles.pinkBig]}>
              Welcome back Imran! {`\n`} Here are the latest group updates...
            </Text>
          </View>

          <View style={[styles.redBig]}>
            <Text style={[styles.whiteTitle]}>Latest Action Taken</Text>
            {status.actionUpdates.map((element, index) => {
              return (
              <Text key={index} style={[styles.whiteFont]}>
                {element[1]} took this latest action: {element[0]}
              </Text> )
            })}
          </View>

          <View style={[styles.redBig]}>
            <Text style={[styles.whiteTitle]}>Latest Goals</Text>
            {status.goalUpdates.map((element, index) => {
              return (
              <Text key={index} style={[styles.whiteFont]}>
              {element[1]} is working on this goal:{" "}
              {element[0]}              </Text> )
            })}
          </View>


          <View style={[styles.redBig]}>
            <Text style={[styles.whiteTitle]}>Latest Journaling</Text>
            {status.journalingUpdates.map((element, index) => {
              return (
              <Text key={index} style={[styles.whiteFont]}>
              {element[1]} wrote a journal entry called{" "}
              {element[0]}          
              </Text> )
            })}
          </View>


          <View style={[styles.redBig]}>
            <Text style={[styles.whiteTitle]}>Latest Life Status Updates</Text>
            {status.lifeStatusUpdates.map((element, index) => {
              return (
              <Text key={index} style={[styles.whiteFont]}>
              {element[1]} {element[0]}{" "}
              updated their life status          
              </Text> )
            })}
          </View>

        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02075d",
    textAlign: "center",
    alignContent: "center"
  },
  whiteFont: {
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    color: "white"
  },
  whiteTitle: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    borderRadius: 20
  },
  redBig: {
    textAlign: "center",
    margin: 20,
    backgroundColor: "#013220",
    borderRadius: 20
  },
  pinkBig: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    borderRadius: 20
  },
  contentContainer: {
    paddingTop: 50
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
