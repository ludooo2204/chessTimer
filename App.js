/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';

import {
  Text,
  useColorScheme,
  Pressable,
  View,
  TimePickerAndroid,
} from 'react-native';

const App = () => {
  const [whiteTimer, setWhiteTimer] = useState('10:00');
  const [BlackTimer, setBlackTimer] = useState('10:00');
  const [isWhiteTurn, toggleWhiteTurn] = useState(null);
  const [initialTime, setInitialTime] = useState(null);

  const click = () => {
    console.log('coco');
  };
  const start = () => {
    console.log('start');
    let dateDepart = new Date();
    console.log(dateDepart);
    setInitialTime(dateDepart);
    toggleWhiteTurn(true);
  };

  const tick = () => {
    console.log('ot');
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Pressable
        style={[
          {
            backgroundColor: 'white',
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          },
          {transform: [{rotate: '180deg'}]},
        ]}
        onPress={() => (isWhiteTurn ? toggleWhiteTurn(!isWhiteTurn) : null)}>
        <Text style={{color: 'black', fontSize: 50}}>{whiteTimer}</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: 'grey',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={start}>
        <Text style={{color: 'black', fontSize: 50}}>
          {initialTime ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: 'black',
          color: 'white',
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => (!isWhiteTurn ? toggleWhiteTurn(!isWhiteTurn) : null)}>
        <Text style={{color: 'white', fontSize: 50}}>{BlackTimer}</Text>
      </Pressable>
    </View>
  );
};

export default App;
