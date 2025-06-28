import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Camera, MapPin, Clock, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ShareForm {
  title: string;
  description: string;
  category: string;
  availability: string;
  location: string;
}

const categories = [
  { id: 'tools', name: 'Tools', icon: '🔧', color: ['#6366F1', '#8B5CF6'] },
  { id: 'skills', name: 'Skills', icon: '🎓', color: ['#10B981', '#059669'] },
  { id: 'meals', name: 'Meals', icon: '🍽️', color: ['#F59E0B', '#D97706'] },
  { id: 'transportation', name: 'Transportation', icon: '🚗', color: ['#8B5CF6', '#7C3AED'] },
  { id: 'accommodation', name: 'Accommodation', icon: '🏠', color: ['#06B6D4', '#0891B2'] },
  { id: 'services', name: 'Services', icon: '💼', color: ['#EF4444', '#DC2626'] },
];

const availabilityOptions = [
  'Available Now',
  'Available Today',
  'Available This Week',
  'Available by Appointment',
  'Flexible Schedule'
];

export default function ShareScreen() {
  const [form, setForm] = useState<ShareForm>({
    title: '',
    description: '',
    category: '',
    availability: '',
    location: ''
  });

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.description) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    Alert.alert(
      'Resource Shared!', 
      'Your resource has been shared with the community. Neighbors will be able to see and request it.',
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: '',
      availability: '',
      location: ''
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1A1A1A', '#2D2D2D']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Share a Resource</Text>
          <Text style={styles.headerSubtitle}>Help your neighbors by sharing what you have</Text>
        </LinearGradient>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What are you sharing? *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Power Drill, Guitar Lessons, Homemade Soup"
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    form.category === category.id && styles.categoryCardSelected
                  ]}
                  onPress={() => setForm({ ...form, category: category.id })}
                >
                  {form.category === category.id && (
                    <LinearGradient
                      colors={category.color}
                      style={styles.categoryGradient}
                    />
                  )}
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryName,
                    form.category === category.id && styles.categoryNameSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what you're sharing, any conditions, or special instructions..."
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Availability */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>When is it available?</Text>
            <View style={styles.availabilityContainer}>
              {availabilityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.availabilityChip,
                    form.availability === option && styles.availabilityChipSelected
                  ]}
                  onPress={() => setForm({ ...form, availability: option })}
                >
                  {form.availability === option && (
                    <LinearGradient
                      colors={['#6366F1', '#8B5CF6']}
                      style={styles.availabilityGradient}
                    />
                  )}
                  <Clock size={16} color={form.availability === option ? '#FFFFFF' : '#9CA3AF'} />
                  <Text style={[
                    styles.availabilityText,
                    form.availability === option && styles.availabilityTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup/Meeting Location</Text>
            <View style={styles.locationContainer}>
              <MapPin size={20} color="#9CA3AF" />
              <TextInput
                style={styles.locationInput}
                placeholder="e.g., My driveway, Community Center, Flexible"
                value={form.location}
                onChangeText={(text) => setForm({ ...form, location: text })}
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>

          {/* Photo Upload */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add Photos (Optional)</Text>
            <TouchableOpacity style={styles.photoUpload}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.photoUploadIcon}
              >
                <Camera size={32} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.photoUploadText}>Tap to add photos</Text>
              <Text style={styles.photoUploadSubtext}>Help neighbors see what you're sharing</Text>
            </TouchableOpacity>
          </View>

          {/* Community Guidelines */}
          <View style={styles.guidelinesContainer}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.guidelinesIcon}
            >
              <Users size={20} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.guidelinesContent}>
              <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
              <Text style={styles.guidelinesText}>
                • Be honest about condition and availability{'\n'}
                • Respond promptly to requests{'\n'}
                • Meet in safe, public locations when possible{'\n'}
                • Rate and review after each exchange
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, (!form.title || !form.category || !form.description) && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!form.title || !form.category || !form.description}
          >
            <LinearGradient
              colors={(!form.title || !form.category || !form.description) ? ['#6B7280', '#6B7280'] : ['#6366F1', '#8B5CF6']}
              style={styles.submitGradient}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Share with Community</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  categoryCardSelected: {
    borderColor: '#6366F1',
  },
  categoryGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
    zIndex: 1,
  },
  categoryName: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    zIndex: 1,
  },
  categoryNameSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  availabilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  availabilityChipSelected: {
    borderColor: '#6366F1',
  },
  availabilityGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  availabilityText: {
    fontSize: 14,
    color: '#D1D5DB',
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
    zIndex: 1,
  },
  availabilityTextSelected: {
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  photoUpload: {
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#2D2D2D',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  photoUploadText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    fontFamily: 'Inter-Medium',
  },
  photoUploadSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  guidelinesContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  guidelinesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guidelinesContent: {
    flex: 1,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  guidelinesText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
});