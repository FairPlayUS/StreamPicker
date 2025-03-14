
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '450f7ff986e7c803f8f7c2530530b25f';
const WATCHMODE_API_KEY = 'bnAo9vqjBMlGPzEtWWpwLqgQ2lP9SjbDEvIncCnN';

const RecommendationScreen = ({ navigation, route }) => {
  const { query, selectedServices = [] } = route.params || {};
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchStreamingAvailability = async (title) => {
    const options = {
      method: 'GET',
      url: 'https://api.watchmode.com/v1/search/',
      params: {
        apiKey: WATCHMODE_API_KEY,
        search_field: 'name',
        search_value: title,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.title_results || [];
    } catch (error) {
      console.error('Error fetching availability:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const url = query && query.length > 0
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const { data } = await axios.get(url);
        const moviesWithAvailability = await Promise.all(
          data.results.map(async (movie) => {
            const availability = await fetchStreamingAvailability(movie.title);
            return {
              ...movie,
              streamingAvailability: availability,
            };
          })
        );

        setMovies(moviesWithAvailability);
        setFilteredMovies(moviesWithAvailability);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <ScrollView style={styles.container}>
      {filteredMovies.map(movie => (
        <TouchableOpacity
          key={movie.id}
          style={styles.movieCard}
          onPress={() => navigation.navigate('MovieDetails', { movie })}
        >
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.moviePoster}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieDetails}>⭐ {movie.vote_average}</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {movie.streamingAvailability && movie.streamingAvailability.length > 0 ? (
                movie.streamingAvailability.map((service) => (
                  <Text key={service.id} style={{ color: '#fff', marginRight: 6 }}>
                    🎬 {service.source_name || service.name || service.platform}
                  </Text>
                ))
              ) : (
                <Text style={{ color: '#888' }}>🚫 No Streaming Info</Text>
              )}
            </View>

          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  movieCard: {
    marginVertical: 8,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
  moviePoster: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
  },
  movieInfo: {
    padding: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDetails: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default RecommendationScreen;
