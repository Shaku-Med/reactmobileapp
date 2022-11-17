import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, Pressable } from 'react-native';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import axios from 'axios'
import io from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

const socket = io("http://192.168.1.43:3000")

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const scheme = useColorScheme()

  const [values, mainval] = React.useState('')

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('c_user')
      if(value === null) {
        navigation.navigate("Auth")
      }
      else { 
        mainval(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  getData()

  navigation.setOptions({ 
     headerBlurEffect: 'systemMaterialLight',
     headerTitle: "Chats",
     headerTitleStyle: { 
      fontWeight: 'bold',
      fontSize: Platform.OS === "ios" ? 25 : 20
     }
  })

  const [datas, setdatas] = React.useState([])
  const [setsockm, sockmess] = React.useState('')

  React.useEffect(() => { 
    axios.post("http://192.168.1.43:3000/data/get/all", { 
      uuid: uuidv4()
    }).then(res => { 
      setdatas(res.data)
    })
  }, [])

  return (
   <>
      <ActivityIndicator style={{position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: scheme === "dark" ? "#000" : "#eaeae9", display: 'none', zIndex: 500000}} size="large" color={"#075e54"}/>
      <ScrollView style={{width: "100%", height: "100%", paddingHorizontal: 10}}>
        { 
        datas.map(val => { 
            if(val.unic_id === val.ownerid){ 
              if(val.unic_id !== values){ 
                 return ( 
                  <TouchableOpacity activeOpacity={0.8} onPress={e => { 
                    navigation.navigate("Chats", { 
                      paramKey: val.unic_id
                    })
                  }}>
                      <View style={{padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: scheme === "dark" ? "#121212" : "#fff"}}>
                        <View style={{backgroundColor: 'transparent'}}>
                          <Image source={{uri: val.profilepic}} style={{width: 50, height: 50, borderRadius: 100}} resizeMode="cover" />
                        </View>
                        <View style={{width: "100%", maxWidth: "75%", marginLeft: 10, backgroundColor: 'transparent'}}>
                          <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: Platform.OS === "ios" ? 17 : 15,}}>{val.names}</Text>
                          <Text numberOfLines={2} style={{marginTop: 5}}>{setsockm === '' ? val.message_sent : setsockm.unic_id === val.unic_id ? setsockm.message_sent : ""}</Text>
                        </View>
                    </View>
                   </TouchableOpacity>
                 )
              }
            }
          })
        }
      </ScrollView>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
