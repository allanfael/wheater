import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';


export default class Wheather extends Component {
  render() {
    const {
     location,
     loading,
     weather,
     temperature,
     maxTemp,
     minTemp,
     error
    } = this.props;


    return (
      <View>
        <View style={styles.loading}>
          <ActivityIndicator
            animating={loading}
            color={"red"}
            size={"large"}
          />
        </View>

        {!loading && (
          <View>
            {error && (
              <Text style={styles.errorText}>
                Não foi possivel carregar a previsão neste momento. Srry
              </Text>
            )}
            {!error && (
              <View>
                <Text style={styles.textCityStyle}>
                  {location}
                  {"\n"}
                  <Text style={styles.weather}>
                    {weather.toUpperCase()}
                  </Text>
                </Text>
                <Text style={styles.textTemperature}>
                  {`${Math.round(temperature)}°`}
                  {'\n'}
                </Text>
                <Text style={styles.textMinMax}>
                  Min {`${Math.round(minTemp)}°`} - Max {`${Math.round(maxTemp)}°`}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  errorText: {
    padding: 80,
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "200"
  },

  textCityStyle: {
    paddingTop: 10,
    textAlign: "left",
    fontSize: 32,
    paddingLeft: 10,
    fontWeight: "300",
    color: "white"
  },

  textTemperature: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 64,
    color: "white"
  },

  textMinMax: {
    fontSize: 32,
    textAlign: "center",
    color: "white"
  },

  weather: {
    fontSize: 18,
    color: "white"
  }
});
