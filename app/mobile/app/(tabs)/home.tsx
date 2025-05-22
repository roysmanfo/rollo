import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import SafeUIView from '@/components/SafeUIView';
import Navbar from '@/components/ui/Navbar';
import mapStyle from '@/utils/map-style';
import BikeReserveView from '@/components/BikeReserveView';

import { BikeInfo, User } from '@/utils/types';
import SwipeToDismissView from '@/components/SwipeToDismissView';
import { getAvailableBikes } from '@/api/bikes';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

// coords of Padua
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;
const defaultRegion = {
  latitude: 45.40797,
  longitude: 11.88586,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function HomePage({ user }: { user: User }) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region>(defaultRegion);
  const [selectedBike, setSelectedBike] = useState<BikeInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bikes, setBikes] = useState<BikeInfo[]>([]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        setErrorMsg('Permission to access location was denied');
        return null;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation);
      return currLocation;
    }

    const getBikes = async () => {
      const res = await getAvailableBikes();
      setBikes(res.bikes);
    };

    getBikes();
    getCurrentLocation().then((loc) => {
      // only set the current region when we have
      // no idea where to place the map the first time
      if (loc) {
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    });

    // polling (every 10s)
    const intervalLocation = setInterval(getCurrentLocation, 10000);
    const intervalBikes = setInterval(getBikes, 10000);
    return () => {
      clearInterval(intervalLocation);
      clearInterval(intervalBikes);
    };
  }, []);

  // error handling
  if (errorMsg) return <Text>{errorMsg}</Text>;

  return (
    <SafeUIView style={{ height: Dimensions.get('screen').height }}>
      {/* <View style={styles.container}> */}
      {
        /* map view native only */
        Platform.OS == 'android' || Platform.OS == 'ios' ? (
          <MapView
            style={[StyleSheet.absoluteFillObject, styles.map]}
            region={region}
            showsUserLocation={true}
            customMapStyle={mapStyle}>
            {/* {COORDS_SEDI.map((s) => (
              <Marker
                key={s.name}
                title={s.name}
                coordinate={{ latitude: s.latitude, longitude: s.longitude }}
              />
            ))} */}
            {bikes &&
              bikes.map((b) => {
                const isSelected =
                  selectedBike?.coords.latitude === b.coords.latitude &&
                  selectedBike?.coords.longitude === b.coords.longitude;

                return (
                  <Marker
                    key={`key_${b.coords.longitude}_${b.coords.latitude}`}
                    image={
                      isSelected
                        ? require('@/assets/images/icons/bike_selected.png')
                        : require('@/assets/images/icons/bike.png')
                    }
                    coordinate={b.coords}
                    onPress={() => setSelectedBike(b)}
                  />
                );
              })}
          </MapView>
        ) : (
          <Text>Mappa disponibile solo con l'app installata</Text>
        )
      }

      {selectedBike && (
        <SwipeToDismissView onDismiss={() => setSelectedBike(null)}>
          <BikeReserveView bike={selectedBike} location={location} />
        </SwipeToDismissView>
      )}

      <Navbar />
    </SafeUIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 8,
  },
  email: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  tokens: {
    color: '#fff',
    fontSize: 18,
    marginTop: 16,
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  reserveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
