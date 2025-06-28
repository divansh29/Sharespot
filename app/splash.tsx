import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Share2 } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  const navigateToMain = () => {
    router.replace('/(tabs)');
  };

  useEffect(() => {
    // Background fade in
    backgroundOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });

    // Logo animation
    logoOpacity.value = withDelay(
      200,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.quad),
      })
    );

    logoScale.value = withDelay(
      200,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      })
    );

    // Title animation
    titleOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      })
    );

    titleTranslateY.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      })
    );

    // Tagline animation
    taglineOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      })
    );

    // Progress bar animation
    progressWidth.value = withDelay(
      1000,
      withTiming(100, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      }, () => {
        runOnJS(navigateToMain)();
      })
    );
  }, []);

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundContainer, backgroundAnimatedStyle]}>
        <LinearGradient
          colors={['#0A0A0A', '#1A1A1A', '#2D2D2D']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Subtle background pattern */}
        <View style={styles.patternContainer}>
          {Array.from({ length: 20 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.patternDot,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      <View style={styles.contentContainer}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.logoBackground}
          >
            <Share2 size={48} color="#FFFFFF" strokeWidth={2.5} />
          </LinearGradient>
        </Animated.View>

        {/* App Name */}
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={styles.appName}>ShareSpot</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineContainer, taglineAnimatedStyle]}>
          <Text style={styles.tagline}>Your neighborhood sharing network</Text>
        </Animated.View>

        {/* Loading Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressBar, progressAnimatedStyle]}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Brand mark */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>Connecting Communities</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#6366F1',
    borderRadius: 1,
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  titleContainer: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    letterSpacing: -1,
  },
  taglineContainer: {
    marginBottom: 80,
  },
  tagline: {
    fontSize: 16,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 200,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: '#2D2D2D',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  progressGradient: {
    flex: 1,
  },
  brandContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brandText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});