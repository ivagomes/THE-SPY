import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SetupScreen from './src/screens/SetupScreen';
import NamesScreen from './src/screens/NamesScreen';
import PassPhoneScreen from './src/screens/PassPhoneScreen';
import RevealScreen from './src/screens/RevealScreen';
import EndRoundScreen from './src/screens/EndRoundScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Setup"
          screenOptions={{
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#F8FAFC',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#0F172A' },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Setup"
            component={SetupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Names"
            component={NamesScreen}
            options={{ title: 'Jogadores' }}
          />
          <Stack.Screen
            name="PassPhone"
            component={PassPhoneScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="Reveal"
            component={RevealScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="EndRound"
            component={EndRoundScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'fade',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
