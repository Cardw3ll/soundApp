import { View, Text,TouchableOpacity,TextInput, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const navigation = useNavigation()
  const [email,setEmail]=useState("");
  const [psd,setPsd]=useState("");

  const registerUser = (email,psd)=>{
  
    createUserWithEmailAndPassword(auth, email,psd)
    .catch(err => setError(err.message))
   
}
  return (
    <View>
    <Text>Login</Text>
    <View>
      <TextInput
      placeholder='Email'
      onChangeText={(email)=> setEmail(email)}
      />
      <TextInput
      placeholder='Password'
      onChangeText={(psd)=> setPsd(psd)}
      secureTextEntry={true}
      />
    </View>

    <TouchableOpacity
    onPress={()=> registerUser(email,psd)}
    style={styles.button}
    >
       <Text> register</Text>
    </TouchableOpacity>
  </View>
  )
}


