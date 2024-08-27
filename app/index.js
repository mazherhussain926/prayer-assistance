import React from "react";
import { View, Text, Pressable, Image,StyleSheet, } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
export default function LandingPage() {
const features = [
  {
    icon: require("../assets/images/welcome/clock.png"),
    title: "Automatic Prayer Times",
    description: "Automatically determine prayer times based on the user's location",
  },
  {
    icon: require("../assets/images/welcome/reminder.png"),
    title: "Prayer Notifications",
    description: "Provide notifications for each prayer time",
  },
  {
    icon: require("../assets/images/welcome/qibla.png"),
    title: "Qibla Direction",
    description: "Display the accurate Qibla direction based on the user's location",
  },
];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="transparent" translucent={true} />
      
      <Image
        source={require("../assets/images/welcome/mosque.png")}
        style={styles.coverImage}
      />

      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/images/welcome/mosque2.png")}
          style={styles.logo}
        />
        
        <Text style={styles.title}>Muslim Worship Assistant</Text>
        <Text style={styles.description}>
          Provides prayer time, qibla direction, and notifications to enhance daily worship
        </Text>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index}>
              <View style={styles.featureItem}>
                <Image source={feature.icon} style={styles.icon} />
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <AntDesign name="checkcircle" size={24} color={COLORS.CYAN} style={styles.checkIcon} />
              </View>
              {index < features.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        <Pressable style={styles.button} onPress={()=> router.replace("(tabs)")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  coverImage: {
    height: 330,
    width:"100%",
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: -50,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -40,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "outfit-bold",
    fontSize: 24,
  },
  description: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 14,
    paddingHorizontal: 40,
    color: COLORS.GRAY4,
    marginTop:10
  },
  featuresContainer: {
   paddingVertical:10,
    marginHorizontal: 20,
  },
  featureItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "center",
    marginTop: 15,
  },
  featureTextContainer: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  featureTitle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  featureDescription: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: COLORS.GRAY4,
  },
  checkIcon: {
    marginTop: 15,
  },
  separator: {
    height: 1,
    borderWidth: 0.5,
    borderColor: COLORS.GRAY3,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: COLORS.BLUE1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: "#FFF",
  },
});
