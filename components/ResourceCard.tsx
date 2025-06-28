import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, Clock } from 'lucide-react-native';

interface ResourceCardProps {
  title: string;
  category: string;
  owner: string;
  rating: number;
  distance: string;
  image: string;
  trustScore: number;
  isAvailable: boolean;
  onPress?: () => void;
}

export default function ResourceCard({
  title,
  category,
  owner,
  rating,
  distance,
  image,
  trustScore,
  isAvailable,
  onPress
}: ResourceCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: isAvailable ? '#10b981' : '#f59e0b' }]}>
            <Text style={styles.statusText}>{isAvailable ? 'Available' : 'Busy'}</Text>
          </View>
        </View>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.ownerInfo}>
          <Text style={styles.ownerName}>by {owner}</Text>
          <View style={styles.trustScore}>
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.trustText}>{trustScore}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.distanceInfo}>
            <MapPin size={14} color="#6b7280" />
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
          <View style={styles.ratingInfo}>
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    fontFamily: 'Inter-Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
  },
  category: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  ownerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ownerName: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  trustScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
});