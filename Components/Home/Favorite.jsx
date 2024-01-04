import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionic from 'react-native-vector-icons/Ionicons.js'

const Favorite = () => {

  const navigation = useNavigation();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    
    getFavoriteMovies();
  }, [favoriteMovies]);

  const getFavoriteMovies = async () => {
    try {
      
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];

      
      const detailedFavorites = await Promise.all(
        favorites.map(async (favorite) => {
          const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${favorite.id}`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
            }
          };

          const response = await axios
          .request(options)
          .then(function (response) {
            //console.log(response.data.results);
          })
          .catch(function (error) {
            //console.error(error);
            
          });

          // Combine existing favorite data with fetched details
          return { ...favorite, ...response };
        })
      );

      setFavoriteMovies(detailedFavorites);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };
  

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItemContainer}>
      <TouchableOpacity nPoress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.favoriteItemImage} />
      </TouchableOpacity>
      <Text style={styles.favoriteItemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteFromFavorites(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const deleteFromFavorites = async (movieId) => {
    try {
      
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== movieId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      getFavoriteMovies();
    } catch (error) {
      console.error('Error deleting movie from favorites:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container2}>
            <View style={styles.vv1}>
                <Text style={styles.t1} numberOfLines={1} ellipsizeMode="tail">My List</Text>
            </View>
    </View>
    <FlatList
      keyExtractor={(item) => item.id}
      data={favoriteMovies}
      renderItem={renderFavoriteItem}
      numColumns={2} 
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#191919',
  },
  favoriteItemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
  },
  favoriteItemImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  favoriteItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#fff'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    paddingBottom:10,
    backgroundColor:'#131313',
  },
  v1: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  i1: {
    paddingTop: 6,
  },
  vv1: {
    flex: 2,
    alignItems: 'center',
    marginTop:15
  },
  t1: {
    color: '#fff',
    fontWeight:'bold',
    fontSize: '20',
  },
  deleteButton: {
    color: 'red',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  
});

export default Favorite