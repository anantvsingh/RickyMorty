import { SafeAreaView,View,Text, StyleSheet } from "react-native";
import HomeCard from "../components/HomeCard";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";


function HomePage(){
    const navigation=useNavigation();
    return(
        <SafeAreaView>
            <View style={styles.headingView}>
                <Text style={styles.headingText}>Ricky & Morty</Text>
            </View>
            <HomeCard title={"All Characters"} src={require('../utils/all.webp')} onPress={()=>navigation.navigate('Character',{status:"All"})}/>
            <HomeCard title={"Alive"} src={require('../utils/alive.jpeg')} onPress={()=>navigation.navigate('Character',{status:"Alive"})}/>
            <HomeCard title={"Dead"} src={require('../utils/dead.jpeg')} onPress={()=>navigation.navigate('Character',{status:"Dead"})}/>
        </SafeAreaView>
    )
}
export default HomePage;

const styles=StyleSheet.create({
    headingView:{
        alignItems:'center',
    },
    headingText:{
        fontSize:responsiveHeight(4),
        fontWeight:'900',
        fontStyle:'italic'
    }
})