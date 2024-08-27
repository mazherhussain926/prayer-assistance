import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import moment from "moment-hijri";
import { hijriMonths } from "../constants/HijriMonths";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);

  //For Hijri date
  useEffect(() => {
    const todayHijri = formatHijriDate(moment());
    setHijriDate(todayHijri);
  }, []);

  const formatHijriDate = (date) => {
    const hijriYear = date.iYear();
    const hijriMonth = date.iMonth();
    const hijriDay = date.iDate();
    const hijriDayName = date.format("dddd");
    return `${hijriDayName}, ${hijriDay} ${hijriMonths[hijriMonth]}, ${hijriYear} AH`;
  };

  useEffect(() => {
    const fetchPermissionsAndLocation = async () => {
      try {
        // Request location permissions
        let { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setLoading(false);
          return;
        }

        // Request notification permissions
        const { status: notificationStatus } =
          await Notifications.requestPermissionsAsync();
        setNotificationPermission(notificationStatus === "granted");

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const { latitude, longitude } = userLocation.coords;
        setLocation(userLocation.coords);

        try {
          const [reverseGeocodeResult] = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
          );
          if (reverseGeocodeResult) {
            setCity(reverseGeocodeResult.city || "Unknown City");
            setCountry(reverseGeocodeResult.country || "Unknown Country");
          }
        } catch (geoError) {
          console.error("Error during reverse geocoding:", geoError);
          setCity("Error fetching city");
        }

        setLoading(false);
      } catch (error) {
        setErrorMsg("Error fetching location");
        setLoading(false);
      }
    };

    fetchPermissionsAndLocation();
  }, []);

  useEffect(() => {
    if (notificationPermission) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    }
  }, [notificationPermission]);

  return (
    <Context.Provider
      value={{
        location,
        city,
        country,
        errorMsg,
        loading,
        notificationPermission,
        hijriDate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
