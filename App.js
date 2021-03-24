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
  Button,
  Pressable,
  View,
  TimePickerAndroid,
} from 'react-native';



class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 10000000,
      isOn: false,
      start: 10000000
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
    
      start: Date.now() + this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: (this.state.start -Date.now())

    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0, isOn: false})
  }
  render() {
    let start = (this.state.time == 0) ?
      <Button onPress={this.startTimer} title="start"/> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <Button onPress={this.stopTimer} title="stop"/>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button onPress={this.startTimer} title="resume"/>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button onPress={this.resetTimer} title="reset"/>
    return(
      <View>
        <Text>{new Date(this.state.time).toISOString().substr(14,5)}
       
        </Text>
        {start}
        {resume}
        {stop}
        {reset}
      </View>
    )
  }
}

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
    <Timer/>
    // <View
    //   style={{
    //     flex: 1,
    //   }}>
      
    //   <Pressable
    //     style={[
    //       {
    //         backgroundColor: 'white',
    //         flex: 4,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       },
    //       {transform: [{rotate: '180deg'}]},
    //     ]}
    //     onPress={() => (isWhiteTurn ? toggleWhiteTurn(!isWhiteTurn) : null)}>
    //     <Text style={{color: 'black', fontSize: 50}}>{whiteTimer}
    //     </Text>
    //   </Pressable>

    //   <Pressable
    //     style={{
    //       backgroundColor: 'grey',
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //     onPress={start}>
    //     <Text style={{color: 'black', fontSize: 50}}>
    //       {initialTime ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
    //     </Text>
    //   </Pressable>
    //   <Pressable
    //     style={{
    //       backgroundColor: 'black',
    //       color: 'white',
    //       flex: 4,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //     onPress={() => (!isWhiteTurn ? toggleWhiteTurn(!isWhiteTurn) : null)}>
    //     <Text style={{color: 'white', fontSize: 50}}>{BlackTimer}</Text>
    //   </Pressable>
    // </View>
  );
};

export default App;
