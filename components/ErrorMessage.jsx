import { COLORS } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const ErrorMessages = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily:"outfit-medium",
    color: COLORS.RED,
  },
});

export default ErrorMessages;
