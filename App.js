import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Search from './Components/SearchComponent/Search.jsx';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import Home from './Components/Home/Home.jsx';
import Ionic from 'react-native-vector-icons/Ionicons.js' 
import Favorite from './Components/Home/Favorite.jsx';
import HomeStack from './Components/Home/HomeStack.jsx';


export default function App() {

  const Tab = createMaterialBottomTabNavigator();


  return (
    <NavigationContainer>
      <Tab.Navigator 
        barStyle={{ backgroundColor: '#000', height:95}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
            }
            return <Ionic name={iconName} size='27' color={'#f45b00'}/>;
          },
          
        })}
      >
          <Tab.Screen name='Home' component={HomeStack} />
          <Tab.Screen name="Search" component={Search}/>
          <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





