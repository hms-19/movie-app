import { Dimensions, View } from 'react-native';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={{width:width, height:height}} className='absolute flex-row items-center justify-center'>
        <Progress.Circle size={40} borderWidth='5' borderColor='rgba(0, 122, 255, 1)' indeterminate={true} color='rgba(0, 122, 255, 1)' />
    </View>
  )
}

export default Loading