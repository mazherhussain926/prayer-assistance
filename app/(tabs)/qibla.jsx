import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { Magnetometer } from "expo-sensors";
import { Context } from "../../context/app-context";
import ErrorMessages from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import {COLORS} from "../../constants/Colors"

const Qibla = () => {
  const { location, errorMsg, loading: locationLoading } = useContext(Context);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [magnetometer, setMagnetometer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      const fetchQiblaDirection = async () => {
        try {
          const response = await axios.get(
            `http://api.aladhan.com/v1/qibla/${location.latitude}/${location.longitude}`
          );
          setQiblaDirection(response.data.data.direction);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching Qibla direction: ", error);
          setLoading(false);
        }
      };

      fetchQiblaDirection();

      const subscription = Magnetometer.addListener((data) => {
        let { x, y } = data;
        setMagnetometer(Math.atan2(y, x) * (180 / Math.PI));
      });

      return () => {
        subscription && subscription.remove();
      };
    }
  }, [location]);

  if (locationLoading || loading || !magnetometer) {
    return <Loader />;
  }

  if (errorMsg) {
    return <ErrorMessages message={errorMsg} />;
  }

  if (!qiblaDirection) {
    return <ErrorMessages message="Unable to get Qibla direction" />;
  }

  const angle = qiblaDirection - magnetometer;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.compassContainer}>
          <Image
            source={require("../../assets/compass-needle.png")}
            style={[styles.needle, { transform: [{ rotate: `${angle}deg` }] }]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Qibla Direction: {qiblaDirection.toFixed(2)}°
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  compassContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  needle: {
    width: 250,
    height: 250,
    position: "absolute",
  },
  textContainer: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily:"outfit-bold",
    color:COLORS.GRAY4
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Qibla;
