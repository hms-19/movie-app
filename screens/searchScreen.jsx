import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import { Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View , ActivityIndicator, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { XMarkIcon } from 'react-native-heroicons/solid'
import { styles } from '../theme/style';
import Loading from '../components/loading';
import { POSTER_PATH, searchMovie } from '../api';
import {debounce} from 'lodash'
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const PosterImage = ({ uri }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imgWidth = Math.round(width * 0.445);
  const imgHeight = Math.round(height * 0.3);

  return (
    <View style={{ width: imgWidth, height: imgHeight, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
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
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="small" color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
        </BlurView>
      )}
    </View>
  );
};
const SearchScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [movies,setMovies] = useState([])
    
    const handleSearch = async (value) => {
        if(value && value.length > 2){
            setLoading(true)
            const data = await searchMovie({query: value, include_adult: 'false',language: 'en-US', page: '1'})
            setMovies(data)
            setLoading(false)
        }
        else{
            setLoading(false)
            setMovies([])
        }
    } 

    const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
  return (
    <SafeAreaView className='flex-1 bg-neutral-900'>
        <View className='flex-row gap-2 mx-4 mt-12 overflow-hidden border-2 rounded-lg border-neutral-400'>
            <TextInput 
            onChangeText={handleTextDebounce}
            placeholder='Search movie' 
            placeholderTextColor={'gray'}
            className='flex-1 px-3 font-semibold text-white text-md' />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <XMarkIcon style={{backgroundColor: '#a3a3a3'}} size={43} />
            </TouchableOpacity>
        </View>
        {
            loading ? <Loading /> :
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
                className='space-y-3'>
                {
                movies.length ?
                (<>
                    <Text className='my-2 font-semibold' style={styles.paragraph}>Results ({movies.length})</Text>
                    <View className='flex-row flex-wrap justify-start gap-3'>
                        {movies.map((item) => (
                                <TouchableWithoutFeedback 
                                key={item.id}
                                onPress={() => {
                                    navigation.push('Movie',{
                                        item
                                    })
                                }}>
                                    <View>
                                        <PosterImage uri={POSTER_PATH+item.poster_path} />
                                        <Text className="text-center text-white">
                                            {item.title.length > 15 ? item.title.slice(0,15)+'...' : item.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </View>
                </>
                ) 
                        : (
                            <View style={{height: height*0.7}} className='flex-row items-center justify-center flex-1'>
                                <Image source={require('../assets/search.png')} 
                                    style={{width: width * 0.9, height: height*0.5}}
                                />
                            </View>
                        )
                }
            </ScrollView>
        }
    </SafeAreaView>
  )
}

export default SearchScreen