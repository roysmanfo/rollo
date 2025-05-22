import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import BoxArrowLeftIcon from 'react-native-bootstrap-icons/icons/box-arrow-left';
import CoinIcon from 'react-native-bootstrap-icons/icons/coin';
import BikeIcon from 'react-native-bootstrap-icons/icons/bicycle';
import CurrencyDollar from 'react-native-bootstrap-icons/icons/currency-dollar';

import SafeUIView from '@/components/SafeUIView';
import { User } from '@/utils/types';
import Navbar from '@/components/ui/Navbar';
import { Colors } from '@/constants/Colors';
import { SvgProps } from 'react-native-svg';
import RequiresAuth from '@/components/RequiresAuth';
import { useRouter } from 'expo-router';
import { authLogout } from '@/api/auth';
// redirect if not logged in
export default () => {
  return <RequiresAuth redirect={'/auth/login'}>{(user) => <Profile user={user} />}</RequiresAuth>;
};

const toTitleCase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};

export function Profile({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authLogout();
    router.push('/auth/login');
  };

  const handleNoleggi = () => {
    router.push('/profile/noleggi');
  };

  const handlePromotion = () => {
    router.push('/profile/promotion');
  };

  const handleShop = () => {
    router.push('/profile/shop');
  };

  return (
    <SafeUIView>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.primary, 'transparent']}
          locations={[0.25, 1]}
          style={styles.linearGradient}>
          <Text style={styles.name}>
            {toTitleCase(user.nome)} {toTitleCase(user.cognome)}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.tokenCounter}>
            <CoinIcon fill={Colors.secondary} scaleX={1.4} scaleY={1.4} />
            <Text style={styles.tokenTxt}>{user.num_token}</Text>
          </View>
        </LinearGradient>
        <MenuButton text="Le mie corse" onPress={handleNoleggi} Icon={BikeIcon} />
        <MenuButton text="Compra token" onPress={handleShop} Icon={CoinIcon} />
        <MenuButton
          text="Guadagna token gratuiti"
          onPress={handlePromotion}
          Icon={CurrencyDollar}
        />
        <MenuButton text="Logout" onPress={handleLogout} Icon={BoxArrowLeftIcon} />
      </View>
      <Navbar />
    </SafeUIView>
  );
}

function MenuButton({
  text,
  onPress,
  Icon,
  color = Colors.secondary,
}: {
  text: string;
  Icon: (props: SvgProps) => JSX.Element;
  color?: string;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
}) {
  return (
    <TouchableWithoutFeedback onPress={async (e) => await onPress(e)}>
      <View style={styles.button}>
        <Icon fill={color} scaleX={1.5} scaleY={1.5} />
        <Text style={[styles.buttonTxt, { color: color }]}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const stylesCommon = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat_500Medium',
    color: Colors.secondary,
  },
});

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: '100%',
  },
  linearGradient: {
    padding: 40,
    borderRadius: 40,
    paddingBottom: 100,
    alignItems: 'flex-start',
  },
  name: {
    ...stylesCommon.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
  },
  email: {
    ...stylesCommon.text,
    fontSize: 15,
    opacity: 0.5,
  },
  tokenCounter: {
    // ...stylesCommon.text,
    backgroundColor: Colors.accent2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 10,
    paddingInline: 15,
    gap: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  tokenTxt: {
    fontFamily: 'Montserrat_700Bold',
    color: Colors.secondary,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginInline: 20,
    paddingInline: 20,
    paddingBlock: 20,
    gap: 20,
  },
  buttonTxt: {
    fontFamily: 'Montserrat_500Medium',
    color: Colors.secondary,
    fontSize: 16,
  },
});
