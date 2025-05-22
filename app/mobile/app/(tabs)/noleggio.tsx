import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CoinIcon from 'react-native-bootstrap-icons/icons/coin';
import BicycleIcon from 'react-native-bootstrap-icons/icons/bicycle';
import SafeUIView from '@/components/SafeUIView';
import { Coordinates, Noleggio as NoleggioType, User } from '@/utils/types';
import { Colors } from '@/constants/Colors';
import { getCurrentNoleggio, terminateNoleggio } from '@/api/noleggi';
import { useInterval } from '@/hooks/useInterval';
import RequiresAuth from '@/components/RequiresAuth';
import { ptDistance } from '@/utils/math';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default () => {
  return <RequiresAuth redirect={'/auth/login'}>{(user) => <Noleggio user={user} />}</RequiresAuth>;
};

export function Noleggio({ user }: { user: User }) {
  const [noleggio, setNoleggio] = useState<NoleggioType | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastCoords, setLastCoords] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const router = useRouter();

  const calculateElapsedTime = useCallback((noleggioData: NoleggioType) => {
    if (noleggioData.start) {
      const [hours, minutes, seconds] = noleggioData.start.split(':').map(Number);
      const startDate = new Date(noleggioData.date);
      startDate.setHours(hours, minutes, seconds);
      return Math.floor((new Date().getTime() - startDate.getTime()) / 1000);
    }
    return 0;
  }, []);

  const fetchNoleggio = useCallback(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      if (lastCoords) {
        const d = ptDistance(lastCoords, coords);

        setDistance((currDis) => currDis + d);
      }
      setLastCoords(coords);

      const res = await getCurrentNoleggio(user.id);
      if (res.noleggio) {
        setNoleggio(res.noleggio);
        const _elapsed = calculateElapsedTime(res.noleggio);
        setElapsedTime(_elapsed);

        // terminate rental if all tokens have een used
        if (_elapsed >= user.num_token) await stop();
      } else {
        router.replace('/');
      }
      setError(null);
    } catch (err) {
      setError('Errore nel caricamento del noleggio');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user.id, router, calculateElapsedTime]);

  useEffect(() => {
    fetchNoleggio();
    const fetchInterval = setInterval(fetchNoleggio, 10000); // Refresh every 10 seconds

    return () => clearInterval(fetchInterval);
  }, [fetchNoleggio]);

  useInterval(() => {
    if (noleggio) {
      setElapsedTime(calculateElapsedTime(noleggio));
    }
  }, 1000);

  const stop = async () => {
    if (!noleggio) return;

    try {
      const res = await terminateNoleggio(noleggio.id, distance / 1000);
      if (res.noleggio) {
        router.replace('/');
      }
    } catch (err) {
      setError('Errore durante la terminazione del noleggio');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <SafeUIView style={{ height: Dimensions.get('screen').height }}>
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeUIView>
    );
  }

  if (error) {
    return (
      <SafeUIView style={{ height: Dimensions.get('screen').height }}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeUIView>
    );
  }

  return (
    <SafeUIView style={{ height: Dimensions.get('screen').height }}>
      <LinearGradient
        colors={[Colors.primary, 'transparent']}
        locations={[0, 0.5]}
        style={styles.container}>
        <View style={styles.counter}>
          <Text style={styles.counterTxt}>{formatTime(elapsedTime)}</Text>
        </View>
        <View style={styles.summary}>
          <View style={styles.summarySub}>
            {/* <Text style={styles.costTxt}>Distanza percorsa: </Text> */}
            <View style={styles.cost}>
              <BicycleIcon fill={Colors.secondary} scaleX={2} scaleY={2} />
              <Text style={styles.costTxt}>{distance.toFixed(2)} km</Text>
            </View>
          </View>
          <View style={styles.summarySub}>
            {/* <Text style={styles.costTxt}>Costo: </Text> */}
            <View style={styles.cost}>
              <CoinIcon fill={Colors.secondary} scaleX={2} scaleY={2} />
              <Text style={styles.costTxt}>
                {Math.floor(elapsedTime / 60 + 1)}/{user.num_token}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <TouchableWithoutFeedback style={styles.button} onPress={stop}>
        <Text style={styles.buttonTxt}>Termina noleggio</Text>
      </TouchableWithoutFeedback>
    </SafeUIView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: 100,
  },
  counterTxt: {
    fontFamily: 'Montserrat_800ExtraBold',
    color: Colors.secondary,
    fontSize: 70,
  },
  summary: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  summarySub: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cost: {
    padding: 20,
    paddingBlock: 10,
    borderRadius: 5,
    backgroundColor: Colors.ternary,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  costTxt: {
    fontFamily: 'Montserrat_700Bold',
    color: Colors.secondary,
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    right: 40,
    backgroundColor: Colors.ternary,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonTxt: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: Colors.secondary,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Montserrat_700Bold',
    color: Colors.secondary,
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});
