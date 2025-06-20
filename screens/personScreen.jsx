import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { styles } from '../theme/style';
import Loading from '../components/loading';
import { fetchPerson, fetchPersonMovie, POSTER_PATH } from '../api';
import MovieList from '../components/movieList';


const ios = Platform.OS == 'ios';
const { width, height } = Dimensions.get('window');
const topMargin = ios ? '' : 'mt-12'
const PersonScreen = () => {
    const navigation = useNavigation();
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState({})
    const [movies, setMovies] = useState([])
    const { item } = useRoute().params;

    useEffect(() => {
        const loadLatest = async () => {
            try {
                const data = await fetchPerson(item.id);
                setDetail(data);

                const moviedata = await fetchPersonMovie(item.id);
                setMovies(moviedata);

            } catch (err) {
            console.error('Error fetching  person:', err);
            } finally {
                setLoading(false);
            }
        };

        loadLatest();
    }, []); 

  return (
    <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {/* Back button and movie poster */}
            <View className={`w-full`}>
                <SafeAreaView className={`absolute z-20 flex-row items-center justify-between w-full px-4 ${topMargin}`}>
                    <TouchableOpacity className="p-1 bg-yellow-500 rounded-xl" onPress={() => {navigation.goBack()}}>
                        <ChevronLeftIcon size={28} color={'white'} strokeWidth={2.5} />
                    </TouchableOpacity>
    
                    <TouchableOpacity className="p-1 rounded-xl" onPress={() => setToggle(prev => !prev)}>
                        {
                            toggle ?
                                <HeartIcon size={30} color={'white'} strokeWidth={2.5} />
                            : <HeartIconOutline  size={30} color={'white'} strokeWidth={2.5} />
                        }
                    </TouchableOpacity>
                </SafeAreaView>
    
                
            </View>
    
            {
              loading ? <Loading /> :
              <>
                <View
                  style={{
                      ...Platform.select({
                        ios: {
                          shadowColor: 'gray',
                          shadowRadius: 40,
                          shadowOffset: { width: 0, height: 5 },
                          shadowOpacity: 1,
                        },
                        android: {
                          elevation: 10, 
                        },
                      }),
                    }}>
                    <View className='flex-row items-center justify-center flex-1 mt-5' style={{height : height * 0.38}}>
                        <Image
                            source={{uri: POSTER_PATH+detail.profile_path}} 
                            style={{width: width * 0.6, height: width * 0.6 }}
                            resizeMode="cover"
                            className='border rounded-full border-3 border-neutral-400'
                        />
                    </View>
                </View>
                  
                {/* Person Detail */}
        
                <View className='flex-col gap-5 m-4'>
                        <View>
                          <Text style={styles.subtitle} className='text-center'>
                              {detail.name} 
                          </Text>
                          <Text style={styles.paragraph} className='text-center'>
                              {detail.place_of_birth} - {detail.birthday}
                          </Text>
                          
                        </View>
                        <View>
                          <Text style={styles.subtitle} className='mb-2'>
                              Biography
                          </Text>
                          <Text style={styles.paragraph}>
                              {detail.biography}
                          </Text>
                        </View>
                </View>

                <MovieList title='Movies' data={movies} />
              </>
            }
            
        </ScrollView>
  )
}

export default PersonScreen