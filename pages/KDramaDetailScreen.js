import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';

function KDramaDetailScreen({ route }) {
  const { item } = route.params;
  const [data, setData] = useState(null);
  const apiKey = 'b2bd88d5ce5e168ce72a6d589ceab4a5';

  useEffect(() => {
    setData(null); // clear old data
    fetch(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&language=en-US`)
      .then(response => response.json())
      .then(json => {
        setData([
          { key: 'poster', value: json.poster_path },
          { key: 'title', value: json.name },
          { key: 'title', value: json.original_name },
          { key: 'title', value: json.networks[0].name },
          { title: 'Rating', value: `${json.vote_average}/10` },
          { title: 'Air Date', value: json.first_air_date || json.release_date },
          { title: 'Episodes', value: json.number_of_episodes },
          { title: 'Genres', value: json.genres.map(genre => genre.name).join(', ') },
          { title: 'Language', value: json.spoken_languages.map(language => language.english_name).join(', ')  },
          { title: 'Overview', value: json.overview },
        ]);
      })
      .catch(error => console.error(error));
  }, [item.id]);

  if (!data) {
    return null;
  }

  return (
    <ImageBackground
      style={styles.backdropImage}
      source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
    >
      <View style={styles.overlay}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.key === 'poster' && (
                <Image
                  style={styles.posterImage}
                  source={{ uri: `https://image.tmdb.org/t/p/original${item.value}` }}
                />
              )}
              {item.key === 'title' &&  (
                <Text style={styles.title}>{item.value}</Text>
              )}
              {item.key !== 'poster' && item.key !== 'title' && (
                <Text style={styles.text}>{item.title}: {item.value}</Text>
              )}
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backdropImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20, 
  },
  posterImage: {
    width: '40%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: '12%',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
});

export default KDramaDetailScreen;
