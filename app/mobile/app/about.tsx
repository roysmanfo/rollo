import { Dimensions, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';

import CaretRightFill from 'react-native-bootstrap-icons/icons/caret-right-fill';

import { LinearGradient } from 'expo-linear-gradient';
import SafeUIView from '@/components/SafeUIView';
import { Colors } from '@/constants/Colors';

export default function PresentationPage() {
  const images = [
    require('@/assets/images/home/slides/simple.jpg'),
    require('@/assets/images/home/slides/veloce.png'),
    require('@/assets/images/home/slides/economica.jpg'),
    require('@/assets/images/home/slides/sostenibile.jpg'),
    require('@/assets/images/home/slides/disponibile.jpg'),
  ];

  const slides = [
    { title: 'semplice', description: 'Rollo è pensata per essere facile ed intuitiva da usare' },
    {
      title: 'veloce',
      description: 'Prenota la tua bici in pochi secondi e inizia subito a pedalare',
    },
    {
      title: 'economico',
      description: 'Tariffe competitive e trasparenti per tutti i tuoi spostamenti in città',
    },
    {
      title: 'sostenibile',
      description: 'Scegli la mobilità green e contribuisci a rendere la città più vivibile',
    },
    {
      title: 'sempre disponibile',
      description: 'Trova le bici più vicine a te in qualsiasi momento della giornata',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slide, setSlide] = useState(slides[0]);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const nextSlide = () => {
    const nextIndex = currentSlide + 1 >= slides.length ? currentSlide : currentSlide + 1;
    setCurrentSlide(nextIndex);
    setIsLastSlide(nextIndex >= slides.length - 1);
    setSlide(slides[nextIndex]);
  };

  return (
    <SafeUIView style={styles.page}>
      <Image source={images[currentSlide]} style={styles.bgImage} />
      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        locations={[0.25, 1]}
        style={styles.imageFilter}
      />
      <View style={styles.mainView}>
        <View style={styles.slide}>
          <Text style={styles.title}>
            Rollo e' <Text style={[styles.title, { color: Colors.accent1 }]}>{slide.title}</Text>
          </Text>
          <Text style={styles.description}>{slide.description}</Text>
          <TouchableWithoutFeedback onPress={nextSlide}>
            <Link href={isLastSlide ? '/auth/login' : '/about'} style={styles.next}>
              <View style={styles.nextContainer}>
                <Text style={styles.nextText}>{isLastSlide ? 'Accedi' : 'Avanti'}</Text>
                <CaretRightFill
                  scaleX={1.5}
                  scaleY={1.2}
                  fill={Colors.secondary}
                  style={{ marginBottom: 3 }}
                />
              </View>
            </Link>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeUIView>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 0,
  },
  bgImage: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: -2,
  },
  imageFilter: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    width: Dimensions.get('window').width,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  next: {
    padding: 10,
    marginRight: 30,
    marginLeft: 'auto',
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nextText: {
    color: Colors.secondary,
    fontSize: 20,
    fontFamily: 'Montserrat_800ExtraBold',
  },
});
