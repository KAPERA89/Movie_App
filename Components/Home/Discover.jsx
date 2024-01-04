import React from 'react'
import { Image, SafeAreaView, Button, StyleSheet, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign.js'
import Feather from 'react-native-vector-icons/Feather.js'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Discover = (props) => {

  //console.log(props.movie)  
  const navigation = useNavigation()

  const storeData = async (movie) => {
    try {
      const existingFavoritesString = await AsyncStorage.getItem('favorites');
      const existingFavorites = existingFavoritesString ? JSON.parse(existingFavoritesString) : [];

      const isMovieInFavorites = existingFavorites.some((fav) => fav.id === movie.id);

      if (!isMovieInFavorites) {
       
        existingFavorites.push(movie);
        await AsyncStorage.setItem('favorites', JSON.stringify(existingFavorites));
        alert('Movie added to My List!');
      } else {
      
        alert('Movie is already in My List!');
      }
    } catch (error) {
      console.error('Error storing movie in My List:', error);
    }
  };
 


  return (
    <SafeAreaView style={styles.container}>
      <View> 
        <Image source={{uri: `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}} style={styles.posterImage}/>
      </View>
      <View style={styles.overlay} />
      <View style={styles.v2}>
        <View style={styles.buttonWrapper}>
          <AntDesign name="pluscircleo"  size='30' color={"#fff"} onPress={() => storeData(props.movie)}/>
          <Button title="My List" color={"#fff"} style={styles.button} onPress={() => storeData(props.movie)}/>
        </View>
        <View style={styles.buttonWrapper}>
          <Feather name="info" size='30' color={"#fff"}  onPress={() => navigation.navigate('MovieDetail', { movieId: props.movie.id})}/>
          <Button title="Info" color={"#fff"} style={[styles.button, styles.infoButton]}  onPress={() => navigation.navigate('MovieDetail', { movieId: props.movie.id})}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    position: 'relative'
  },
  posterImage: {
    height: 600,
    resizeMode: 'cover',
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  v2:{
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginHorizontal:20
  },
  button: {
    marginLeft: 10, 
    backgroundColor: '#fff', 
    paddingHorizontal: 10, 
    borderRadius: 5, 
    fontWeight: 'bold',
  },
  infoButton: {
    alignSelf: 'flex-end', 
    
  },
   buttonWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default Discover