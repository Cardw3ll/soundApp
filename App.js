import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";
import Login from './login';
import Signup from './Signup';
import Home from './home';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator()

const App = () => {
  const [intial, setIntial] = useState(true)
  const [user, setUser]=useState();

  function onAuthStateChange(user){
    setUser(user)
    if(intial) setIntial(false);
  }
  useEffect(()=>{
   
  const unsubcribe =  onAuthStateChanged(auth,res =>{
        res ? setUser(res):setUser(null);
       
       
    })
    return unsubcribe;
}, []);
if(intial) return null;

if(!user){
  return(
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login}   options={
     {   headerTitle: ()=> <Header name="Cardwell Record App" />}
      }/>
      <Stack.Screen name="signup" component={Signup}   options={
     {   headerTitle: ()=> <Header name="Cardwell Record App" />}
      }/>
    </Stack.Navigator>
  )
  return(
    <Stack.Navigator>
    <Stack.Screen name="home" component={Home}   options={
   {   headerTitle: ()=> <Header name="Cardwell Record App" />}
    }/>
  </Stack.Navigator>
  )
}

}

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}