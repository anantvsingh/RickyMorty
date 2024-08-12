import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CharacterCard = ({ name, species, image,onPress }) => {
    const navigation=useNavigation();
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{uri:image}} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.species}>{species}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
    padding: responsiveHeight(2),
    margin: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: responsiveHeight(16),
    height: responsiveHeight(16),
    borderRadius: responsiveHeight(8),
    marginRight: responsiveWidth(10),
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: responsiveHeight(3),
    fontWeight: 'bold',
  },
  species: {
    fontSize: responsiveHeight(2.65),
    fontStyle:'italic',
    color: '#666',
  },
});

export default CharacterCard;