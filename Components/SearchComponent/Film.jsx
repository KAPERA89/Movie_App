import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'


const Film = (props) => {
    console.log(props)
  return (
        
    <View style={styles.card}>
        <View style={styles.cardContainer}>
            <Image style={styles.poster} source={{uri:props.poster}}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({  
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,   
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#2E2E2E',
      },
      poster: {
        width: 80,
        height: 120,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      contentContainer: {
        flex: 1,
        padding: 10,
      },
      title: {
        fontSize: '18',
        padding:38,
        fontWeight: 'bold',
        color: '#fff',
      },
  });

export default Film