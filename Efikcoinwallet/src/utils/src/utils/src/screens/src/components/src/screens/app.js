import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SendScreen from './src/screens/SendScreen';
import ReceiveScreen from './src/screens/ReceiveScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: '#f59e0b',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EfikCoin' }} />
        <Stack.Screen name="Send" component={SendScreen} options={{ title: 'Send ECE' }} />
        <Stack.Screen name="Receive" component={ReceiveScreen} options={{ title: 'Receive ECE' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
