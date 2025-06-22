import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const SideMenu = ({navigation}) => {


  return (
    <View style={{ flex: 1, backgroundColor: '#171717', padding: 40, justifyContent: 'space-between' }}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home',{screen: 'Home'})}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>
        © {new Date().getFullYear()} Movie App Htet Myat Soe
      </Text>
    </View>
  );
};

export default SideMenu;
