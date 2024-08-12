import { SafeAreaView,ActivityIndicator,View, FlatList,StyleSheet,Text } from "react-native";
import CharacterCard from "../components/CharacterCard";
import { useState,useEffect } from "react";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import './gesture-handler';
function Characters({route,navigation}){
    let status=route.params.status;
    // let gender='All';
    // let species='All';
    const [characters, setCharacters] = useState([]);
    const [gender,setGender]=useState('All');
    const [species,setSpecies]=useState('All');
    const [statuss,setStatus] =useState(status);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            const data = response.data.results;
          setCharacters(data);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
        fetchData();
      }, []);
      
    
      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
      const genderData=[{id:'1',title:'All'},{id:'2',title:'Male'},{id:'3',title:'Female'}]
      const statusData=[{id:'1',title:'All'},{id:'2',title:'Alive'},{id:'3',title:'Dead'}]
      const speciesData=[{id:'1',title:'All'},{id:'2',title:'Human'},{id:'3',title:'Alien'}]

      const filteredCharacters = characters.filter((character) => {
            if (statuss !== 'All' && character.status !== statuss) return false;
            if (gender !== 'All' && character.gender !== gender) return false;
            if (species !== 'All' && character.species !== species) return false;
            return true;
          });


      function renderItem(itemData){
      
        return(
            <CharacterCard {...itemData.item} onPress={()=>navigation.navigate('CharacterDetail',{character:itemData.item.id})}/>
        )
    }
    return(
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            
        <SelectDropdown data={statusData}
        onSelect={(selectedItem)=>{setStatus(selectedItem.title),console.log(statuss)}}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Status'}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item,isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        />
        <SelectDropdown data={speciesData}
        onSelect={(selectedItem)=>{setSpecies(selectedItem.title),console.log(statuss)}}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Species'}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item,isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        />
        <SelectDropdown data={genderData}
        onSelect={(selectedItem)=>{setGender(selectedItem.title),console.log(statuss)}}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Gender'}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item,isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        />
          
       
      </View>
            <FlatList data={filteredCharacters} keyExtractor={(item)=>item.id} renderItem={renderItem}/>
        </SafeAreaView>
    )
}
export default Characters;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: responsiveHeight(16),
    height: responsiveHeight(5),
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

  

  



