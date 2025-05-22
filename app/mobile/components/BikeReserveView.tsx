import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as Location from 'expo-location';
import { Colors } from '@/constants/Colors';
import { BikeInfo } from '@/utils/types';
import { ptDistance } from '@/utils/math';
import { useRouter } from 'expo-router';
import { avviaNoleggio } from '@/api/noleggi';

type BikeReserveViewProps = {
  bike: BikeInfo;
  location: Location.LocationObject | null; // allow null in case we don't know yet
};

export default function BikeReserveView({ bike, location }: BikeReserveViewProps) {
  const router = useRouter();
  let distance = location ? ptDistance(location.coords, bike.coords) : 0;
  let unit = 'm';
  if (distance > 1000) {
    unit = 'km';
    distance /= 1000;
  }

  const avvia = async () => {
    try {
      const res = await avviaNoleggio(bike.id);
      console.log(res);
      if (res.noleggio) router.push('/(tabs)/noleggio');
    } catch (error) {
      console.error('Error during avvia:', error);
    }
  };

  return (
    <LinearGradient colors={['#111', Colors.primary]} locations={[0, 1]} style={styles.container}>
      <View style={styles.handle} />
      <Text style={[styles.text, styles.bikeDistanceTxt]}>
        {distance.toFixed(2)} {unit} da te
      </Text>
      <Text style={[styles.text]}>{bike.free ? 'Disponibile' : 'Non disponibile'}</Text>
      <Text style={[styles.text]}>Modello: {bike.model}</Text>
      <Text style={[styles.text]}>1 + 1 token/min</Text>
      <TouchableWithoutFeedback
        onPress={async () => {
          await avvia();
        }}>
        <Text style={[styles.text, styles.btntext]}>Sblocca</Text>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  handle: {
    top: -10,
    marginInline: 'auto',
    width: 60,
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  container: {
    borderRadius: 30,
    height: Dimensions.get('screen').height / 3,
    isolation: 'isolate',
    padding: 25,
  },
  text: {
    fontFamily: 'Montserrat_600SemiBold',
    color: Colors.secondary,
  },
  bikeDistanceTxt: {
    color: Colors.secondary,
    fontSize: 30,
  },
  btntext: {
    bottom: 0,
    borderRadius: 15,
    textAlign: 'center',
    color: '#000',
    backgroundColor: Colors.secondary,
    padding: 16,
    fontSize: 20,
    marginTop: 'auto',
    fontFamily: 'Montserrat_600SemiBold',
  },
});
