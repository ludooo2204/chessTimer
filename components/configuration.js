import React, {useState, useEffect} from 'react';

import {
  Text,
  Button,
  Pressable,
  View,
  TimePickerAndroid,
  ToolbarAndroid,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  
} from 'react-native';
import Dialog from 'react-native-dialog';

const Configuration = ({visible, params}) => {
  // console.log('visible,', visible);
  const [whiteTime, setWhiteTime] = useState(null);
  const [blackTime, setBlackTime] = useState(null);
  const validateValue = () => {
    params({whiteTime: whiteTime, blackTime: blackTime});
  };
  
  return (
    <Dialog.Container visible={visible} contentStyle={styles.container} >
      {/* <Dialog.Title >Account delete</Dialog.Title> */}
      {/* <Dialog.Description style={{fontSize:25}}>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description> */}
     
      <Dialog.Input
    style={{fontSize:20}}
        placeholder="Combien de temps (min) pour les blancs ?"
        placeholderTextColor='black'
        autoFocus
        // wrapperStyle={{height:100}}
        onChangeText={value => setWhiteTime(value)}
        keyboardType="number-pad">
        </Dialog.Input>
        
      <Dialog.Input
      style={{fontSize:30,backgroundColor:"#999696"}}
        placeholder="Combien de temps (min) pour les noirs ?"
        placeholderTextColor='black'
        onChangeText={value => setBlackTime(value)}
        // wrapperStyle={{height:100}}
        multiline
        keyboardType="number-pad">
        
          
        </Dialog.Input>
       
      <Dialog.Button label="Cancel" onPress={()=>params({cancel:true})} />
      <Dialog.Button
        label="Valider?"
        onPress={() => validateValue()}
        //   onPress={() => this.setState({isConfigVisible: false})}
      />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#b8b4b4",
    borderRadius:30,
    borderWidth:10,
    borderColor:"#999696",
    fontSize:50,
    // height:600
  },
  title :{
    color:"blue"
  }
})

export default Configuration;
