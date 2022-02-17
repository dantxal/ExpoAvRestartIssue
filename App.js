import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';

export default function App() {
  const { current: sound } = useRef(new Audio.Sound());
  useEffect(() => {
    async function loadAudio() {
      try {
        await sound.loadAsync(require('./assets/song.mp3'));
        await sound.setOnPlaybackStatusUpdate(customOnPlaybackStatusUpdate);
        await sound.playAsync();
      } catch (err) {
        console.error(err);
      }
    }

    loadAudio();
  }, [sound]);

  function customOnPlaybackStatusUpdate(status) {
    console.log(
      `Current position/Duration: ${status.positionMillis}/${status.durationMillis}. Volume: ${status.volume}`,
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Run it on ios, the audio will start playing as soon as it loads, then
        restarting the app with "Cmd+R" crashes it.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
