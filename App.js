import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchFormScreen';
import MovieDetails from './screens/MovieDetailsScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={SearchScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} options={({route}) => ({title: route.params.title})}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
