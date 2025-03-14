
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.details}>⭐ {movie.vote_average} | 📅 {movie.release_date}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>🔙 Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 10,
  },
  overview: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 15,
  },
  details: {
    color: '#999',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: '#FF9900',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MovieDetailsScreen;
