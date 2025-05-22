import React, { useEffect, useState } from 'react';
import SafeUIView from '@/components/SafeUIView';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NoleggioInfo, User } from '@/utils/types';
import { getAllPastNoleggi } from '@/api/noleggi';
import { Colors } from '@/constants/Colors';
import RequiresAuth from '@/components/RequiresAuth';

export default () => {
  return <RequiresAuth redirect={'/auth/login'}>{(user) => <Noleggi user={user} />}</RequiresAuth>;
};

function Noleggi({ user }: { user: User }) {
  const [noleggi, setNoleggi] = useState<NoleggioInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNoleggi = async () => {
      const res = await getAllPastNoleggi(user.id);
      setNoleggi(res.noleggi);
      setError(res.error);
    };

    getNoleggi();
  }, []);

  return (
    <SafeUIView>
      <View style={{ margin: 50, flex: 1 }}>
        <Text style={styles.title}>Noleggi</Text>
        <ScrollView style={styles.cardContainer}>
          {noleggi.map((n) => (
            <NoleggioCard key={n.id} noleggio={n} />
          ))}
        </ScrollView>
      </View>
    </SafeUIView>
  );
}

function NoleggioCard({ noleggio: n }: { noleggio: NoleggioInfo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardDate}>
        {`${n.date.getDate()}/${n.date.getMonth() + 1}/${n.date.getFullYear()}`}
      </Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>
          Orario: {n.start.slice(0, 5)} - {(n.end ?? '').slice(0, 5)}
        </Text>
        <Text style={styles.cardText}>Distanza: {n.distance} km</Text>
        <Text style={styles.cardText}>Prezzo: {(n.price ?? 1).toFixed(0)} token</Text>
        <Text style={styles.cardText}>Bici: {n.bike.model}</Text>
      </View>
    </View>
  );
}

const text = {
  color: Colors.secondary,
  fontFamily: 'Monteserrat_500Medium',
  fontSize: 16,
};

const styles = StyleSheet.create({
  title: {
    ...text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
    marginBlock: 20,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    padding: 20,
    backgroundColor: '#181818',
    borderRadius: 10,
    marginBottom: 15,
  },
  cardDate: {
    ...text,
    fontSize: 18,
    marginBottom: 10,
  },
  cardDetails: {
    gap: 5,
  },
  cardText: {
    ...text,
    fontSize: 14,
    opacity: 0.8,
  },
});
