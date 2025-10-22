import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import AscensionsScreen from './src/screens/AscensionsScreen';
import JournalScreen from './src/screens/JournalScreen';

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#020617',
    card: '#040c1a',
    text: '#f8fafc',
  },
};

const tabBarBaseOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#38bdf8',
  tabBarInactiveTintColor: '#94a3b8',
  tabBarStyle: {
    backgroundColor: '#040c1a',
    borderTopColor: 'transparent',
    height: 72,
    paddingBottom: 12,
    paddingTop: 12,
  },
};

const CenterTabButton = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.centerButtonWrapper}>
    <View style={styles.centerButton}>{children}</View>
  </TouchableOpacity>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="light" />
        <Tab.Navigator screenOptions={tabBarBaseOptions}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Ascend"
            component={AscensionsScreen}
            options={{
              tabBarButton: (props) => (
                <CenterTabButton {...props}>
                  <MaterialCommunityIcons name="plus" size={28} color="#f8fafc" />
                </CenterTabButton>
              ),
            }}
          />
          <Tab.Screen
            name="Journal"
            component={JournalScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    top: -16,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
