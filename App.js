/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/** TODO  
design de la pause (pause clignote)
design des zones blanches et noires qui evolue pdt chaque tour
gestion des parametres de config

*/


import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';

import {Text, Button, Pressable, View, TimePickerAndroid, ToolbarAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWhiteTurn: null,
      timeBlack: 30000,
      timeWhite: 30000,
      isOn: false,
      startWhite: 0,
      startBlack: 0,
      started: false,
    };
    this.startWhiteTimer = this.startWhiteTimer.bind(this);
    this.startBlackTimer = this.startBlackTimer.bind(this);
    this.stopWhiteTimer = this.stopWhiteTimer.bind(this);
    this.stopBlackTimer = this.stopBlackTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.start = this.start.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resume = this.resume.bind(this);
  }
  startWhiteTimer() {
    console.log('startTimer!!!');
    this.setState({
      // isOn: true,
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
      // isOn: true,
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
  start() {
    console.log("start");
    this.setState({isWhiteTurn: true, started: true,isOn:true});
    this.handleTimer()
  }
  stopWhiteTimer() {
    console.log("stopWhite")
    // this.setState({isOn: false});
    clearInterval(this.whiteTimer);
  }
  stopBlackTimer() {
    console.log("stopBlack")
    // this.setState({isOn: false});
    clearInterval(this.blackTimer);
  }
  resetTimer() {
    this.setState({timeWhite: 0, isOn: false});
  }

  pauseTimer(){
    // console.log("pause")
    console.log(this.state.started&&this.state.isOn?"pause":"reprise")
    if(this.state.isOn) {
      this.setState({isOn:false})
    this.stopBlackTimer()
    this.stopWhiteTimer()
  }else{
    // console.log("reprise")
    this.setState({isOn:true})
    this.resume()
  }
  }

  resume() {
    console.log("resume")
    console.log("resume")
    console.log("resume")
    console.log("resume")
    if (this.state.isWhiteTurn) {
      this.startWhiteTimer();
      // this.stopWhiteTimer();
    } else {
      
      this.startBlackTimer();
      // this.stopBlackTimer();
    }

    // this.setState({isWhiteTurn: !this.state.isWhiteTurn});
  }
  handleTimer() {
    console.log('handleTimer');
    console.log('this.state');
    console.log(this.state);


    if (this.state.isWhiteTurn) {
      this.startBlackTimer();
      this.stopWhiteTimer();
    } else {
      this.startWhiteTimer();
      this.stopBlackTimer();
    }

    this.setState({isWhiteTurn: !this.state.isWhiteTurn});
  }
  render() {
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
        	<View style={{flexDirection: 'row',flex:1}}>
				<View
				style={{
				backgroundColor: 'black',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				}}>
              		<Icon name="cog" size={50} color="#fff" />  
          		</View>
          
       		
           
           {!this.state.started? (
		   <Pressable style={{
              backgroundColor: 'black',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.start}
            >
				<Icon name="caret-right" size={70}  color="#fff" />
            </Pressable>
           ):
              (this.state.isOn? 
				(
					<Pressable
					style={{
					backgroundColor: 'black',
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					}}
					onPress={this.pauseTimer}
					>
						<Icon2 name="pause-presentation" size={70}   color="#fff" on/>
					</Pressable>
				)
                : 
                (
					<Pressable
                   style={{
                     backgroundColor: 'black',
                     flex: 1,
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}
                   onPress={this.pauseTimer}
                   >
					    <Animatable.Text animation="flash"  iterationCount="infinite" duration={400} >
						   <Icon2 name="pause-presentation" size={80}   color="#fff" on/>
						</Animatable.Text>
         			</Pressable>
				))
				}
          {/* black */}
          <Pressable
            style={{
              backgroundColor: 'black',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <Text style={{color: 'black', fontSize: 40}}>restart</Text> */}
            
            <Icon name="refresh" size={50} color="#fff" />

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
          {this.state.started?"ON":"OFF"}
          {this.state.isWhiteTurn?"white":"black"}
            {this.state.timeBlack / 1000 < 3600
              ? new Date(this.state.timeBlack).toISOString().substr(14, 5)
              : "plus d'une heure!"}
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default App;
