import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/style';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { fetchTopRated, fetchTrending, fetchUpcoming } from '../api';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const [trendingMovies,setTrendingMovies] = useState([])
  const [upcomingMovies,setUpcomingMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])

  
    useEffect(() => {
        const loadLatest = async () => {
          try {
            const trending = await fetchTrending();
            setTrendingMovies(trending);

            const upcoming = await fetchUpcoming();
            setUpcomingMovies(upcoming);

            const topRated = await fetchTopRated();
            setTopRatedMovies(topRated);
            
          } catch (err) {
            console.error('Error fetching latest movies:', err);
          } finally {
            setLoading(false);
          }
        };

        loadLatest();
    }, []); 


  return (
    <View className="flex-1 bg-neutral-900">
      {/* logo and search */}
      <SafeAreaView>
          <StatusBar style='light' />
          <View className='flex-row items-center justify-between mx-4 my-2'>
            <Bars3CenterLeftIcon size='30' color='white' strokeWidth={2} />
            <Text style={styles.title}>Movies</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MagnifyingGlassIcon size='30' color='white' strokeWidth={2} />
            </TouchableOpacity>
          </View>
      </SafeAreaView>
      {
        loading ? <Loading />
        : 
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}>
          
          {/* Trending Movies */}
          <MovieList title='Trending Movies' data={trendingMovies} />

          {/* Upcoming Movies */}
          <MovieList title='Upcoming Movies' data={upcomingMovies} />

          {/* Top Rated Movies */}
          <MovieList title='Top Rated Movies' data={topRatedMovies} />
        </ScrollView>
      }

    </View>
  );
}