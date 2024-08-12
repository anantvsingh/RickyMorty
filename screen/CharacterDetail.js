import React, { useState, useEffect, memo, useLayoutEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite,removeFavorite } from "../store/redux/favorite";


const CharacterDetail = ({ route,navigation }) => {
  const { character } = route.params;
  const [characters, setCharacters] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const favCharacterIds=useSelector(state=>state.fav.ids);
  const dispatch=useDispatch();
  const characterIsFav=favCharacterIds.includes(character)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${character}`);
        const data = response.data;
        setCharacters(data);
        setOrigin(data.origin.name);
        setEpisodes(data.episode);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [character]);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(episodes.map(api => axios.get(api)));
      const episodeData = details.map(response => response.data);
      setEpisodeDetails(episodeData.map(data => ({ name: data.name, id: data.id, episode: data.episode })));
    };
    fetchDetails();
  }, [episodes]);

  const EpisodeItem = memo(({ item }) => (
    <View style={styles.episodesContainer}>
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeLabel}>Character Name</Text>
        <Text style={styles.episodeValue}>{item.name}</Text>
      </View>
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeLabel}>Episode</Text>
        <Text style={styles.episodeValue}>{item.episode}</Text>
      </View>
    </View>
  ));

  function onPressHandler() {
    console.log("pressed");
    if(characterIsFav){
        dispatch(removeFavorite({id:character}));

    }
    else{
        dispatch(addFavorite({id:character}));
    }
}

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight:()=>{
            return (
              <Pressable onPress={onPressHandler}>
              <Icon name={characterIsFav ? 'star':'star-outline'} size={30} color={'black'} />
          </Pressable>
            );
        }
    })
},[navigation,characterIsFav]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Image source={{ uri: characters.image }} style={styles.image} />
        <Text style={styles.title}>{characters.name}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{characters.status}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Species:</Text>
          <Text style={styles.value}>{characters.species}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{characters.gender}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Origin:</Text>
          <Text style={styles.value}>{origin}</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EpisodeItem item={item} />}
        data={episodeDetails}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    view:{
    backgroundColor: '#fff',
flex:1
    },
  container: {
    padding: responsiveHeight(2),
    alignItems: 'center',
  },
  image: {
    width: responsiveHeight(28),
    height: responsiveHeight(28),
    borderRadius: responsiveHeight(14),
    marginBottom: responsiveHeight(2),
  },
  info:{
    paddingHorizontal: responsiveHeight(2),
  },
  infoContainer: {
    marginBottom: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  title: {
    fontSize: responsiveHeight(4),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveHeight(2),
    fontWeight: 'bold',
  },
  value: {
    fontSize: responsiveHeight(2),
  },
  episodesContainer: {
    marginTop: responsiveHeight(2),
    marginHorizontal:responsiveHeight(2),
    borderRadius:responsiveHeight(2),
    alignItems:'center',
    shadowOpacity:0.2,
    shadowRadius:20,
    shadowColor: 'grey',elevation:50,backgroundColor:'white',
    paddingHorizontal:responsiveHeight(0.5)
  },
  episodeLabel: {
    fontSize: responsiveHeight(1.8),
    fontWeight:'700',
    marginBottom: 5,
  },
  episodeValue:{
    fontSize: responsiveHeight(1.8),
    fontWeight:'600',
  },
  episodeInfo:{
    alignItems:'center',
    paddingVertical:responsiveHeight(0.5)
  }
});

export default CharacterDetail;