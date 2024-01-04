import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Image, View, FlatList, Text, StyleSheet} from 'react-native'
import DisplayMovies from './DisplayMovies'
import axios from 'axios'

const UpComming = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
    
      const getData= async ()=> {
          const options = {
              method: 'GET',
              url: 'https://api.themoviedb.org/3/movie/upcoming',
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

  return (
       <View>
          <FlatList 
              keyExtractor={item => item.id}
              data={data}
              renderItem={({item})=><DisplayMovies movie={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
          />
       </View>
  )
}
const styles = StyleSheet.create({
   
})

export default UpComming