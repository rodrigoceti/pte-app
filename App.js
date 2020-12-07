//import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "./Home";
import Admin from "./Admin";
import Header from "./Header";

const Tab = createBottomTabNavigator();

function getIconByRouteName(name) {
  switch (name.toLowerCase()) {
    case "home":
      return "home";
    case "admin":
      return "user-shield";
    default:
      return "home";
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            return (
              <FontAwesome5
                name={getIconByRouteName(route.name)}
                size={24}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#7a63ff",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen icon="home" name="Home" component={Home} />
        <Tab.Screen icon="user-shield" name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
