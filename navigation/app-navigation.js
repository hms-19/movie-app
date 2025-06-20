import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/personScreen';
import SearchScreen from '../screens/searchScreen';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false
      }} />
      <Stack.Screen name="Movie" component={MovieScreen} options={{
          headerShown: false
      }} />
      <Stack.Screen name="Person" component={PersonScreen} options={{
          headerShown: false
      }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{
          headerShown: false
      }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}