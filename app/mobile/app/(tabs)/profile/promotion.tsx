import RequiresAuth from '@/components/RequiresAuth';
import SafeUIView from '@/components/SafeUIView';
import { Colors } from '@/constants/Colors';
import { User } from '@/utils/types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';

export default () => (
  <RequiresAuth redirect={'/auth/login'}>{(user) => <Promotion user={user} />}</RequiresAuth>
);

export function Promotion({ user }: { user: User }) {
  return (
    <SafeUIView style={[{ height: Dimensions.get('screen').height }, styles.instructionContainer]}>
      <Text style={styles.instructions}>Crea un post su instagram con l'hashtag </Text>
      <Text style={[styles.instructions, styles.emphasis]}>#rideyourway</Text>
      <Text style={styles.instructions}>e guadagna 30 token gratuiti</Text>
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
    fontSize: 30,
  },
  emphasis: {
    color: Colors.accent1,
  },
});
