import {Image, View, Text, StyleSheet, Pressable} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

function HomeCard({title, src,onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Image source={src} style={styles.icon}/>
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
export default HomeCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  circle: {
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(12),
    // resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveHeight(2),
    fontWeight: 'bold',
    fontStyle:'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});
