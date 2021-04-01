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

const Configuration = ({visible, params,whiteFocus,whiteTimeDefault,blackTimeDefault}) => {
  // console.log('isWhiteConfigurationFocus,', whiteFocus);
  const [whiteTime, setWhiteTime] = useState(null);
  const [whiteTimeIncrement, setWhiteTimeIncrement] = useState(null);
  const [blackTime, setBlackTime] = useState(null);
  const [blackTimeIncrement, setBlackTimeIncrement] = useState(null);
  const [isWhiteFocus, setWhiteFocus] = useState(null);
  const validateValue = () => {
    params({whiteTime: whiteTime, blackTime: blackTime,whiteTimeIncrement:whiteTimeIncrement,blackTimeIncrement:blackTimeIncrement});
  };

  const inputBlackRef=React.createRef();
  const inputBlackRef2=React.createRef();
  const inputWhiteRef=React.createRef();
  const inputWhiteRef2=React.createRef();

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
    {whiteTimeDefault}
     </Text>

      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#f7f7f7",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:10}}
        placeholder={(whiteTimeDefault/60000).toString()}
        placeholderTextColor='black'
       
        textInputRef={inputWhiteRef}
        autoFocus={whiteFocus}
        // onFocus={()=>setWhiteFocus(true)}
        onBlur={()=>setWhiteFocus(false)}
        wrapperStyle={{padding:5}}
        onChangeText={value => setWhiteTime(value)}
        keyboardType="number-pad">
        </Dialog.Input>
   
     <Text style={[styles.dialogText,styles.increment]}>
     Incrément en secondes pour les blancs ?
 
     </Text>

      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#f7f7f7",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:10}}
        placeholder="0"
        placeholderTextColor='black'
        textInputRef={inputWhiteRef2}
        autoFocus={whiteFocus}
        // onFocus={()=>setWhiteFocus(true)}
        onBlur={()=>setWhiteFocus(false)}
        wrapperStyle={{padding:5}}
        onChangeText={value => setWhiteTimeIncrement(value)}
        keyboardType="number-pad">
        </Dialog.Input>
        <Text style={styles.dialogText}>
        Combien de minutes pour les noirs ?
        </Text>
      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#f7f7f7",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:10}}
        placeholder="---"
        textInputRef={inputBlackRef}
        placeholderTextColor='black'
        onChangeText={value => setBlackTime(value)}
        wrapperStyle={{padding:5}}
        // multiline
        keyboardType="number-pad">
        
          
        </Dialog.Input>
        <Text style={[styles.dialogText,styles.increment]}>
     Incrément en secondes pour les noirs ?
 
     </Text>

      <Dialog.Input
    style={{fontSize:20,backgroundColor:"#f7f7f7",borderRadius:7,borderColor:"#999696",borderWidth:2,marginBottom:10}}
        placeholder="0"
        placeholderTextColor='black'
        textInputRef={inputBlackRef2}
        autoFocus={whiteFocus}
        // onFocus={()=>setWhiteFocus(true)}
        onBlur={()=>setWhiteFocus(false)}
        wrapperStyle={{padding:5}}
        onChangeText={value => setBlackTimeIncrement(value)}
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
    backgroundColor:"#f7f7f7",
    borderRadius:30,
    borderWidth:10,
    borderColor:"#999696",
    fontSize:35,
    // height:600
  },
  title :{
    color:"blue"
  },
  dialogText:{
    // fontFamily:"monospace",
    fontSize:20,
    fontWeight:"bold",
    marginBottom:3
  },
  increment :{
    fontWeight:"normal",
    fontSize:15
  }
})

export default Configuration;
