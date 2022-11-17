import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import {Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
       <Text>Would you like to Sign out?</Text>
       <Button onPress={ async (e) => { 
        await AsyncStorage.removeItem("beforeme")
        await AsyncStorage.removeItem("pageid")
        await AsyncStorage.removeItem("c_user")
        navigation.navigate("Auth")
       }} title='Logout' accessibilityLabel="Learn more about this purple button" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
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
