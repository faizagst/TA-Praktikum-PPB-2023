import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [kdramaRecommendations, setKDramaRecommendations] = useState([]);
  const [kfilmRecommendations, setKFilmRecommendations] = useState([]);
  const apiKey = 'b2bd88d5ce5e168ce72a6d589ceab4a5';

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/discover/tv?', {
      params: {
        api_key: apiKey,
        language: 'en-US',
        sort_by: 'popularity.desc',
        with_genres: '18',
        page: 1,
        with_original_language: 'ko',
      },
    })
      .then(response => setKDramaRecommendations(response.data.results))
      .catch(error => console.error('Error fetching KDrama recommendations:', error));

    axios.get('https://api.themoviedb.org/3/discover/movie?', {
      params: {
        api_key: apiKey,
        language: 'en-US',
        sort_by: 'popularity.desc',
        without_genres: '18',
        page: 1,
        with_original_language: 'ko',
      },
    })
      .then(response => setKFilmRecommendations(response.data.results))
      .catch(error => console.error('Error fetching KFilm recommendations:', error));
  }, []);

  const renderRecommendationItemKDrama = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendationItem}
      onPress={() => navigation.navigate('KDramaDetails', { item })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
      </View>
      <Text style={styles.recommendationTitle} numberOfLines={1}>
        {item.title || item.name}
      </Text>
    </TouchableOpacity>
  );
  
  const renderRecommendationItemKFilm = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendationItem}
      onPress={() => navigation.navigate('KFilmDetails', { item })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
      </View>
      <Text style={styles.recommendationTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title || item.name}
      </Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.centerContent}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.appTitle}>DrakorWave</Text>
      </TouchableOpacity>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>KDrama Recommendations</Text>
        <FlatList
          data={kdramaRecommendations}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderRecommendationItemKDrama}
        />
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('K-Drama')}
        >
          <Text style={styles.seeAllButtonText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>KFilm Recommendations</Text>
        <FlatList
          data={kfilmRecommendations}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderRecommendationItemKFilm}
        />
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('K-Movies')}
        >
          <Text style={styles.seeAllButtonText}>See All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#161618',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  recommendationItem: {
    marginRight: 16,
  },
  imageContainer: {
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 220,
    borderRadius: 8,
  },
  recommendationTitle: {
    width: 150,
    fontSize: 16,
    color: '#fff',
  },
  seeAllButton: {
    marginTop: 8,
    backgroundColor: '#DDDDDD',
    padding: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeAllButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;
