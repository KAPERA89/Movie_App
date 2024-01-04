import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { StyleSheet, View, ScrollView, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Discover from './Discover'
import {StatusBar} from 'expo-status-bar'
import SafeAreaView from 'react-native-safe-area-view'
import DisplayMovies from './DisplayMovies'
import TopRated from './TopRated'
import UpComming from './Upcomming'
import {useNavigation} from '@react-navigation/native'



const Home = () => {

    const [data, setData] = useState([])
    const [randomMovie, setRandomMovie] = useState({});
    const navigation = useNavigation()
    
useEffect(()=>{
    
    const getData= async ()=> {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {
              include_adult: 'false',
              include_video: 'false',
              language: 'en-US',
              page: '1',
              sort_by: 'popularity.desc'
            },
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
            }
          };
          
        await axios
            .request(options)
            .then(function (response) {
              //console.log(response.data.results);
              setData(response.data.results)
            })
            .catch(function (error) {
              //console.error(error);
            });
    }
    getData()
    },[])

    const getRandomMovie = () => {
      const randomIndex = Math.floor(Math.random() * (data.length || 0));
      return data[randomIndex];
    };
  
   
    useEffect(() => {
      if (data && data.length) {
        const initialRandomMovie = getRandomMovie();
        setRandomMovie(initialRandomMovie);
      }
    }, [data]);


  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
          <Discover movie={randomMovie}/>
          <View style={styles.vi}>
            <Text style={styles.popular}>Popular</Text>
            <TouchableOpacity>
              <Text style={styles.txt} onPress={()=>navigation.navigate('SeeAll')}>See All</Text>
            </TouchableOpacity>
          </View>
          {data && 
            <FlatList 
                keyExtractor={item => item.id}
                data={data}
                renderItem={({item})=><DisplayMovies movie={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
          }
          <View style={styles.vi}>
            <Text style={styles.popular}>Top Rated</Text>
            <Text style={styles.txt} onPress={()=>navigation.navigate('SeeAll2')}>See All</Text>
          </View>
          <TopRated/>
          <View style={styles.vi}>
            <Text style={styles.popular}>UpComming</Text>
            <Text style={styles.txt} onPress={()=>navigation.navigate('SeeAll3')}>See All</Text>
          </View>
          <UpComming/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#191919',
    },
    popular:{
      paddingTop : 35,
      fontSize:'30',
      paddingLeft:10,
      color:'#fff',
      fontWeight:'600',
      paddingBottom: 25,
      flex:1
    },
    vi:{
        display:'flex',
        flexDirection:'row'
    },
    txt:{
      color:'#f45b00',
      paddingTop : 45,
      fontSize:'17',
      paddingRight:10,
      fontWeight:'bold'
    }
})

export default Home