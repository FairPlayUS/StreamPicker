import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendationScreen from './screens/RecommendationsScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import HomeScreen from './screens/HomeScreen';

// 🔹 Your TMDb API Key (Replace with your actual key)
const API_KEY = '450f7ff986e7c803f8f7c2530530b25f';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1`;


// 🎬 Home Screen


// 🎥 Recommendation Screen (Fetches real movies from TMDb API)


// 📌 Watchlist Screen

function WatchlistScreen({ navigation }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const storedWatchlist = await AsyncStorage.getItem('watchlist');
      if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
    };

    const unsubscribe = navigation.addListener('focus', loadWatchlist);
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 My Watchlist 📌</Text>
      <ScrollView>
        {watchlist.length === 0 && <Text style={{ color: '#fff' }}>No movies added yet.</Text>}
        {watchlist.map(movie => (
          <View key={movie.id} style={styles.movieCard}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.moviePoster} />
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
// Movie Details Screen

// 📌 Stack Navigator
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen 
          name="Recommendations" 
          component={RecommendationScreen}
          initialParams={{ query: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchBar: {
    width: '90%',
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#222',
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  serviceContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    maxHeight: 50, // ensures buttons stay within bounds vertically
  },
  serviceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    height: 40, // Fixes vertical stretching
    minWidth: 80, // Ensures consistent button width
  },
  serviceSelected: {
    backgroundColor: '#FF6347',
  },  
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#ff9900',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  movieList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  movieInfo: {
    marginLeft: 15,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  movieDetails: {
    fontSize: 14,
    color: '#bbb',
    marginVertical: 5,
  },
  watchButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});


