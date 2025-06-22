import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../theme/style';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchCredits, fetchDetail, fetchSimilar, POSTER_PATH } from '../api';
import { BlurView } from 'expo-blur';


const MovieImage = ({ uri }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
      {(loading || error) && (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
          <ActivityIndicator color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
        </BlurView>
      )}
    </View>
  );
};


const ios = Platform.OS == 'ios';
const { width, height } = Dimensions.get('window');
const topMargin = ios ? '' : 'mt-12'
const MovieScreen = () => {
    
    const { item } = useRoute().params;
    const navigation = useNavigation();
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState({})
    const [similar, setSimilar] = useState([])
    const [credit, setCredit] = useState([])
    
    useEffect(() => {
        const loadLatest = async () => {
            try {
                const data = await fetchDetail(item.id);
                setDetail(data);

                const similardata = await fetchSimilar(item.id);
                setSimilar(similardata);

                const creditdata = await fetchCredits(item.id);
                setCredit(creditdata);

            } catch (err) {
            console.error('Error fetching  movies:', err);
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
            loading ? <Loading />
            :
         <>
         <View style={{ height: Math.round(height * 0.55)}}>
                <MovieImage uri={POSTER_PATH+detail.poster_path} />
                <LinearGradient
                    colors={['transparent','rgba(23,23,23,0.5)','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                    style={{ width: width, height: Math.round(height * 0.2) }}
                    start={{x: 0.5, y: 0.5}}
                    end={{x: 0.5, y: 1}}
                    className='absolute bottom-0'
                />
            </View>
            {/* Movie Detail */}

            <View className='flex-col gap-5 m-4'>
                    <View>
                        <Text style={styles.subtitle} className='mb-3'>
                            {detail.title}
                        </Text>
                        <Text className='mb-3 font-bold text-yellow-500'>
                            {detail.genres.length && detail.genres.map(g => (
                                <Text className='text-yello-500' key={g.id}>{g.name} {detail.genres[detail.genres.length - 1].id == g.id ? "" : "."}</Text>
                            ))}
                        </Text>
                        <View className='flex-col items-start gap-1 mb-2'>
                            <Text style={styles.paragraph}>
                                Released : {detail.release_date}
                            </Text>
                            <Text style={styles.paragraph}>
                                Rating : {detail.vote_average}
                            </Text>
                             <Text style={styles.paragraph}>
                                Popularity : {detail.popularity}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.paragraph}>
                        {detail.overview}
                    </Text>
            </View>
            
            <Cast data={credit} />

            {/* Similar Movie */}
            <MovieList title='Similar' data={similar} hideSeeAll={true} />
         </>   
        }

    </ScrollView>
  )
}

export default MovieScreen