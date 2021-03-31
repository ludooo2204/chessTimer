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
} from 'react-native';
import Dialog from 'react-native-dialog';

const Configuration = ({visible, params}) => {
  console.log('visible,', visible);
  const [whiteTime, setWhiteTime] = useState(null);
  const [blackTime, setBlackTime] = useState(null);
  const validateValue = () => {
    params({whiteTime: whiteTime, blackTime: blackTime});
  };
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Input
        label="Combien de temps (min) pour les blancs ?"
        onChangeText={value => setWhiteTime(value)}
        keyboardType="number-pad"></Dialog.Input>
      <Dialog.Input
        label="Combien de temps (min) pour les noirs ?"
        onChangeText={value => setBlackTime(value)}
        keyboardType="number-pad"></Dialog.Input>

      <Dialog.Button label="Cancel" onPress={()=>params({cancel:true})} />
      <Dialog.Button
        label="Valider?"
        onPress={() => validateValue()}
        //   onPress={() => this.setState({isConfigVisible: false})}
      />
    </Dialog.Container>
  );
};
export default Configuration;
