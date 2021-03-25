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
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWhiteTurn:null,
      timeBlack: 30000,
      timeWhite: 30000,
      isOn: false,
      startWhite: 0,
      startBlack: 0,
      started:false
    };
    this.startWhiteTimer = this.startWhiteTimer.bind(this);
    this.startBlackTimer = this.startBlackTimer.bind(this);
    this.stopWhiteTimer = this.stopWhiteTimer.bind(this);
    this.stopBlackTimer = this.stopBlackTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.start = this.start.bind(this)
    // this.blackTimer = this.blackTimer.bind(this);
    // this.whiteTimer = this.whiteTimer.bind(this);
  }
  startWhiteTimer() {
    console.log('startTimer!!!');
    this.setState({
      isOn: true,
      timeWhite: this.state.timeWhite,
      startWhite: Date.now() + this.state.timeWhite,
    });
    this.whiteTimer = setInterval(
      () =>
        this.setState({
          timeWhite: this.state.startWhite - Date.now(),
        }),
      50,
    );
  }
  startBlackTimer() {
    // console.log('startTimer!!!');
    this.setState({
      isOn: true,
      timeBlack: this.state.timeBlack,
      startBlack: Date.now() + this.state.timeBlack,
    });
    this.blackTimer = setInterval(
      () =>
        this.setState({
          timeBlack: this.state.startBlack - Date.now(),
        }),
      50,
    );
  }
  start(){
this.setState({isWhiteTurn:true,started:true})


}
stopWhiteTimer() {
    this.setState({isOn: false});
    console.log('this.whiteTimer');
    console.log(this.whiteTimer);
    clearInterval(this.whiteTimer);
  }
  stopBlackTimer() {
    this.setState({isOn: false});
    console.log('this.blackTimer');
    console.log(this.blackTimer);
    clearInterval(this.blackTimer);
  }
  resetTimer() {
    this.setState({timeWhite: 0, isOn: false});
  }

  handleTimer() {
    console.log('handleTimer');
    console.log('this.state');
    console.log(this.state);
    console.log("whiteturn");
    console.log(this.state.isWhiteTurn);
    //  this.startTimer();
    if(this.state.isWhiteTurn)  {
      this.startBlackTimer();
      this.stopWhiteTimer()
    }
    else {
      this.startWhiteTimer();
      this.stopBlackTimer()
    }
    // this.state.isWhiteTurn ?  (this.startBlackTimer(),this.stopWhiteTimer):(this.startWhiteTimer(),this.stopBlackTimer)
    this.setState({isWhiteTurn:!this.state.isWhiteTurn})

    // console.log("whiteturn");
    // console.log(this.state.isWhiteturn);
    // this.state.isWhiteturn ? this.stopTimer() : this.startTimer();
  }
  render() {
//  console.log(this.state);
    // let stop =
    //   this.state.timeWhite == 0 || !this.state.isOn ? null : (
    //     <Button onPress={this.stopTimer} title="stop" />
    //   );

    return (
      <View
        style={{
          flex: 1,
        }}>
        {/* white */}
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
          onPress={this.handleTimer}>
          <Text style={{color: 'black', fontSize: 50}}>
            {this.state.timeWhite / 1000 < 3600
              ? new Date(this.state.timeWhite).toISOString().substr(14, 5)
              : "plus d'une heure!"}
          </Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
        <View
            style={{
              backgroundColor: 'grey',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="cog" size={50} color="#000" />
          </View>
          {/* black */}
          <Pressable
            style={{
              backgroundColor: 'grey',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.start}
          >
            <Text style={{color: 'black', fontSize: 50}}>
              {this.state.started ? (this.state.isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
              {/* {this.state.isWhiteturn?"white":"black"} */}
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: 'grey',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={start}
          >
            <Text style={{color: 'black', fontSize: 50}}>restart</Text>
          </Pressable>
        </View>
        <Pressable
          style={[
            {
              backgroundColor: 'black',
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={this.handleTimer}>
          <Text style={{color: 'white', fontSize: 50}}>
            {this.state.timeBlack / 1000 < 3600
              ? new Date(this.state.timeBlack).toISOString().substr(14, 5)
              : "plus d'une heure!"}
          </Text>
        </Pressable>
      </View>
    );
  }
}

// const App = () => {
//   const [whiteTimer, setWhiteTimer] = useState('10:00');
//   const [BlackTimer, setBlackTimer] = useState('10:00');
//   const [isWhiteTurn, toggleWhiteTurn] = useState(false);
//   const [initialTime, setInitialTime] = useState(null);
//   const [started, setStarted] = useState(false);

//   const handleWhiteTime = time => {
//     // console.log('temps remonté = ', time);
//   };
//   const handleTurn = isWhiteTurn => {
//     console.log('isWhiteTurn from App = ', isWhiteTurn);
//   };
//   const start = () => {
//     console.log('start');

//     setStarted(true);
//     toggleWhiteTurn(true);
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}>
//       <Timer
//         remonterTime={e => handleWhiteTime(e)}
//         isOn={e => handleTurn(e)}
//         color={'white'}
//         started={started}
//       />

//       <View style={{flexDirection: 'row'}}>
//         <View
//           style={{
//             backgroundColor: 'grey',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Icon name="cog" size={50} color="#000" />
//         </View>
//         <Pressable
//           style={{
//             backgroundColor: 'grey',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onPress={start}>
//           <Text style={{color: 'black', fontSize: 50}}>
//             {started ? (isWhiteTurn ? 'WHITE' : 'BLACK') : 'START'}
//           </Text>
//         </Pressable>
//         <Pressable
//           style={{
//             backgroundColor: 'grey',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onPress={start}>
//           <Text style={{color: 'black', fontSize: 50}}>restart</Text>
//         </Pressable>
//       </View>

//       <Timer
//         remonterTime={e => handleWhiteTime(e)}
//         isOn={e => handleTurn(e)}
//         color={'black'}
//         started={started}
//       />
//     </View>
//   );
// };

export default App;
