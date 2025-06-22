import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/style'
import { useNavigation } from '@react-navigation/native'
import { POSTER_PATH } from '../api'
import { BlurView } from 'expo-blur';

const ProfileImage = ({ uri }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={{ width: 96, height: 96, borderRadius: 48, overflow: 'hidden', marginBottom: 8 }}>
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

const Cast = ({data}) => {
    const navigation = useNavigation();
    
  return (
    <View className='my-4 mb-6'>
        <Text style={styles.subtitle} className='p-4'>
            Top Cast
        </Text>
        
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                data.length && data.map((item) => (
                    <TouchableOpacity key={item.cast_id} onPress={() => {
                        navigation.push('Person', {
                            item: item
                        })
                    }}>
                        <View className='pe-3'>
                            <ProfileImage uri={POSTER_PATH + item.profile_path} />
                            <Text style={styles.paragraph} className='text-center'>{item.original_name.length > 10 ? item.original_name.slice(0,10)+'...' : item.original_name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    </View>
  )
}

export default Cast