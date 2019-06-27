import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, StatusBar, ImageBackground, ToastAndroid } from 'react-native';

import CardView from 'react-native-simple-card';
import { fetchLocationId, fetchWeather } from './src/Api';
import InputLocation from './src/components/InputLocation';
import Weather from './src/components/Weather';

const imgBackGround = require('./src/img/background.jpg');
const imgCard = require("./src/img/backgroundCard.jpg");

export default class App extends Component {

  state = {
    loading: false,
    error: false,
		location: '',
		temperature: 0,
		humidity: 0,
		weather: '',
		minTemp: 0,
		maxTemp: 0,
  }

  componentDidMount() {
    this.updateLocation('New York');
    console.log(this.updateLocation('New York').toString());
  }

  updateLocation = async city => {
    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);

        const {
          location,
          temperature,
          weather,
          minTemp,
          maxTemp
        } = await fetchWeather(locationId);

        this.setState({
          loading: false,
          error: false,
          location,
          temperature,
          weather,
          minTemp,
          maxTemp
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: false
        });
        
        if (!this.setState.location) {
          ToastAndroid.show('Não foi possivel encontrar a cidade', ToastAndroid.LONG);
        } else {
          return null;
        }
      }
    });
  }

  render() {
    return (
      <ImageBackground source={imgBackGround} style={styles.imgBackGround}>
        <View>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={"padding"}
          />
          <StatusBar barStyle="light-content" />

          <InputLocation onSubmit={this.updateLocation} />

          <View style={styles.cards}>
            <CardView backgroundColor="#ffffff" >
              <ImageBackground
                source={imgCard}
                style={styles.imgBackGround}
              >
                <Weather
                  location={this.state.location}
                  loading={this.state.loading}
                  weather={this.state.weather}
                  temperature={this.state.temperature}
                  error={this.state.error}
                  minTemp={this.state.minTemp}
                  maxTemp={this.state.maxTemp}
                />
              </ImageBackground>
            </CardView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  
  cards: {
    flex: 2
  },

  imgBackGround: {
    flex: 1
  }
});
