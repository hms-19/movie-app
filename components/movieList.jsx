import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator, StyleSheet } from 'react-native';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';
import { POSTER_PATH } from '../api';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const PosterImage = ({ uri }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imgWidth = Math.round(width * 0.4);
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

const MovieList = ({ title, data , hideSeeAll = false }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.push('Movie', { item });
  };

  return (
    <View className="flex-1 w-full mb-4">
      <View className="flex-row items-center justify-between px-4 mb-3">
        <Text style={styles.subtitle} className="text-lg text-white">
          {title}
        </Text>
        {
          !hideSeeAll && 
          <TouchableOpacity onPress={() => navigation.push('MovieList',{
            data,
            title: title
          })}>
            <Text className="text-sm text-yellow-400">See All</Text>
          </TouchableOpacity>
        }
      </View>

      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        className='my-4'
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.length && data.map(item => (
          <TouchableWithoutFeedback key={item.id} onPress={() => handleClick(item)}>
            <View className="pe-2">
              <PosterImage uri={POSTER_PATH + item.poster_path} />
              <Text className="text-center text-white">
                {item.original_title.length > 15 ? item.original_title.slice(0,15)+'...' : item.original_title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
