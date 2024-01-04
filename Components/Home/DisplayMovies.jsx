import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
const DisplayMovies = (props) => {

    //console.log(props)
    const navigation = useNavigation()

  return (
        <TouchableOpacity 
        onPress={() => navigation.navigate('MovieDetail', { movieId: props.movie.id})}
        style={{marginHorizontal: 7}}>
           <Image source={{uri :`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}}
            style={styles.posterImage}
            />
            <Text style={styles.movieTitle}>{props.movie.title}</Text>
        </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    posterImage: {
        height: 250,
        width: 150,
        borderRadius: 10,
        resizeMode: 'cover',
      },
      movieTitle: {
        color: '#fff',
        width: 150,
        textAlign: 'center',
        marginTop: 10,
        fontSize: '16',
      },
})

export default DisplayMovies