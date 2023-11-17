import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

function AboutScreen() {
  return (
    <ImageBackground source={{uri: 'https://w0.peakpx.com/wallpaper/1020/512/HD-wallpaper-itaewon-class-itaewon-class-k-drama-kdrama-kdrama-korean-drama.jpg'}} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This is a simple app that lists Korean dramas and movies. You can browse the list of dramas and movies, and view details about each one.
        </Text>
        <Text style={styles.text}>
          The data is fetched from a TMDB API, and the app is built using React Native.
        </Text>
        <Text style={styles.text}>
          This app is for educational purposes only.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'justify',
  },
});

export default AboutScreen;
