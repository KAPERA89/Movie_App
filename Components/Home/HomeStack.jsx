import React from 'react' 
import Home from './Home';
import SeeAllPopular from './SeeAllPopular';
import { createStackNavigator } from '@react-navigation/stack';
import SeeAllTopRated from './SeeAllTopRated'
import SeeAllUpComming from './SeeAllUpComming'
import MovieDetail from './MovieDetail';


const HomeStack = ({ navigation, route }) => {

const Stack = createStackNavigator();


  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SeeAll" component={SeeAllPopular}  />
      <Stack.Screen name="SeeAll2" component={SeeAllTopRated}  />
      <Stack.Screen name="SeeAll3" component={SeeAllUpComming} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default HomeStack