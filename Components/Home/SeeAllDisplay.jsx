import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, SafeAreaView} from 'react-native'
import {useNavigation} from '@react-navigation/native'


const SeeAllDisplay = (props) => {

    //console.log(props)
    const navigation = useNavigation()

  return (
       <SafeAreaView style={styles.container}>
        <TouchableOpacity  style={{marginVertical: 7, marginHorizontal:10}} 
         onPress={() => navigation.navigate('MovieDetail', { movieId: props.movie.id})}
        >
           <Image source={{uri :`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}}
            style={styles.posterImage}
            />
            <Text style={styles.movieTitle}>{props.movie.title}</Text>
        </TouchableOpacity>
        </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    posterImage: {
        height: 200,
        width: 123,
        borderRadius: 10,
        resizeMode: 'cover',
      },
      movieTitle: {
        color: '#fff',
        width: 123,
        textAlign: 'center',
        marginTop: 10,
        fontSize: '16',
      },
})

export default SeeAllDisplay