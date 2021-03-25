/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';

import {Text, Button, Pressable, View, TimePickerAndroid} from 'react-native';



class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30000,
      isOn: false,
      start: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);

  }
  startTimer() {
    console.log("startTimer!!!");
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() + this.state.time,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.start - Date.now(),
        }),
      50,
    );
  }
  stopTimer() {
    this.setState({isOn: false});
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState({time: 0, isOn: false});
  }

  handleTimer(){
    console.log('this.state.isOn');
    console.log(this.state.isOn);
    this.state.isOn?this.stopTimer():this.startTimer()

  }
  render() {
    this.props.remonterTime(this.state.time)
    this.props.isOn(this.state.isOn)

    let stop =
      this.state.time == 0 || !this.state.isOn ? null : (
        <Button onPress={this.stopTimer} title="stop" />
      );

    return (
      <Pressable
        style={this.props.color=="white"&&this.props.started?([
          {
            backgroundColor: 'white',
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          },
           {transform: [{rotate: '180deg'}]},
        ]):this.props.color=="white"&&!this.props.started?
          ([
          {
            backgroundColor: 'white',
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            opacity:0.1
          },
           {transform: [{rotate: '180deg'}]},
        ]):this.props.color=="black"&&this.props.started?([
          {
            backgroundColor: 'black',
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          },
          //  {transform: [{rotate: '180deg'}]},
        ]):   ([
          {
            backgroundColor: 'black',
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            opacity:0.8
          },
          //  {transform: [{rotate: '180deg'}]},
        ])

        }
        onPress={this.props.started?this.handleTimer:null}
        // onPress={this.startTimer}
      >
        <Text style={this.props.color=="white"?{color: 'black', fontSize: 50}:{color: 'white', fontSize: 50}}>
          {this.state.time / 1000 < 3600
            ? new Date(this.state.time).toISOString().substr(14, 5)
            : "plus d'une heure!"}
          {/* {start} */}
          {/* {resume} */}
          {/* {stop} */}
          {/* {reset} */}
        </Text>
      </Pressable>
    )}
}

const App = () => {
  const [whiteTimer, setWhiteTimer] = useState('10:00');
  const [BlackTimer, setBlackTimer] = useState('10:00');
  const [isWhiteTurn, toggleWhiteTurn] = useState(false);
  const [initialTime, setInitialTime] = useState(null);
  const [started, setStarted] = useState(false);


  const handleWhiteTime= (time)=>{
    console.log("temps remonté = " ,time);
  }
  const handleTurn= (isWhiteTurn)=>{
    console.log("isWhiteTurn from App = " ,isWhiteTurn);
    
    // toggleWhiteTurn(!isWhiteTurn)
  }
  const start = () => {
    console.log('start');
    // let dateDepart = new Date();
    // console.log(dateDepart);
    // setInitialTime(dateDepart);
    setStarted(true)
    toggleWhiteTurn(true);
  };
  
 
  return (
    <View
      style={{
        flex: 1,
      }}>
   
        <Timer remonterTime={(e)=>handleWhiteTime(e)} isOn={(e)=>handleTurn(e)} color={"white"} started={started}/>
   
      <View style={{flexDirection:"row"}}>
      <Pressable
        style={{
          backgroundColor: 'grey',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={start}>
        <Text style={{color: 'black', fontSize: 50}}>
          {started ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
          {/* {(isWhiteTurn ? 'WHITE' : 'BLACK') } */}
        </Text>
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
          {started ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
          {/* {(isWhiteTurn ? 'WHITE' : 'BLACK') } */}
        </Text>
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
          {started ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
          {/* {(isWhiteTurn ? 'WHITE' : 'BLACK') } */}
        </Text>
      </Pressable>
      </View>
     
      <Timer remonterTime={(e)=>handleWhiteTime(e)} isOn={(e)=>handleTurn(e)} color={"black"} started={started}/>
      {/* <Pressable
        style={{
          backgroundColor: 'black',
          color: 'white',
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => (!isWhiteTurn ? toggleWhiteTurn(!isWhiteTurn) : null)}>
        <Text style={{color: 'white', fontSize: 50}}>{BlackTimer}</Text>
      </Pressable> */}
      
      {/* <Timer remonterTime={(e)=>handleWhiteTime(e)} /> */}
    </View>
  );
};

export default App;
