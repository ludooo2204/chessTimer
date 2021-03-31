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

import {
  Text,
  Button,
  Pressable,
  View,
  UIManager,
  LayoutAnimation,
  Platform,
  TimePickerAndroid,
  ToolbarAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Configuration from './components/configuration';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import Sound from 'react-native-sound';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import {TOUCHABLE_STATE} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

Sound.setCategory('Playback');
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
      isConfigVisible: false,
 
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
    this.config = this.config.bind(this);
    this.refresh = this.refresh.bind(this);
    this.setBlackTime = this.setBlackTime.bind(this);
    this.setWhiteTime = this.setWhiteTime.bind(this);
    this.AnimationRefreshRef;
    this.AnimationParamRef;
    }

  componentDidUpdate() {
    //fin partie
    if (
      this.state.started &&
      (this.state.timeBlack < 100 || this.state.timeWhite < 100)
    ) {
      this.stopBlackTimer();
      this.stopWhiteTimer();
      this.setState({started: false});
      let fin = new Sound('fin.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // Play the sound with an onEnd callback
        fin.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    }
  }
 
  strings = new LocalizedStrings({
    'en-US': {
      how: 'How do you want your egg today?',
      boiledEgg: 'Boiled egg',
      softBoiledEgg: 'Soft-boiled egg',
      choice: 'How to choose the egg',
    },
    en: {
      how: 'How do you want your egg today?',
      boiledEgg: 'Boiled egg',
      softBoiledEgg: 'Soft-boiled egg',
      choice: 'How to choose the egg',
    },
    fr: {
      how: 'ca va mon?',
      boiledEgg: 'Uovo sodo',
      softBoiledEgg: 'Uovo alla coque',
      choice: "Come scegliere l'uovo",
    },
  });

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
    console.log('start');

    this.setState({isWhiteTurn: true, started: true, isOn: true});
    this.handleTimer();
  }
  stopWhiteTimer() {
    clearInterval(this.whiteTimer);
  }
  stopBlackTimer() {
    clearInterval(this.blackTimer);
  }
  resetTimer() {
    this.setState({timeWhite: 0, isOn: false});
  }

  pauseTimer() {
    console.log(this.state.started && this.state.isOn ? 'pause' : 'reprise');
    if (this.state.isOn) {
      this.setState({isOn: false});
      this.stopBlackTimer();
      this.stopWhiteTimer();
    } else {
      // console.log("reprise")
      this.setState({isOn: true});
      this.resume();
    }
  }

  resume() {
    console.log('resume');
    console.log('resume');
    console.log('resume');
    console.log('resume');
    if (this.state.isWhiteTurn) {
      this.startWhiteTimer();
  
    } else {
      this.startBlackTimer();

    }
  }
  setBlackTime(value) {
    value = Number(value) * 60000;
    this.setState({timeBlack: value});
  }
  setWhiteTime(value) {
    value = Number(value) * 60000;
    this.setState({timeWhite: value});
  }
  handleTimer() {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    let click = new Sound('click.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      // Play the sound with an onEnd callback
      click.play(success => {
        if (success) {
          console.log('successfully finished playing');
          click.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
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

  handleParams(params){
    if (params.cancel) {this.setState({isConfigVisible:false})}
    else {
    console.log(`les params sont ${JSON.stringify(params)}`)
    this.setBlackTime(params.blackTime) 
    this.setWhiteTime(params.whiteTime) 
    this.setState({isConfigVisible:false})
  }
  }

  refresh(){
    console.log('Refresh')
    this.AnimationRefreshRef.swing(400).then(endState => {if (endState.finished) 
      {
        if (this.state.isOn&&this.state.isWhiteTurn) this.stopWhiteTimer();
        if (this.state.isOn&&!this.state.isWhiteTurn) this.stopBlackTimer();
        this.setState({timeBlack: 15000,timeWhite:15000,started:false,isOn:false,isWhiteTurn:null});

     }}
    )
  }


  // 
  config() {
    console.log("config!!")
    this.AnimationParamRef.swing(400).then(endState => endState.finished?this.setState({isConfigVisible: true}):null)
    // this.setState({isConfigVisible: true});
  }



  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
          <Configuration visible={this.state.isConfigVisible} params={e=>this.handleParams(e)} ></Configuration>

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
          onPress={this.state.isWhiteTurn&&this.state.isOn?this.handleTimer:null}>
          <Text style={{color: 'black', fontSize: this.state.isWhiteTurn?120:50}}>
            {this.state.timeWhite / 1000 < 3600
              ? new Date(this.state.timeWhite).toISOString().substr(14, 5)
              : "plus d'une heure!"}
          </Text>
        </Pressable>
        <View
          style={
            this.state.started
              ? this.state.isWhiteTurn
                ? {flexDirection: 'row', flex: 1, backgroundColor: 'white'}
                : {flexDirection: 'row', flex: 1, backgroundColor: 'black'}
              : {flexDirection: 'row', flex: 1, backgroundColor: 'grey'}
    
          }>
          <Pressable
            onPress={this.config}
            style={{
 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Animatable.Text
               ref={ref=>(this.AnimationParamRef =ref)}
              //  iterationDelay={3000}
               >
            {this.state.isWhiteTurn ? (
              <Icon name="cog" size={70} color="#000" />
            ) : (
              <Icon name="cog" size={70} color="#fff" />
            )}
            </Animatable.Text>
          </Pressable>

          {!this.state.started ? (
            <Pressable
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.start}>
              {this.state.isWhiteTurn ? (
                <Icon name="caret-right" size={70} color="#000" />
              ) : (
                <Icon name="caret-right" size={70} color="#fff" />
              )}
            </Pressable>
          ) : this.state.isOn ? (
            <Pressable
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.pauseTimer}>
              {this.state.isWhiteTurn ? (
                <Icon2 name="pause-presentation" size={70} color="#000" on />
              ) : (
                <Icon2 name="pause-presentation" size={70} color="#fff" on />
              )}
            </Pressable>
          ) : (
            <Pressable
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.pauseTimer}>
              <Animatable.Text
                animation="flash"
                easing="linear"
                iterationCount="infinite"
                direction="alternate"
                duration={2000}>
                {this.state.isWhiteTurn ? (
                  <Icon2 name="pause-presentation" size={80} color="#000" on />
                ) : (
                  <Icon2 name="pause-presentation" size={80} color="#fff" on />
                )}
              </Animatable.Text>
            </Pressable>
          )}
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.refresh}
            >
            <Animatable.Text
               ref={ref=>(this.AnimationRefreshRef =ref)}
              //  iterationDelay={3000}
               >
            <Icon
              name="refresh"
              size={70}
              color={this.state.isWhiteTurn ? '#000' : '#fff'}
            />
            </Animatable.Text>
          </Pressable>
        </View>

        {/* black */}
        <Pressable
          style={[
            {
              backgroundColor: 'black',
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={!this.state.isWhiteTurn&&this.state.isOn?this.handleTimer:null}>
         <Text style={{color: 'white', fontSize: !this.state.isWhiteTurn&&this.state.isOn?120:50}}>
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

const styles = StyleSheet.create({
  whiteStyle: {
    color: 'black',
    backgroundColor: 'white',
  },
  blackStyle: {
    color: 'white',
    backgroundColor: 'black',
  },
  red: {
    color: 'red',
  },
});
