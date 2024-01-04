import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, Button, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons.js' 
import axios from 'axios';
import SeeAllDisplay from './SeeAllDisplay';


const SeeAllUpComming = (props) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
    
        const getData= async ()=> {
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/upcoming',
                params: {
                  include_adult: 'false',
                  include_video: 'false',
                  language: 'en-US',
                  page: page.toString(),
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
                setData((prevData) => [...prevData, ...response.data.results]);
                setIsLoading(false);
              })
              .catch(function (error) {
                //console.error(error);
              });
        }
        setIsLoading(true)
        getData()
        },[page])

        const handleLoadMore = () => {
            setPage((prevPage) => prevPage + 1);
          };

          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.container2}>
                <View style={styles.v1}>
                  <Ionic name={'chevron-back'} size='25' color={'#0080FE'} style={styles.i1} onPress={() => props.navigation.goBack()} />
                  <Button title="Go Back" onPress={() => props.navigation.goBack()} />
                </View>
                <View style={styles.vv1}>
                  <Text style={styles.t1}>UpComming Movies</Text>
                </View>
              </View>
              
              <View>
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={data}
                  renderItem={({ item }) =><SeeAllDisplay movie={item} />}
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.1}
                  style={styles.flt}
                />
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
              </View>
            </SafeAreaView>
          );
        };
        
        const styles = StyleSheet.create({
          container: {
            backgroundColor: '#191919',
            flex: 2,
          },
          container2: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom:10
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
            paddingRight: 110,
          },
          t1: {
            color: '#fff',
            fontSize: '20',
          },
          loadingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          },
          
        });

export default SeeAllUpComming