import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavouriteStats(props) {
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'Center' }}>
        {props.info.Country} Covid Statistics
      </Text>
      <Text>
        Confirmed Cases:{props.info.TotalConfirmed}
      </Text>
      <Text>
        Recovered Cases:{props.info.TotalRecovered}
      </Text>
      <Text>
        Total Deaths:{props.info.TotalDeaths}
      </Text>
      <Text>
        Last Updated:{props.info.Date}
      </Text>
      <Button
        onPress={() => {
          props.childHandler()
        }}
        title="Back to favourites"
        color="#841584"
        accessibilityLabel="Go Back to favourites"
      />
    </View>
  );
}

export default function CountryStatistics({ navigation }) {
  const [favourites, setfavourites] = useState([]);
  const [showInfo, setshowInfo] = useState(false);
  const [infoObject, setinfoObject] = useState({});
  const getDataFromStorage = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@fav_countries');
      if (myArray !== null) {
        setfavourites(JSON.parse(myArray));
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getDataFromStorage();
  }, []);
  const Item = ({ title }) => (
    <TouchableOpacity style={styles.item} onPress={() => showStats(title)}>
      <Text style={styles.title}>{title.Country}</Text>
    </TouchableOpacity>
  );
  const showStats = (data) => {
    setinfoObject(data);
    setshowInfo(true);
  };
  const renderItem = ({ item }) => {
    //console.log(item);
    return <Item title={item} />;
  };
  const handler=()=>{
    setshowInfo(false);
  }
  return (
    <View>
      {showInfo == false ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={favourites}
            renderItem={renderItem}
            keyExtractor={(item) => item.Slug}
          />
        </SafeAreaView>
      ) : (
        <FavouriteStats info={infoObject} childHandler={handler}/>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c20f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 22,
  },
});
