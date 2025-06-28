import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, Phone, Shield, Users, Zap, Clock, CircleCheck as CheckCircle, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface EmergencyContact {
  id: string;
  name: string;
  skill: string;
  distance: string;
  responseTime: string;
  available: boolean;
}

interface EmergencyAlert {
  id: string;
  type: string;
  location: string;
  time: string;
  responders: number;
  status: 'active' | 'resolved';
}

const emergencyTypes = [
  { id: 'medical', name: 'Medical Emergency', icon: '🚑', color: ['#EF4444', '#DC2626'] },
  { id: 'fire', name: 'Fire/Safety', icon: '🔥', color: ['#F59E0B', '#D97706'] },
  { id: 'security', name: 'Security Issue', icon: '🚨', color: ['#7C2D12', '#92400E'] },
  { id: 'utility', name: 'Utility Emergency', icon: '⚡', color: ['#F59E0B', '#D97706'] },
  { id: 'weather', name: 'Weather Related', icon: '🌪️', color: ['#06B6D4', '#0891B2'] },
  { id: 'other', name: 'Other Emergency', icon: '⚠️', color: ['#6B7280', '#4B5563'] },
];

const mockContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    skill: 'Emergency Medicine',
    distance: '0.1 miles',
    responseTime: '< 2 min',
    available: true
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    skill: 'Firefighter',
    distance: '0.3 miles',
    responseTime: '< 5 min',
    available: true
  },
  {
    id: '3',
    name: 'Jennifer Park',
    skill: 'Crisis Counselor',
    distance: '0.2 miles',
    responseTime: '< 3 min',
    available: false
  }
];

const mockAlerts: EmergencyAlert[] = [
  {
    id: '1',
    type: 'Utility Emergency',
    location: 'Oak Street & 5th Ave',
    time: '5 min ago',
    responders: 3,
    status: 'active'
  },
  {
    id: '2',
    type: 'Weather Related',
    location: 'Pine Grove Community',
    time: '1 hour ago',
    responders: 8,
    status: 'resolved'
  }
];

export default function EmergencyScreen() {
  const [selectedEmergency, setSelectedEmergency] = useState<string>('');

  const handleEmergencyCall = () => {
    Alert.alert(
      'Call 911?',
      'This will call emergency services. Only use for real emergencies.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 911', style: 'destructive', onPress: () => {
          Alert.alert('Emergency Called', 'Emergency services have been contacted.');
        }}
      ]
    );
  };

  const handleCommunityAlert = () => {
    if (!selectedEmergency) {
      Alert.alert('Select Emergency Type', 'Please select the type of emergency first.');
      return;
    }
    
    Alert.alert(
      'Send Community Alert?',
      'This will notify nearby neighbors who can help with this type of emergency.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Alert', onPress: () => {
          Alert.alert('Alert Sent!', 'Your community alert has been sent. Nearby neighbors will be notified.');
          setSelectedEmergency('');
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1A1A1A', '#2D2D2D']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.headerIcon}
            >
              <AlertTriangle size={32} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Emergency Network</Text>
              <Text style={styles.headerSubtitle}>Quick access to help when you need it</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Emergency Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.emergencyCallButton} onPress={handleEmergencyCall}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.emergencyCallGradient}
            >
              <Phone size={24} color="#FFFFFF" />
              <Text style={styles.emergencyCallText}>Call 911</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Community Alert */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Send Community Alert</Text>
          <Text style={styles.sectionSubtitle}>Alert neighbors who can help with specific emergencies</Text>
          
          <View style={styles.emergencyTypeGrid}>
            {emergencyTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.emergencyTypeCard,
                  selectedEmergency === type.id && styles.emergencyTypeCardSelected
                ]}
                onPress={() => setSelectedEmergency(type.id)}
              >
                {selectedEmergency === type.id && (
                  <LinearGradient
                    colors={type.color}
                    style={styles.emergencyTypeGradient}
                  />
                )}
                <Text style={styles.emergencyTypeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.emergencyTypeName,
                  selectedEmergency === type.id && styles.emergencyTypeNameSelected
                ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.alertButton, !selectedEmergency && styles.alertButtonDisabled]}
            onPress={handleCommunityAlert}
            disabled={!selectedEmergency}
          >
            <LinearGradient
              colors={!selectedEmergency ? ['#6B7280', '#6B7280'] : ['#F59E0B', '#D97706']}
              style={styles.alertGradient}
            >
              <Zap size={20} color="#FFFFFF" />
              <Text style={styles.alertButtonText}>Send Community Alert</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Emergency Responders Nearby</Text>
          <Text style={styles.sectionSubtitle}>Neighbors with emergency response skills</Text>
          
          <View style={styles.contactsList}>
            {mockContacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.contactInfo}>
                  <View style={styles.contactHeader}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: contact.available ? '#10B981' : '#F59E0B' }
                    ]}>
                      <Text style={styles.statusText}>
                        {contact.available ? 'Available' : 'Busy'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.contactSkill}>{contact.skill}</Text>
                  <View style={styles.contactMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={14} color="#9CA3AF" />
                      <Text style={styles.metaText}>{contact.distance}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#9CA3AF" />
                      <Text style={styles.metaText}>{contact.responseTime}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.contactButton, !contact.available && styles.contactButtonDisabled]}
                  disabled={!contact.available}
                >
                  <LinearGradient
                    colors={contact.available ? ['#6366F1', '#8B5CF6'] : ['#6B7280', '#6B7280']}
                    style={styles.contactButtonGradient}
                  >
                    <Phone size={16} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Active Alerts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Community Alerts</Text>
          <Text style={styles.sectionSubtitle}>Recent emergency alerts in your area</Text>
          
          <View style={styles.alertsList}>
            {mockAlerts.map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={styles.alertTypeContainer}>
                    <AlertTriangle size={16} color={alert.status === 'active' ? '#EF4444' : '#9CA3AF'} />
                    <Text style={[
                      styles.alertType,
                      { color: alert.status === 'active' ? '#EF4444' : '#9CA3AF' }
                    ]}>
                      {alert.type}
                    </Text>
                  </View>
                  <View style={[
                    styles.alertStatus,
                    { backgroundColor: alert.status === 'active' ? '#1F2937' : '#1F2937' }
                  ]}>
                    {alert.status === 'active' ? (
                      <Clock size={12} color="#EF4444" />
                    ) : (
                      <CheckCircle size={12} color="#10B981" />
                    )}
                    <Text style={[
                      styles.alertStatusText,
                      { color: alert.status === 'active' ? '#EF4444' : '#10B981' }
                    ]}>
                      {alert.status === 'active' ? 'Active' : 'Resolved'}
                    </Text>
                  </View>
                </View>
                <View style={styles.alertContent}>
                  <View style={styles.alertMeta}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.alertLocation}>{alert.location}</Text>
                  </View>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
                <View style={styles.alertFooter}>
                  <View style={styles.respondersInfo}>
                    <Users size={14} color="#9CA3AF" />
                    <Text style={styles.respondersText}>{alert.responders} neighbors responding</Text>
                  </View>
                  {alert.status === 'active' && (
                    <TouchableOpacity style={styles.respondButton}>
                      <LinearGradient
                        colors={['#6366F1', '#8B5CF6']}
                        style={styles.respondGradient}
                      >
                        <Text style={styles.respondButtonText}>Help</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.sectionContainer}>
          <View style={styles.safetyTipsHeader}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.safetyIcon}
            >
              <Shield size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.sectionTitle}>Safety Reminders</Text>
          </View>
          <View style={styles.safetyTips}>
            <Text style={styles.safetyTip}>• Keep emergency contacts updated</Text>
            <Text style={styles.safetyTip}>• Know your neighbors and their skills</Text>
            <Text style={styles.safetyTip}>• Have a family emergency plan</Text>
            <Text style={styles.safetyTip}>• Keep basic emergency supplies ready</Text>
          </View>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
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
  actionsContainer: {
    padding: 20,
  },
  emergencyCallButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyCallGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  emergencyCallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
    fontFamily: 'Inter-Bold',
  },
  sectionContainer: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  emergencyTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  emergencyTypeCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  emergencyTypeCardSelected: {
    borderColor: '#EF4444',
  },
  emergencyTypeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  emergencyTypeIcon: {
    fontSize: 24,
    marginBottom: 8,
    zIndex: 1,
  },
  emergencyTypeName: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    zIndex: 1,
  },
  emergencyTypeNameSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  alertButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  alertButtonDisabled: {
    opacity: 0.6,
  },
  alertGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  contactSkill: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  contactMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
    overflow: 'hidden',
  },
  contactButtonDisabled: {
    opacity: 0.6,
  },
  contactButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertsList: {
    gap: 12,
  },
  alertCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
    fontFamily: 'Inter-Bold',
  },
  alertStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertStatusText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  alertContent: {
    marginBottom: 12,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertLocation: {
    fontSize: 14,
    color: '#D1D5DB',
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
  },
  alertTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  respondersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  respondersText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  respondButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  respondGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  respondButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  safetyTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  safetyTips: {
    gap: 8,
  },
  safetyTip: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
});