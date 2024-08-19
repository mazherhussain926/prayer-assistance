import React from "react";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name ="index" 
      options={{
        title:"Home"
      }}
      />
      <Tabs.Screen name ="salat"
       options={{
        title:"Salat"
      }}
      />
      <Tabs.Screen name ="calendar"
       options={{
        title:"Calendar"
      }}
      />
      <Tabs.Screen name ="profile"
       options={{
        title:"Account"
      }}
      />
    </Tabs>
  )}