import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/style'
import { useNavigation } from '@react-navigation/native'
import { POSTER_PATH } from '../api'

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
                            <Image source={{uri: POSTER_PATH+item.profile_path}} 
                            className='w-24 h-24 mb-2 border rounded-full border-neutral-500' />
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