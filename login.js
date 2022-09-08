import { View, Text,TouchableOpacity,TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const Login = () => {
  const navigation = useNavigation()
  const [email,setEmail]=useState("");
  const [psd,setPsd]=useState("");

  const signInUser = (email,psd)=>{
   
    signInWithEmailAndPassword(auth,email,psd)
    .catch(err => setError(err.message))
   
}

return(
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
      onPress={()=> signInUser(email,psd)}

    style={styles.button}
    >
       <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={()=> navigation.navigate('signup')}
    style={styles.button}
    >
       <Text>Dont have an account register</Text>
    </TouchableOpacity>
  </View>
)


}

export default Login