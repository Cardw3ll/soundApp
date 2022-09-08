import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Modal } from 'react-native';
import React from 'react';
import { Audio } from 'expo-av';

export default function Home() {
  const [recording, setRecording]= React.useState();
  const [recordings, setRecordings]= React.useState([]);
  const [msg,setMsg]= React.useState("Recording app");
  const [remove,setRemove]=React.useState();
 const [showPop, setShowPop]=React.useState(false);
  const [reCord, setReCord]= React.useState()
  const [disable, setDisable] = React.useState(false);

  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();
    
      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });

        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setDisable(true)
        setTimeout(() => {
          setDisable(false)
        }, 5000);
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  async function stopRecording(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration:getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
     console.log(status)
    setRecordings(updatedRecordings)

  }

  function getDurationFormatted(millis){
    console.log(millis)
    const minutes = millis/1000/60;
    const minutesDisplay =Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay)*60;
    const soundDisplay = seconds <10 ? `0${seconds}`:seconds;
    console.log(minutesDisplay + "  " + soundDisplay);
    return `${minutesDisplay}: ${soundDisplay}`
  }

//to delete records
  const removeAudio=(Recordid)=>{
    setRecordings(recordings.filter(item=> item.file !== Recordid))
  }

//to show my recordings
function getRecordings(){

//editing the recording
function updateRecording(recordfile){
  
  async function beginRecord(){
    try{
      const permission = await Audio.requestPermissionsAsync();
 
      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });
  
        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  
  async function stop(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
   
    const {sound, status} = await recording.createNewLoadedSoundAsync();
 
    const newRecording = recordings.map(recordfile=>{
      return {
        sound:sound,
        duration:getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }
    })
    setRecordings(newRecording);
  
  }
  return(
    <View>
      <Button
title={recording ? 'Stop Recording':'Start Recording'}
 onPress={recording? stop: beginRecord}
 disabled={disable}
/>

    </View>
  )
 }

 
  return recordings.map((recordingLine, index)=>{
    return (
      <View key={index} style={styles.row}>
         <Text>
      <Text style={styles.fill} > Recording {index + 1} - {recordingLine.duration}</Text>
   
      <Button style={styles.button1} onPress={()=> recordingLine.sound.replayAsync() } title="Play"/>
      <Button style={styles.button1}  onPress={()=> removeAudio(recordingLine.file)}  title="Delete"/>
      <Button style={styles.button1}  onPress={()=> {setShowPop(true),updateRecording(recordingLine)}}  title="Edit"/>
      </Text>
      <View>
 
 <Modal
transparent={true}
visible={showPop}
>

<View
style={{backgroundColor:'black', flex:1}}
>
<View
style={{backgroundColor:'white', margin:50, padding:40, borderRadius:10,flex:1}}
>
{updateRecording(recordingLine)}

<Button  onPress={()=> setShowPop(false)} title='done'/>
</View>

</View>
</Modal>

</View>
      </View>
    )
    
    
  })
}

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
      <Button
      title={recording ? 'Stop Recording':'Start Recording'}
      onPress={recording? stopRecording: startRecording}
      disabled={disable}
      />
      {getRecordings()} 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rwo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  fill:{
    flex:1,
    margin:16
  },
  button:{
    margin:16
  }
});
