import { useEffect,useState } from "react";
import { SafeAreaView,FlatList,} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";

function Favourites({navigation}){
    const fav=useSelector(state=>state.fav.ids);
    const [characters, setCharacters] = useState([]);

    const favitem=characters.filter((meal)=>
    fav.includes(meal.id));
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            const data = response.data.results;
          setCharacters(data);
            // setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    function renderItem(itemData){
      
        return(
            <CharacterCard {...itemData.item} onPress={()=>navigation.navigate('CharacterDetail',{character:itemData.item.id})}/>
        )
        }
    return(
        <SafeAreaView>
            <FlatList data={favitem} keyExtractor={(item)=>item.id} renderItem={renderItem}/>
        </SafeAreaView>
    )
}
export default Favourites
