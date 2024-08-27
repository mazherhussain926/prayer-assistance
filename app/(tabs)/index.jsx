import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { Context } from "../../context/app-context";
import { COLORS } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import CustomWeeklyCalendar from "../../components/CustomWeeklyCalendar";

const Home = () => {
  const [checklist, setChecklist] = useState({});
  const [prayerTimes, setPrayerTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const currentDate = moment().format("YYYY-MM-DD");
  const gregorianDate = moment().format("dddd, D MMMM, YYYY");
  const { hijriDate, location } = useContext(Context);

  useEffect(() => {
    const loadAndResetChecklist = async () => {
      try {
        const storedChecklist = await AsyncStorage.getItem("checklist");
        const parsedChecklist = storedChecklist
          ? JSON.parse(storedChecklist)
          : {};

        if (!parsedChecklist[currentDate]) {
          parsedChecklist[currentDate] = {};
        }

        setChecklist(parsedChecklist);
        await AsyncStorage.setItem(
          "checklist",
          JSON.stringify(parsedChecklist)
        );
      } catch (error) {
        setError("Error loading or resetting checklist");
        console.error("Error loading or resetting checklist:", error);
      }
    };

    const fetchPrayerTimes = async () => {
      if (!location || !location.latitude || !location.longitude) {
        console.warn("Location data is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${location.latitude}&longitude=${location.longitude}`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        setError("Error fetching prayer times");
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAndResetChecklist();
    fetchPrayerTimes();
  }, [currentDate, location]);

  const handleCheckboxChange = async (prayer) => {
    if (!checklist[currentDate]) {
      checklist[currentDate] = {};
    }

    const updatedChecklist = {
      ...checklist,
      [currentDate]: {
        ...checklist[currentDate],
        [prayer]: !checklist[currentDate]?.[prayer],
      },
    };

    setChecklist(updatedChecklist);
    setCurrentPrayer(updatedChecklist[currentDate]?.[prayer] ? prayer : null);
    try {
      await AsyncStorage.setItem("checklist", JSON.stringify(updatedChecklist));
    } catch (error) {
      setError("Error saving checklist");
      console.error("Error saving checklist:", error);
    }
  };

  const anyPrayerChecked = Object.keys(checklist[currentDate] || {}).some(
    (prayer) => checklist[currentDate][prayer]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="auto"
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={require("../../assets/images/welcome/mosque.png")}
        style={styles.coverImage}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 10, marginBottom: 80 }}
      >
        <View style={styles.dateContainer}>
          <Text style={styles.hijriDateText}>{hijriDate}</Text>
          <Text style={styles.gregorianDateText}>{gregorianDate}</Text>
          <CustomWeeklyCalendar />
        </View>
        <Text style={styles.currentChecklistText}>Current Checklist</Text>
        {anyPrayerChecked && currentPrayer && (
          
          <View style={styles.currentChecklistContainer}>
             <Text style={styles.currentChecklistText}>Current Checklist</Text>
            <View style={styles.checklistItem}>
              <Image
                source={require("../../assets/lantern.png")}
                style={styles.lanternImage}
              />
              <View style={styles.prayerInfo}>
                <Text style={styles.prayerText}>{currentPrayer}</Text>
                <Text style={styles.prayerTime}>
                  {prayerTimes[currentPrayer]
                    ? moment(prayerTimes[currentPrayer], "HH:mm").format(
                        "h:mm A"
                      )
                    : "N/A"}
                </Text>
              </View>
              <FontAwesome
                name={
                  checklist[currentDate]?.[currentPrayer]
                    ? "check-circle"
                    : "circle-thin"
                }
                size={28}
                color={
                  checklist[currentDate]?.[currentPrayer] ? COLORS.CYAN : COLORS.GRAY4
                }
              />
            </View>
          </View>
        )}
         <Text style={styles.currentChecklistText}>Past Checklist</Text>
        <View style={styles.checklistContainer}>
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
            <View key={prayer} style={styles.checklistItem}>
              <Image
                source={require("../../assets/lantern.png")}
                style={styles.lanternImage}
              />
              <View style={styles.prayerInfo}>
                <Text style={styles.prayerText}>{prayer}</Text>
                <Text style={styles.prayerTime}>
                  {prayerTimes[prayer]
                    ? moment(prayerTimes[prayer], "HH:mm").format("h:mm A")
                    : "N/A"}
                </Text>
              </View>
              <FontAwesome
                name={
                  checklist[currentDate]?.[prayer]
                    ? "check-circle"
                    : "circle-thin"
                }
                size={28}
                color={checklist[currentDate]?.[prayer] ? COLORS.CYAN : COLORS.GRAY3}
                onPress={(onPress = () => handleCheckboxChange(prayer))}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  coverImage: {
    height: 350,
    width: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: -50,
  },
  dateContainer: {
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 2,
    maringVertical: 5,
  },
  hijriDateText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "outfit-bold",
  },
  gregorianDateText: {
    fontSize: 16,
    color: COLORS.GRAY4,
    fontFamily: "outfit-medium",
  },
  currentChecklistContainer: {
    marginTop:10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  currentChecklistText: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "outfit-bold",
    color: COLORS.GRAY4,
  },
  checklistContainer: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  lanternImage: {
    width: 50,
    height: 40,
    marginRight: 10,
    resizeMode: "cover",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  prayerTime: {
    color: COLORS.GRAY4,
    fontSize: 16,
    fontFamily: "outfit-medium",
    marginTop: 2,
  },
});

export default Home;


