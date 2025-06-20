import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';
import { POSTER_PATH } from '../api';

const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data , hideSeeAll = false }) => {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.push('Movie',{
            item
        })
    }

  return (
    <View className="flex-1 w-full mb-4">
      <View className="flex-row items-center justify-between px-4 mb-3">
        <Text style={styles.subtitle} className="text-lg text-white">
          {title}
        </Text>
        {
          !hideSeeAll && 
          <TouchableOpacity>
            <Text className="text-sm text-yellow-400">See All</Text>
          </TouchableOpacity>
        }
      </View>

      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        className='my-4'
        contentContainerStyle={{
          paddingHorizontal: 15
      }}>
        {data.length && data.map(item => (
          <TouchableWithoutFeedback key={item.id} onPress={() => handleClick(item)}>
            <View className="pe-2">
                <Image source={{uri: POSTER_PATH+item.poster_path}} 
                style={{width: Math.round(width*0.4), height: Math.round(height*0.3)}} className="mb-4 rounded-xl"  resizeMode='cover' />
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
