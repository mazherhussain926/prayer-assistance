import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { COLORS } from "../constants/Colors";
const CustomWeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    const startOfWeek = moment().startOf("week");
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(startOfWeek.clone().add(i, "days"));
    }

    setCurrentWeek(week);
  }, []);

  const handleDatePress = (day) => {
    setSelectedDate(day);
  };

  return (
    <View style={styles.weekContainer}>
      {currentWeek.map((day) => {
        const isSelected = day.isSame(selectedDate, "day");
        const isSunday = day.day() === 0;
        return (
          <View key={day.toString()} style={styles.dayContainer}>
            <Text
              style={[
                styles.dayText,
                isSunday ? styles.sundayText : styles.defaultDayText,
              ]}
            >
              {day.format("ddd")}
            </Text>
            <TouchableOpacity
              onPress={() => handleDatePress(day)}
              style={[
                styles.dateButton,
                isSelected && styles.selectedDateButton,
              ]}
            >
              <Text
                style={[styles.dateText, isSelected && styles.selectedText]}
              >
                {day.format("D")}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:3,
  },
  dayContainer: {
    alignItems: "center",
    padding: 3,
  },
  dayText: {
    fontSize: 15,
    color: "#FFF",
    fontFamily: "outfit-medium",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  defaultDayText: {
    backgroundColor: COLORS.BLUE1,
  },
  sundayText: {
    backgroundColor: COLORS.RED,
  },
  dateButton: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
    marginVertical: 15,
  },
  selectedDateButton: {
    backgroundColor: COLORS.CYAN,
    marginVertical: 15,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.GRAY4,
    fontFamily: "outfit-medium",
  },
  selectedText: {
    color: "#FFF",
  },
});

export default CustomWeeklyCalendar;
