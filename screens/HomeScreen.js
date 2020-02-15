import * as WebBrowser from "expo-web-browser";
import React from "react";
import API from "../components/API";
import { connect } from "react-redux";
import { useEffect } from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

const HomeScreen = () => {
  const [status, setStatus] = React.useState([]);

  useEffect(() => {
    getStatusUpdate();
  });

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
      {status.actionUpdates === undefined ? <Text>Loading Data</Text> :
    (
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
        <Text style={[styles.pinkBig]}>Welcome back **name**! {`\n`} Here are the latest group updates...</Text>
        </View>

        <View style={[styles.redBig]}>
        <Text style={[styles.whiteTitle]}>Latest Action Taken</Text>
          <Text style={[styles.whiteFont]}>{status.actionUpdates[0][1]} took this latest action: {status.actionUpdates[0][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.actionUpdates[1][1]} took this latest action: {status.actionUpdates[1][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.actionUpdates[2][1]} took this latest action: {status.actionUpdates[2][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.actionUpdates[3][1]} took this latest action: {status.actionUpdates[3][0]}</Text>
          {/* <Text style={[styles.whiteFont]}>{status.actionUpdates[4][1]} took this latest action: {status.actionUpdates[4][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.actionUpdates[5][1]} took this latest action: {status.actionUpdates[5][0]}</Text> */}
          </View>

          <View style={[styles.redBig]}>
        <Text style={[styles.whiteTitle]}>Latest Goals</Text>
          <Text style={[styles.whiteFont]}>{status.goalUpdates[0][1]} is working on this goal: {status.goalUpdates[0][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.goalUpdates[1][1]} is working on this goal: {status.goalUpdates[1][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.goalUpdates[2][1]} is working on this goal: {status.goalUpdates[2][0]}</Text>
          </View>

          <View style={[styles.redBig]}>
          <Text style={[styles.whiteTitle]}>Latest Journaling</Text>
          <Text style={[styles.whiteFont]}>{status.journalingUpdates[0][1]} wrote a journal entry called {status.journalingUpdates[0][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.journalingUpdates[1][1]} wrote a journal entry called {status.journalingUpdates[1][0]}</Text>
          <Text style={[styles.whiteFont]}>{status.journalingUpdates[2][1]} wrote a journal entry called {status.journalingUpdates[2][0]}</Text>
          </View>

          <View style={[styles.redBig]}>
          <Text style={[styles.whiteTitle]}>Latest Life Status Updates</Text>
          <Text style={[styles.whiteFont]}>{status.lifeStatusUpdates[0][1]} {status.lifeStatusUpdates[0][0]} updated their life status</Text>
          <Text style={[styles.whiteFont]}>{status.lifeStatusUpdates[1][1]} {status.lifeStatusUpdates[1][0]} updated their life status</Text>
          <Text style={[styles.whiteFont]}>{status.lifeStatusUpdates[2][1]} {status.lifeStatusUpdates[2][0]} updated their life status</Text>
               </View>

      </ScrollView> )}
    </View>
  );
};

export default HomeScreen;

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green"
  },
  whiteFont: {
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    color: "white",
  },
  whiteTitle: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    borderRadius: 30,
    textDecorationLine: 'underline',
  },
  redBig: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "red",
    backgroundColor: "navy",
    borderRadius: 30,

  },
  pinkBig: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "navy",
    backgroundColor: "pink",
    borderRadius: 30,

  },
  greenBig: {
    textAlign: "center",
    margin: 20,
    fontSize: 35,
    color: "white",
    backgroundColor: "green"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
