import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {ImageBackground, Pressable, Text, View, StyleSheet, Animated, Keyboard, KeyboardAvoidingView, TextInput, Image, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import ImageView from "react-native-image-viewing";
import {Audio} from 'expo-av'
function Chats({route, navigation}) {

    const scheme = useColorScheme()

    const [bottoms, setbottoms] = React.useState(0)
    const [hei, sethei] = React.useState(90)

    navigation.setOptions({ 
        headerTitle: "",
        headerLeft: () => ( 
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: -5}}>
                <FontAwesome color={scheme === "dark" ? "white" : "black"} size={Platform.OS === "ios" ? 20 : 15} onPress={e => { 
                    navigation.goBack()
                }} name='arrow-left' />
               <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                   <Image style={{width: 35, height: 35, borderRadius: 500}} resizeMode="cover" source={{uri: "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/07/Featured-Image-1.jpg"}}/>
                   <Text numberOfLines={1} style={{color: scheme === "dark" ? "white" : "black", fontSize: Platform.OS === "ios" ? 20 : 15, fontWeight: 'bold', marginLeft: 10, maxWidth: '75%'}} >Mohamed Brima Amara dosnodindiif foiidnifdoi fnodifnoid</Text>
               </View>
            </View>
        )
    })


  const [datas, setdatas] = React.useState([])
  const [setsockm, sockmess] = React.useState('')


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

  let arrs = { 
    authuser: values,
    toid: route.params.paramKey
  }

  React.useEffect(() => { 
    axios.post("http://192.168.1.43:3000/data/get/all", { 
      authuser: values,
      toid: route.params.paramKey
    }).then(res => { 
      setdatas(res.data)
    })
  }, [])

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Pressable onPress={async e => { 
        setbottoms(0)
        Keyboard.dismiss
        sethei(90)
    }}>
        <StatusBar hidden={true}/>
        <ScrollView style={{width: "100%", height: "100%", backgroundColor: scheme === "dark" ? "black" : "#eaeae9", flexDirection: 'column'}}>
            
              

                <Pressable style={{width: "100%", padding: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 2, marginTop: 2}}>
                        <Pressable style={{ maxWidth: '70%', flexDirection: 'column', backgroundColor: '#1569C7', borderRadius: 10, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10}}>
                            <Text style={{color: "white"}}>Hello Mohamed how're you doing? iidfodnofdofiodiofiodiofiodfoidoifdiofdiofdoidioio</Text>
                        </Pressable>
                </Pressable>

                <Pressable style={{width: "100%", padding: 10, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 2, marginTop: 2}}>
                        <Pressable style={{ maxWidth: '70%', flexDirection: 'column', backgroundColor: scheme === "dark" ? "#121212" : "white", borderRadius: 10, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10}}>
                            <Text style={{color: scheme === "dark" ? "white" : "black"}}>Hello Mohamed how're you doing? iidfodnofdofiodiofiodiofiodfoidoifdiofdiofdoidioio</Text>
                        </Pressable>
                </Pressable>

                <View style={{height: 85}}></View>

        </ScrollView>
        <View style={{backgroundColor: scheme === "dark" ? "#121212" : "#fff" , width: "100%", padding: 20, height: hei, position: 'absolute', bottom: bottoms}}>
           <TextInput   keyboardType='default' returnKeyType='send' style={{ backgroundColor: scheme === "dark" ? "black" : "#eaeae9", padding: 10, borderRadius: 20, color: scheme === "dark" ? "white" : "black"}} onFocus={e => { 
            setbottoms(90)
            sethei(70)
           }} onBlur={e => { 
            setbottoms(0)
            sethei(90)
           }} />
        </View>
    </Pressable>
    </KeyboardAvoidingView>
  )
}

export default Chats
