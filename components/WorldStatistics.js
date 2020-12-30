import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
export default class WorldStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    this.getCovidData();
    this.getWorldData();
  }
  getCovidData() {
    fetch('https://api.covid19api.com/summary',{method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          covidData: responseJson,
        });
        //console.log(responseJson)
      })
      .catch((error) => {
        //console.error(error);
      });
  }
  getWorldData() {
    fetch('https://world-population.p.rapidapi.com/worldpopulation', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ed66219b9bmsh76d615dbd7c125cp1432c2jsn159dfa7b9af8',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          worldData: responseJson,
        });
        //console.log(responseJson);
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    let totalPopulation = this.state.worldData.body.world_population
    //console.log(ts)
    return (
      <View style={{ padding: 30 }}>
        <Image source={require('./img.webp')} style={imgStyles.backgroundImage}/>
        <Text style={{fontSize:20,textAlign:'Center'}}>World Covid Statistics</Text>
        <Text>
          Confirmed Cases:{' '}
          {JSON.stringify((this.state.covidData.Global.TotalConfirmed/totalPopulation)*100).substring(0, 4)}%
        </Text>
        <Text>
          Recovered Cases:{' '}
          {JSON.stringify(this.state.covidData.Global.TotalRecovered/totalPopulation*100).substring(0, 4)}%
        </Text>
        <Text>
          Total Deaths:{' '}
          {JSON.stringify(this.state.covidData.Global.TotalDeaths/totalPopulation*100).substring(0, 4)}%
        </Text>
        <Text>
          Last Updated:{''}
          {JSON.stringify(this.state.covidData.Date)}
        </Text>
        
      </View>
    );
  }
}
const imgStyles = {
  backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.8,
        height:'100%'
  },
}