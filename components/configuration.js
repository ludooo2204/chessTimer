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

const Configuration = ({visible, params,whiteFocus}) => {
  console.log('isWhiteConfigurationFocus,', whiteFocus);
  const [whiteTime, setWhiteTime] = useState(null);
  const [blackTime, setBlackTime] = useState(null);
  const [isWhiteFocus, setWhiteFocus] = useState(null);
  const validateValue = () => {
    params({whiteTime: whiteTime, blackTime: blackTime});
  };

  const inputBlackRef=React.createRef();
  const inputWhiteRef=React.createRef();

  useEffect(() => {
    console.log("config effect")
    console.log(whiteFocus)
    if (isWhiteFocus) {
      console.log("isWhiteFocus")
      // inputWhiteRef.current.focus()
  }
  if  (isWhiteFocus==false){
    console.log("isWhiteFocus==false")
    inputBlackRef.current.focus()
}
  }, [isWhiteFocus])
  return (
    <Dialog.Container visible={visible} contentStyle={styles.container} >

     <Text style={styles.dialogText}>
     Combien de minutes pour les blancs ?
 
     </Text>

      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#d9d4d4",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:20}}
        placeholder="---"
        placeholderTextColor='black'
        textInputRef={inputWhiteRef}
        autoFocus={whiteFocus}
        // onFocus={()=>setWhiteFocus(true)}
        onBlur={()=>setWhiteFocus(false)}
        wrapperStyle={{padding:5}}
        onChangeText={value => setWhiteTime(value)}
        keyboardType="number-pad">
        </Dialog.Input>
        <Text style={styles.dialogText}>
        Combien de minutes pour les noirs ?
        </Text>
      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#d9d4d4",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:20}}
        placeholder="---"
        textInputRef={inputBlackRef}
        placeholderTextColor='black'
        onChangeText={value => setBlackTime(value)}
        wrapperStyle={{padding:5}}
        // multiline
        keyboardType="number-pad">
        
          
        </Dialog.Input>
       
      <Dialog.Button label="Annuler" onPress={()=>params({cancel:true})} />
      <Dialog.Button
        label="Valider"
        onPress={() => validateValue()}
        //   onPress={() => this.setState({isConfigVisible: false})}
      />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#d9d4d4",
    borderRadius:30,
    borderWidth:10,
    borderColor:"#999696",
    fontSize:50,
    // height:600
  },
  title :{
    color:"blue"
  },
  dialogText:{
    // fontFamily:"monospace",
    fontSize:30,
    fontWeight:"bold",
    marginBottom:10
  }
})

export default Configuration;
