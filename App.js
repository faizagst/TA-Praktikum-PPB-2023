import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './pages/HomeScreen';
import KDramaScreen from './pages/KDramaScreen';
import KFilmScreen from './pages/KFilmScreen';
import KDramaDetailScreen from './pages/KDramaDetailScreen';
import KFilmDetailScreen from './pages/KFilmDetailScreen';
import AboutScreen from './pages/AboutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'K-Drama') {
              iconName = focused ? 'film' : 'film-outline';
            } else if (route.name === 'K-Movies') {
              iconName = focused ? 'videocam' : 'videocam-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#b00000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopColor: 'gray',
            borderTopWidth: 1,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="K-Drama" component={KDramaScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="K-Movies" component={KFilmScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="KDramaDetails" component={KDramaDetailScreen} options={{ tabBarButton: () => null, headerShown: false }} />
        <Tab.Screen name="KFilmDetails" component={KFilmDetailScreen} options={{ tabBarButton: () => null, headerShown: false }} />
        <Tab.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
