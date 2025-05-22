import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SwipeToDismissView = ({ children, onDismiss }: { children: any; onDismiss: any }) => {
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT * 0.1) {
        runOnJS(onDismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.sheet, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 60,
    zIndex: 1,
    borderRadius: 30,
    isolation: 'isolate',
  },
});

export default SwipeToDismissView;
