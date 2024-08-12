import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomePage from './screen/HomePage';
import Characters from './screen/Characters';
import CharacterDetail from './screen/CharacterDetail';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { store } from './store/redux/store';
import { Provider } from 'react-redux';
import Favourites from './screen/Favourites';
import './gesture-handler';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

const Stack=createNativeStackNavigator();
const Drawer=createDrawerNavigator();

function DrawerNavigator(){
  return(
    <Drawer.Navigator initialRouteName="All" >
      <Drawer.Screen name="All" component={HomePage} options={{headerShown:false}}/>
      <Drawer.Screen name="Favourites" component={Favourites} />
    </Drawer.Navigator>
  )
}
function App(){
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen name='Home' component={DrawerNavigator}/> */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{
          headerShown:false

      }}/>
      {/* <Stack.Screen name='Home' component={HomePage}/> */}
        <Stack.Screen name='Character' component={Characters}/>
        <Stack.Screen name='CharacterDetail' component={CharacterDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider> 
    
  );
}



export default App;
