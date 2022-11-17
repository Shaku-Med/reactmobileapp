import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {ImageBackground, Pressable, Text, View, StyleSheet, Animated, Keyboard, KeyboardAvoidingView, TextInput, Image, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

function Signup({navigation}) {

    const [movingscreen, setmovescreen] = useState(false)

    const scheme = useColorScheme()

    // Auth

    const [names, setnames] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const handle_send = e => { 
        let emailregix = /^[\w.+\-]+@gmail\.com$/
        let passregix =/^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{8,15}$/;


        if(names === ""){ 
            Alert.alert("Name Field CanNot Be Empty.", "Enter A Valid Name", [{text: "I sure will"}])
        }
        else if(names.length < 3){ 
            Alert.alert("Invalid Name input.", "Enter A Valid Name", [{text: "I sure will"}])
        }
        else if(email === ""){ 
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
            axios.post("http://192.168.1.43:3000/data/signup/user", { 
                names: names,
                email: email,
                pass: pass,
                unic_id: uuidv4(),
                pageid: uuidv4(),
                profilepic: "https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg",
                coverpic: ""
            }).then(res => { 
                if(res.data !== "success"){ 
                    Alert.alert(res.data, "Enter a valid cred...", [{text: "I will"}])
                }
                else { 
                    Alert.alert("Account created. Now Login...")
                    navigation.navigate("Auth")
                }
            })
        }
    }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{width: "100%"}}>
    <View>
    
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, borderBottomWidth: 1, paddingBottom: 10,  borderBottomColor: '#eaeae9'}}>
         <Image style={{width: 60, height: 50}} source={{uri: "https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"}}/>
         <Text style={{color: scheme === "dark" ? "white" : "black", fontSize: 20, fontWeight: 'bold'}}>Sign up</Text>
      </View>
     
      <ScrollView style={{width: "100%", height: "100%"}}>
      <View accessible style={{width: "100%", justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, marginTop: 40, height: '100%'}}>
             <Text selectable={true} selectionColor={"#075e54"} style={{fontSize: 25, color: scheme === "dark" ? "white" : 'black', fontWeight: 'bold'}}>Welcome! 😃</Text>
             <Text selectable={true} selectionColor={"#075e54"} style={{textAlign: 'center', fontSize: Platform.OS === "ios" ? 20 : 12, color: scheme === "dark" ? "white" : "black", padding: 10, marginBottom: 20}}>Safe Signup. Enter your valid credientials and you'll be ready.</Text>
             <TextInput onSubmitEditing={handle_send} returnKeyType="done" onChangeText={e => setnames(e)} value={names} selectionColor={"#075e54"} placeholder='UserName' autoFocus keyboardType='name-phone-pad'   keyboardAppearance='dark' style={[styles.inputtxt, {color: scheme === "dark" ? "white" : "black", borderColor: scheme === "dark" ? "#eaeae9" : "black"}]} />
             <TextInput onSubmitEditing={handle_send} returnKeyType="done" onChangeText={e => setemail(e)} value={email} selectionColor={"#075e54"} placeholder='Email'  keyboardType='email-address'   keyboardAppearance='dark' style={[styles.inputtxt, {color: scheme === "dark" ? "white" : "black", borderColor: scheme === "dark" ? "#eaeae9" : "black"}]} />
             <TextInput onSubmitEditing={handle_send} returnKeyType="done" onChangeText={e => setpass(e)} value={pass} selectionColor={"#075e54"} placeholder='Password'  keyboardType='visible-password' secureTextEntry  keyboardAppearance='dark' style={[styles.inputtxt, {color: scheme === "dark" ? "white" : "black", borderColor: scheme === "dark" ? "#eaeae9" : "black"}]}/>
             <TouchableOpacity onPress={handle_send} activeOpacity={0.8} style={{width: "100%", maxWidth: 400, backgroundColor: '#075e54', padding: Platform.OS === "ios" ? 15 : 10, borderRadius: 5 }}>
                 <Text style={{textAlign: 'center', fontSize: Platform.OS === "ios" ? 20 : 15, fontWeight: 'bold', color: 'white' }}>Sign up.</Text>
             </TouchableOpacity>

             <Pressable onPress={e => { 
                 navigation.navigate("Auth")
             }}>
                 <Text style={{color: 'gray', fontSize: Platform.OS === "ios" ? 20 : 15, marginTop: 20}}> have an account? <Text style={{fontWeight: 'bold', color: scheme === "dark" ? "white" : 'black',}}>Login</Text></Text>
             </Pressable>
      </View>
      </ScrollView>

    </View>
 </KeyboardAvoidingView>
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
 

export default Signup