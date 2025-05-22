import React from 'react';
import { StyleSheet, View } from 'react-native';
import HouseDoorFillIcon from 'react-native-bootstrap-icons/icons/house-door-fill';
import PersonFillIcon from 'react-native-bootstrap-icons/icons/person-fill';
import { Colors } from '@/constants/Colors';
import { Link, usePathname } from 'expo-router';

const normScale = 2;
const iconScale = { scaleX: normScale, scaleY: normScale };

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href={'/(tabs)/profile'}>
          <PersonFillIcon
            style={styles.icon}
            fill={isActive('profile') ? Colors.secondary : Colors.accent2}
            {...iconScale}
          />
        </Link>
        <View style={styles.divisor} />
        <Link href={'/(tabs)/home'}>
          <HouseDoorFillIcon
            style={styles.icon}
            fill={isActive('home') || pathname == '/' ? Colors.secondary : Colors.accent2}
            {...iconScale}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 75,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.primary,
    padding: 30,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  divisor: {
    height: '200%',
    width: 3,
    backgroundColor: Colors.accent2,
  },
  icon: {},
});
