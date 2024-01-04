import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Button, SafeAreaView, Linking, StyleSheet, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Ionic from 'react-native-vector-icons/Ionicons.js'
import DisplayMovies from './DisplayMovies';
import DisplayMoviesRecommendation from './DisplayMoviesRecommended';


const MovieDetail = (props) => {

    //console.log(props.route.params.movieId)
    const [data, setData] = useState([])
   

    useEffect(()=>{
    
        const getData= async ()=> {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${props.route.params.movieId}`,
                params: {language: 'en-US'},
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
                }
              };

              await axios
              .request(options)
              .then(function (response) {
                //console.log(response.data);
                setData(response.data);
              })
              .catch(function (error) {
                //console.error(error);
              });
        }

        getData()
        },[])

        const [trailer, setTrailer] = useState([])

        useEffect(()=>{
        
            const getTrailer= async ()=> {
                const options = {
                    method: 'GET',
                    url: `https://api.themoviedb.org/3/movie/${props.route.params.movieId}/videos`,
                    params: {language: 'en-US'},
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
                    }
                  };
    
                  await axios
                  .request(options)
                  .then(function (response) {
                    //console.log(response.data.results[0]);
                    setTrailer(response.data.results[0]);
                  })
                  .catch(function (error) {
                    //console.error(error);
                  });
            }
    
            getTrailer()
            },[])

            const handleWatchTrailer = () => {
                Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`).catch((err) => console.error('Error opening YouTube link:', err));
            }


            const getGenre = () => {
                if (data && data.genres && data.genres.length > 0) {
                  return data.genres.map((genre) => (
                    <View style={styles.genreContainer} key={genre.id}>
                      <Text style={styles.genre}>{genre.name}</Text>
                    </View>
                  ));
                } else {
                  return <Text>No genres available</Text>;
                }
              };


              const [castData, setCastData] = useState([])

              useEffect(()=>{
              
                  const getCast= async ()=> {
                      const options = {
                          method: 'GET',
                          url: `https://api.themoviedb.org/3/movie/${props.route.params.movieId}/credits`,
                          params: {language: 'en-US'},
                          headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjI4ODAyNjE3YzJkNGQ2Y2NhNWFkNDQ1NTVhYzIxNyIsInN1YiI6IjY0NDE0MWUxYjNmNmY1MDQ5YzlkNmI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb1fcxHPV6s0IgQSwTqoZcsJ2FhlicSgH4d7Hs6k2QY'
                          }
                        };
          
                        await axios
                        .request(options)
                        .then(function (response) {
                          //console.log(response.data.cast);
                          setCastData(response.data.cast);
                        })
                        .catch(function (error) {
                          //console.error(error);
                        });
                  }
          
                  getCast()
                  },[])

        
        const renderCastItem = ({ item }) => (
            <TouchableOpacity style={styles.castItemContainer}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}` }} style={styles.castImage} />
                <Text style={styles.castName}>{item.name}</Text>
            </TouchableOpacity>
         );

         const formatDuration = (durationInMinutes) => {
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;
            return `${hours}h ${minutes}min`;
          };

          const formatBudget = (budget) => {
            if (budget === undefined) {
                return 'no budget'; 
              }

            return budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          };


        const [recommended, setRecommended] = useState()

        useEffect(()=>{
            const getRecommended= async ()=> {
                await axios.post("http://127.0.0.1:8000/recommend", {movie_name:data.title})
                .then(res=>{
                    console.log(res.data.recommendations)
                    setRecommended(res.data.recommendations)
                })
                .catch(err=>{
                    console.log(err)
                })
            }

        getRecommended()
        },[data])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
            <View style={styles.v1}>
                <Ionic name={'chevron-back'} size='25' color={'#0080FE'} style={styles.i1} onPress={() => props.navigation.goBack()} />
                <Button title="Go Back" onPress={() => props.navigation.goBack()} />
            </View>
            <View style={styles.vv1}>
                <Text style={styles.t1} numberOfLines={1} ellipsizeMode="tail">{data.title}</Text>
            </View>
        </View>
        <ScrollView>
            <View>
                <Image source={{uri :`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}}
                    style={styles.posterImage}
                    />
                <TouchableOpacity style={styles.watchTrailerButton} onPress={handleWatchTrailer}>
                        <Text style={styles.watchTrailerButtonText}>Watch Trailer</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.heading}>OverView</Text>
            <Text style={styles.overview}>{data.overview}</Text>

            <View style={styles.detailsContainer}>
                  <View>
                    <Text style={styles.heading}>BUDGET </Text>
                    <Text style={styles.details}>$ {formatBudget(data.budget)}</Text>
                  </View>

                  <View>
                    <Text style={styles.heading}>Duration </Text>
                    <Text style={styles.details}>{formatDuration(data.runtime)}</Text>
                  </View>

                  <View>
                    <Text style={styles.heading}>Realase Date</Text>
                    <Text style={styles.details}>{data.release_date}</Text>
                  </View>
            </View>
            <Text style={styles.heading2} >Genre</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                    {getGenre()}
            </View>

            <Text style={styles.heading2} >Cast</Text>
                <FlatList  
                        keyExtractor={(item) => item.id}
                        data={castData}    
                        renderItem={renderCastItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                />
            <Text style={styles.heading3} >Recommended Movies </Text>
            {recommended && 

            <FlatList 
                keyExtractor={item => item.id}
                data={recommended}
                renderItem={({item})=><DisplayMoviesRecommendation movie={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
          }

        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191919',
        flex: 2,
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
        paddingRight: 95,
      },
      t1: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: '20',
      },
      posterImage: {
        width: Dimensions.get('window').width,
        height: 250,
      },
      watchTrailerButton: {
        backgroundColor: '#0080FE',
        padding: 10,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
      },
      watchTrailerButtonText: {
        color: '#fff',
        fontSize: 18,
      },
      heading: {
        fontSize: 19,
        color: '#969696',
        margin: 10,
      },
      heading2: {
        fontSize: 19,
        color: '#969696',
        margin: 10,
        marginTop:20
      },
      heading3: {
        fontSize: 19,
        color: '#969696',
        margin: 10,
        marginTop:20,
        fontWeight:'bold',
        marginBottom:20
      },
      overview: {
        color: '#fff',
        marginHorizontal: 15,
        textAlign: 'justify',
        fontSize: 16,
      },
      genreContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
      },
      genre: {
        color: '#fff',
        fontSize: 16,
      },
      redScrollBar: {
        height: 2,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
      castItemContainer: {
        marginRight: 10,
        alignItems: 'center',
      },
      castImage: {
        width: 100,
        height: 100,
        borderRadius: 2,
        marginBottom: 10,
        marginHorizontal:10,
        marginTop:5
      },
      castName: {
        color: '#fff',
        textAlign: 'center',
        marginBottom:20
      },
      details: {
        color: '#F4C10F',
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold',
      },
      detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
      },
})

export default MovieDetail