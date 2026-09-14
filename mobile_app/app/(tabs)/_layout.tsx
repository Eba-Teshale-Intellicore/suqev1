import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/haptic-tab";

import { Colors } from "@/constants/src/theme/colors";
import { Typography } from "@/constants/src/theme/typography";
import { Icons } from "@/constants/src/theme/icons";
import { Radius } from "@/constants/src/theme/radius";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Haptic feedback
        tabBarButton: HapticTab,

        // Colors
        tabBarActiveTintColor: Colors.navigationActive,
        tabBarInactiveTintColor: Colors.navigationInactive,

        // Navigation bar
        tabBarStyle: {
          height: 70,

          backgroundColor: Colors.navigationBackground,

          borderWidth: 1,
          borderColor: Colors.navigationBorder,
          // borderRadius: Radius.circle,
          margin: 1,

          elevation: 0,
          shadowOpacity: 0,
        },

        // Typography
        tabBarLabelStyle: {
          ...Typography.tab,
          marginTop: 2,
        },

        // Items
        tabBarItemStyle: {
          paddingTop: 4,
        },
      }}
    >
      {/* ==================================================
          HOME
      ================================================== */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={
                focused ? Icons.navigation.activeSize : Icons.navigation.size
              }
              color={color}
            />
          ),
        }}
      />

      {/* ==================================================
          EXPLORE
      ================================================== */}

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={
                focused ? Icons.navigation.activeSize : Icons.navigation.size
              }
              color={color}
            />
          ),
        }}
      />

      {/* ==================================================
          SELL
      ================================================== */}

      <Tabs.Screen
        name="add"
        options={{
          title: "Sell",

          tabBarIcon: () => (
            <Ionicons
              name="add-circle"
              size={Icons.add.size}
              color={Colors.primary}
            />
          ),
        }}
      />

      {/* ==================================================
          INBOX
      ================================================== */}

      {/* <Tabs.Screen
        name="message"
        options={{
          title: "Inbox",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={
                focused ? Icons.navigation.activeSize : Icons.navigation.size
              }
              color={color}
            />
          ),
        }}
      /> */}

      {/* ==================================================
          PROFILE
      ================================================== */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={
                focused ? Icons.navigation.activeSize : Icons.navigation.size
              }
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
