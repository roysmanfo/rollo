import RequiresAuth from '@/components/RequiresAuth';
import SafeUIView from '@/components/SafeUIView';
import { Colors } from '@/constants/Colors';
import { User } from '@/utils/types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';

export default () => (
  <RequiresAuth redirect={'/auth/login'}>{(user) => <Shop user={user} />}</RequiresAuth>
);

export function Shop({ user }: { user: User }) {
  return (
    <SafeUIView style={[{ height: Dimensions.get('screen').height }, styles.instructionContainer]}>
      <Text style={styles.instructions}>Prima prova ad usare la promozione per ottenere token</Text>
      <Text style={[styles.instructions, styles.emphasis]}>GRATUITI</Text>
    </SafeUIView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  instructionContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  instructions: {
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    paddingInline: 50,
    color: Colors.secondary,
    fontSize: 20,
  },
  emphasis: {
    fontFamily: 'Montserrat_800ExtraBold',
    color: Colors.accent1,
    fontSize: 40,
  },
});
