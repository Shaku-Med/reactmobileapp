import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {ImageBackground, Pressable, Text, View, StyleSheet, Animated, Keyboard, KeyboardAvoidingView, TextInput, Image, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import axios from 'axios'

function Auth({navigation}) {

    const [movingscreen, setmovescreen] = useState(false)

    const scheme = useColorScheme()

 

    useEffect(() => { 
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('beforeme')
              if(value !== null) {
                setmovescreen(false)
              }
              else { 
                setmovescreen(true)
              }
            } catch(e) {
              // error reading value
            }
        }

          getData()
    }, [])



    // 


    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')


    const handle_send = e => { 
        let emailregix = /^[\w.+\-]+@gmail\.com$/
        let passregix =/^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{8,15}$/;


        if(email === ""){ 
            Alert.alert("Email Field CanNot Be Empty.", "Enter A Valid Email", [{text: "I sure will"}])
        }
        else if(email.length < 6){ 
            Alert.alert("Invalid Email Length | 6.", "Enter A Valid Email", [{text: "I sure will"}])
        }
        else if(!email.match(emailregix)){ 
            Alert.alert("Invalid Email @"+ email.split("@")[1] +" is not a valid email || try @gmail.com only.", "Enter A Valid Name", [{text: "I sure will"}])
        }
        else if(pass === ""){ 
            Alert.alert("You sould not leave you password empty.", "Enter A Valid Password", [{text: "I sure will"}])
        }
        else if(pass.length < 6){ 
            Alert.alert("Invalid password Length", "Enter A Valid Password", [{text: "I sure will"}])
        }
        else if(!pass.match(passregix)){ 
            Alert.alert("This password is not secure. ", "Enter A Valid Password", [{text: "I sure will"}])
        }
        else { 
            axios.post("http://192.168.1.43:3000/data/login/user", { 
                email: email,
                pass: pass
            }).then(res => { 
                if(res.data.success === "success"){ 
                    const storeData = async () => {
                        try {
                          await AsyncStorage.setItem('c_user', res.data.unic_id)
                          await AsyncStorage.setItem('pageid', res.data.pageid)
                          navigation.goBack()
                        } catch (e) {
                          // saving error
                        }
                    }

                    storeData()
                }
                else { 
                    Alert.alert(res.data.success, "Please Enter Your Correct Values / Check For Spelling Errors", [{text: "Ok I am"}])
                }
            })
        }
    }



  return (
    <Pressable onPress={e => { 
        Keyboard.dismiss()
    }} style={{width: "100%", height: "100%"}}>
        
        <StatusBar hidden={true}/>
         {
            [movingscreen].map((val, key) => { 
                if(val === false){ 
                    return ( 
                            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} key={key} style={{width: "100%"}}>
                               <View>
                               
                                 <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, borderBottomWidth: 1, paddingBottom: 10,  borderBottomColor: '#eaeae9'}}>
                                    <Image style={{width: 60, height: 50}} source={{uri: "https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"}}/>
                                    <Text style={{color: scheme === "dark" ? "white" : "black", fontSize: 20, fontWeight: 'bold'}}>Login</Text>
                                 </View>
                                
                                 <ScrollView style={{width: "100%", height: "100%"}}>
                                 <View style={{width: "100%", justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, marginTop: 40, height: '100%'}}>
                                        <Text style={{fontSize: 25, color: scheme === "dark" ? "white" : 'black', fontWeight: 'bold'}}>Welcome! 😃</Text>
                                        <Text style={{textAlign: 'center', fontSize: Platform.OS === "ios" ? 20 : 12, color: scheme === "dark" ? "white" : "black", padding: 10, marginBottom: 20}}>Safe Login. Enter your valid credientials and you'll be ready.</Text>
                                        <TextInput onSubmitEditing={handle_send} returnKeyType="done" onChangeText={e => setemail(e)} value={email} selectionColor={"#075e54"} placeholder='Email' autoFocus keyboardType='email-address'   keyboardAppearance='dark' style={[styles.inputtxt, {color: scheme === "dark" ? "white" : "black", borderColor: scheme === "dark" ? "#eaeae9" : "black"}]} />
                                        <TextInput onSubmitEditing={handle_send} returnKeyType="done" onChangeText={e => setpass(e)} value={pass} selectionColor={"#075e54"} placeholder='Password'  keyboardType='visible-password' secureTextEntry  keyboardAppearance='dark' style={[styles.inputtxt, {color: scheme === "dark" ? "white" : "black", borderColor: scheme === "dark" ? "#eaeae9" : "black"}]}/>
                                        <TouchableOpacity onPress={handle_send} activeOpacity={0.8} style={{width: "100%", maxWidth: 400, backgroundColor: '#075e54', padding: Platform.OS === "ios" ? 15 : 10, borderRadius: 5 }}>
                                            <Text style={{textAlign: 'center', fontSize: Platform.OS === "ios" ? 20 : 15, fontWeight: 'bold', color: 'white' }}>Login.</Text>
                                        </TouchableOpacity>

                                        <Pressable onPress={e => { 
                                            navigation.navigate("Signup")
                                        }}>
                                            <Text style={{color: 'gray', fontSize: Platform.OS === "ios" ? 20 : 15, marginTop: 20}}>Don't have an account? <Text style={{fontWeight: 'bold', color: scheme === "dark" ? "white" : 'black',}}>Sign up</Text></Text>
                                        </Pressable>
                                 </View>
                                 </ScrollView>

                               </View>
                            </KeyboardAvoidingView>
                    )
                }
                else { 
                    return ( 
                        <View key={key} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: "100%"}}>
                            <View>
                                <Image style={{width: 80, height: 80}} source={{uri: "https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"}}/>
                            </View>
                            <Text style={{fontSize: 40, color: scheme === "dark" ? "white" : "black"}}>ChatsApp</Text>
                            <View style={{width: "100%", paddingHorizontal: 10, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <Pressable onPress={e => { 

                                    const storeData = async () => {
                                        try {
                                        await AsyncStorage.setItem('beforeme', "trues")
                                        setmovescreen(false)
                                        } catch (e) {
                                        // saving error
                                        }
                                    }

                                    storeData()

                                }} style={{padding: 15, backgroundColor: '#075e54', borderRadius: 5, width: 100, elevation: 5}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Login</Text>
                                </Pressable>

                                <Pressable onPress={e => { 
                                    navigation.navigate("Signup")
                                }} style={{padding: 15, borderWidth: 1, borderColor: '#075e54', borderRadius: 5, width: 100, marginLeft: 10}} >
                                <Text style={{fontSize: 15, fontWeight: 'bold', color: scheme === "dark" ? "white" : "black", textAlign: 'center'}}>Signup</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }
            })
         }
    </Pressable>
  )
}

const styles = StyleSheet.create({ 
   inputtxt: { 
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    maxWidth: 400,
    borderRadius: 5
   }
})

export default Auth
