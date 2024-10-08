import React from "react";
import {
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";
import { Tabs } from "expo-router";

export default function TabBarLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={24} color={COLORS.BLUE1} />
              ) : (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={COLORS.GRAY4}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="salat"
          options={{
            tabBarLabel: "Salat",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="moon" size={24} color={COLORS.BLUE1} />
              ) : (
                <Ionicons name="moon-outline" size={24} color={COLORS.GRAY4} />
              ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="calendar-number-sharp" size={24} color={COLORS.BLUE1} />
              ) : (
                <Ionicons name="calendar-number-outline" size={24} color={COLORS.GRAY4} />
              ),
          }}
        />
        <Tabs.Screen
          name="qibla"
          options={{
            tabBarLabel: "Qibla",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="mosque" size={24} color={COLORS.BLUE1} />
              ) : (
                <FontAwesome5
                  name="mosque"
                  size={24}
                  color={COLORS.GRAY4}
                />
              ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  tabBarLabel: {
    color: COLORS.GRAY4,
    fontFamily: "outfit-medium",
    fontSize: 12,
    marginBottom: 15,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    elevation: 10,
    height: 80,
    backgroundColor: "#FFF",
    borderTopWidth: 0,
  },
});
