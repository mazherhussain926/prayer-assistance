import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment-hijri";
import { COLORS } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { hijriMonths } from "@/constants/HijriMonths";

export default function CalendarScreen() {
  const [hijriDate, setHijriDate] = useState(" ");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const todayHijri = formatHijriDate(moment());
    setHijriDate(todayHijri);
  }, []);

  const handleDayPress = (day) => {
    const selectedHijri = formatHijriDate(moment(day.dateString, "YYYY-MM-DD"));
    setHijriDate(selectedHijri);
    setSelectedDate(day.dateString);
  };

  const formatHijriDate = (date) => {
    const hijriYear = date.iYear();
    const hijriMonth = date.iMonth();
    const hijriDay = date.iDate();
    const hijriDayName = date.format("dddd");
    return `${hijriDayName}, ${hijriDay} ${hijriMonths[hijriMonth]}, ${hijriYear} AH`;
  };

  const getMarkedDates = () => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: COLORS.BLUE1,
        selectedTextColor: "#FFF",
      },
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 15 }}>
        <View style={styles.hijriContainer}>
          <Text style={[styles.hijriText, styles.calendarText]}>Calendar</Text>
        </View>
        <Calendar
          current={moment().format("YYYY-MM-DD")}
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          theme={{
            backgroundColor: "#FFF",
            calendarBackground: "#FFF",
            textSectionTitleColor: "#B6C1CD",
            selectedDayBackgroundColor: COLORS.BLUE1,
            selectedDayTextColor: "#FFF",
            todayTextColor: COLORS.RED,
            dayTextColor: COLORS.GRAY4,
            textDisabledColor: "#D9E1E8",
            dotColor: "#00ADF5",
            selectedDotColor: "#FFF",
            arrowColor: COLORS.BLUE1,
            monthTextColor: COLORS.BLUE1,
            textDayFontFamily: "outfit-medium",
            textMonthFontFamily: "outfit-bold",
            textDayHeaderFontFamily: "outfit-medium",
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
          enableSwipeMonths={true}
        />
        {hijriDate && (
          <View style={styles.hijriContainer}>
            <Text style={styles.hijriText}>{hijriDate}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  calendarText: {
    fontSize: 28,
  },
  hijriContainer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  hijriText: {
    fontSize: 20,
    color: COLORS.BLUE1,
    fontFamily: "outfit-medium",
  },
});
