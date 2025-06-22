import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, View, ActivityIndicator, StyleSheet } from 'react-native';
import { styles } from '../theme/style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { POSTER_PATH } from '../api';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const PosterImage = ({ uri }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imgWidth = Math.round(width * 0.3);
  const imgHeight = Math.round(height * 0.2);

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

const MovieListScreen = () => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.push('Movie', { item });
  };


  const {title, data} = useRoute().params;

  return (
    <View className="flex-1 bg-neutral-900">
      {/* logo and search */}
        <SafeAreaView>
            <StatusBar style='light' />
            <View className='flex-row items-center justify-between mx-4 my-2'>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Bars3CenterLeftIcon size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <MagnifyingGlassIcon size='30' color='white' strokeWidth={2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View className="flex-row flex-wrap justify-start gap-3 pb-4">
                <PosterImage uri={POSTER_PATH + item.poster_path} />
                <View style={{width: width*0.58}}>
                    <Text style={styles.subtitle}>
                    {item.original_title.length > 20
                        ? item.original_title.slice(0, 20) + '...'
                        : item.original_title}
                    </Text>
                    <Text style={styles.paragraph} className="py-3">{item.overview.length > 130
                        ? item.overview.slice(0, 130) + '...'
                        : item.overview}
                    </Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        />

    </View>
  );
};

export default MovieListScreen;
