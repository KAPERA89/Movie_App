import React ,{useState, useEffect} from 'react'
import { SafeAreaView, TextInput, StyleSheet, View, Text, FlatList, Image } from 'react-native'
import axios from 'axios'
import Film from './Film'


const SearchCopy = () => {
    const [text, setText] = useState("Avatar")
    const [movies, setMovies] = useState()


    useEffect(()=>{
        if(text.length >= 3){
            axios.post("http://127.0.0.1:8000/recommend", {
                movie_name:text
            })
            .then(res=>{
                
                setMovies(res.data.recommendations)
                //console.log(movies)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }, [text])

  
 
  return (
    <SafeAreaView>
        <TextInput 
        style={styles.input} 
        onChangeText={(v)=>{setText(v)}}
        placeholder="Search Movie"
        />
       
        <FlatList 
                style={styles.flat}
                data={movies} 
                renderItem={({item}) => {return(<Film title={item.title} poster={item.poster_url}/>)}}
                keyExtractor={(item,index)=>String(index)}
        /> 

        {/* {movies && 
        <View style={styles.container}>
             <Film title={movies[0].title} poster={movies[0].poster_url}/> 
        </View>} */}
        
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
  },
  poster: {
    width:100,
    height:200
  },
  container: {
    flex: 1,
  },
  flat:{
    marginBottom:70
  }
});

export default SearchCopy