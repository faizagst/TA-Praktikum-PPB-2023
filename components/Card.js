import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Card = ({ item, navigation }) => (
  <View style={styles.card}>
    <Image
      style={styles.image}
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
    />
    <View style={styles.cardContent}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.name || item.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
        {item.original_name || item.original_title}
      </Text>
      <Text style={styles.text}>Rating: {item.vote_average}/10</Text>
      <Text style={styles.text}>Air Date: {item.first_air_date || item.release_date}</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ff212121',
    marginBottom: 10,
    marginLeft: '4%',
    width: 180,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
});

export default Card;
