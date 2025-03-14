
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices(prev => prev.includes(service)
      ? prev.filter(s => s !== service)
      : [...prev, service]);
  };

  const moods = ["Happy 😄", "Romantic 🥰", "Scared 😱", "Comedy 😂", "Drama 🎭"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 StreamPicker 🎬</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.subTitle}>Pick Your Mood</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodContainer}>
        {moods.map(mood => (
          <TouchableOpacity
            key={mood}
            style={styles.moodButton}
            onPress={() => navigation.navigate('Recommendations', { mood: mood })}
          >
            <Text style={styles.buttonText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceContainer}>
        {['Netflix', 'Amazon', 'Hulu', 'YouTube', 'Apple'].map(service => (
          <TouchableOpacity
            key={service}
            style={[styles.serviceButton, selectedServices.includes(service) && styles.serviceSelected]}
            onPress={() => toggleService(service)}>
            <Text style={styles.buttonText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Recommendations', { query: searchQuery, selectedServices })}
      >
        <Text style={styles.buttonText}>🎥 Find a Movie</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Watchlist')}
      >
        <Text style={styles.buttonText}>📌 Go to Watchlist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 20,
  },
  searchBar: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#222',
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    maxHeight: 50,
  },
  moodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#444',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    maxHeight: 50,
  },
  serviceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceSelected: {
    backgroundColor: '#FF6347',
  },
  button: {
    padding: 15,
    backgroundColor: '#ff9900',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
