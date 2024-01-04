import React ,{useState, useEffect} from 'react'
import { SafeAreaView, TextInput, StyleSheet, View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import axios from 'axios'
import Film from './Film'
import SeeAllDisplay from '../Home/SeeAllDisplay'


const Search = () => {
    const [movies, setMovies] = useState()
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(()=>{
      const getMovies = async ()=>{
        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/search/movie`,
          params: {query: text, include_adult: 'false', language: 'en-US', page: page.toString()},
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
          }
        };
  
        if(text.length >= 3){
         await axios.request(options)
          .then(res=>{
              //setMovies((prevData) => [...prevData, ...res.data.results]);
              setMovies(res.data.results)
              console.log(res.data.results)
              setIsLoading(false);
          })
          .catch(err=>{
              console.log(err)
          })
      }
      }

    getMovies()
    },[text])
 

    // const handleLoadMore = () => {
    //   setPage((prevPage) => prevPage + 1);
    // };

  return (
    <SafeAreaView style={styles.container}>
        <TextInput 
        style={styles.input} 
        onChangeText={(v)=>{setText(v)}}
        placeholder="Search Movie"
        />
       
                
          {!isLoading ? 
          <FlatList
          keyExtractor={(item) => item.id}
          data={movies}
          renderItem={({ item }) =><SeeAllDisplay movie={item} />}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          //onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          style={styles.flt}
        />
          :
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({  
  input: {
    height: 45,
    margin: 12,
    width: 400,
    borderWidth: 1,
    borderRadius:14,
    padding: 10,
    backgroundColor:'#fff'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems:'center',
    height:'100%',
    paddingBottom:200
  },
  container:{
    backgroundColor:'#191919',
    height:'100%',
  },
  flt:{
    marginBottom:10
  }
});

export default Search