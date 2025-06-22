import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from '../screens/homeScreen';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/personScreen';
import SearchScreen from '../screens/searchScreen';
import MovieListScreen from '../screens/movieListScreen';
import SideMenu from '../components/SideMenu';
import { Dimensions } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('window');
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MovieList" component={MovieListScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <SideMenu {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: { backgroundColor: '#171717', width: width*0.8 },
          }}
        >
          <Drawer.Screen name="Main" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
