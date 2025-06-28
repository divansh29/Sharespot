import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Star, Award, MapPin, Shield, Bell, Settings, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Zap, Users, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface UserProfile {
  name: string;
  neighborhood: string;
  joinDate: string;
  trustScore: number;
  points: number;
  level: string;
  completedExchanges: number;
  helpedNeighbors: number;
  emergencyResponses: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  total?: number;
}

const mockProfile: UserProfile = {
  name: 'Sarah Johnson',
  neighborhood: 'Oak Grove',
  joinDate: 'January 2024',
  trustScore: 4.8,
  points: 1250,
  level: 'Trusted Neighbor',
  completedExchanges: 28,
  helpedNeighbors: 15,
  emergencyResponses: 3
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Share',
    description: 'Shared your first resource',
    icon: '🎉',
    earned: true
  },
  {
    id: '2',
    title: 'Helper',
    description: 'Helped 10 neighbors',
    icon: '🤝',
    earned: true
  },
  {
    id: '3',
    title: 'Emergency Hero',
    description: 'Responded to 5 emergencies',
    icon: '🦸',
    earned: false,
    progress: 3,
    total: 5
  },
  {
    id: '4',
    title: 'Community Champion',
    description: 'Completed 50 exchanges',
    icon: '🏆',
    earned: false,
    progress: 28,
    total: 50
  }
];

const settingsOptions = [
  { id: 'notifications', title: 'Push Notifications', type: 'toggle', value: true },
  { id: 'emergency', title: 'Emergency Alerts', type: 'toggle', value: true },
  { id: 'location', title: 'Location Sharing', type: 'toggle', value: true },
  { id: 'privacy', title: 'Privacy Settings', type: 'navigation' },
  { id: 'help', title: 'Help & Support', type: 'navigation' },
  { id: 'about', title: 'About', type: 'navigation' },
];

export default function ProfileScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    emergency: true,
    location: true
  });

  const handleSettingToggle = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          Alert.alert('Signed Out', 'You have been signed out successfully.');
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
          <View style={styles.profileInfo}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.avatarContainer}
            >
              <User size={40} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.profileDetails}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{mockProfile.name}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Edit size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#9CA3AF" />
                <Text style={styles.location}>{mockProfile.neighborhood}</Text>
              </View>
              <Text style={styles.joinDate}>Member since {mockProfile.joinDate}</Text>
            </View>
          </View>
          
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.levelBadge}
          >
            <Award size={16} color="#FFFFFF" />
            <Text style={styles.levelText}>{mockProfile.level}</Text>
          </LinearGradient>
        </LinearGradient>

        {/* Trust Score */}
        <View style={styles.trustSection}>
          <View style={styles.trustScoreContainer}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.trustIcon}
            >
              <Shield size={24} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.trustInfo}>
              <Text style={styles.trustScore}>{mockProfile.trustScore}</Text>
              <Text style={styles.trustLabel}>Trust Score</Text>
            </View>
          </View>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={20} 
                color="#F59E0B" 
                fill={star <= Math.floor(mockProfile.trustScore) ? "#F59E0B" : "transparent"} 
              />
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.statIcon}
            >
              <Zap size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statValue}>{mockProfile.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.statIcon}
            >
              <Users size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statValue}>{mockProfile.helpedNeighbors}</Text>
            <Text style={styles.statLabel}>Neighbors Helped</Text>
          </View>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.statIcon}
            >
              <Heart size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.statValue}>{mockProfile.emergencyResponses}</Text>
            <Text style={styles.statLabel}>Emergency Responses</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {mockAchievements.map((achievement) => (
              <View key={achievement.id} style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementCardDisabled
              ]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.earned && styles.achievementTitleDisabled
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.achievementDescriptionDisabled
                  ]}>
                    {achievement.description}
                  </Text>
                  {!achievement.earned && achievement.progress && achievement.total && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={['#6366F1', '#8B5CF6']}
                          style={[
                            styles.progressFill,
                            { width: `${(achievement.progress / achievement.total) * 100}%` }
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {achievement.progress}/{achievement.total}
                      </Text>
                    </View>
                  )}
                </View>
                {achievement.earned && (
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    style={styles.earnedBadge}
                  >
                    <Text style={styles.earnedText}>✓</Text>
                  </LinearGradient>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsOptions.map((option) => (
              <View key={option.id} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                </View>
                {option.type === 'toggle' ? (
                  <Switch
                    value={settings[option.id as keyof typeof settings]}
                    onValueChange={(value) => handleSettingToggle(option.id, value)}
                    trackColor={{ false: '#2D2D2D', true: '#6366F1' }}
                    thumbColor={settings[option.id as keyof typeof settings] ? '#FFFFFF' : '#9CA3AF'}
                  />
                ) : (
                  <TouchableOpacity style={styles.settingArrow}>
                    <Text style={styles.settingArrowText}>›</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.logoutGradient}
            >
              <LogOut size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Community Share v1.0.0</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
  },
  trustSection: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  trustScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trustInfo: {
    marginLeft: 12,
  },
  trustScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  trustLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
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
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  achievementCardDisabled: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  achievementTitleDisabled: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  achievementDescriptionDisabled: {
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#2D2D2D',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Medium',
  },
  earnedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  settingsList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  settingArrow: {
    padding: 4,
  },
  settingArrowText: {
    fontSize: 18,
    color: '#6B7280',
  },
  logoutContainer: {
    margin: 20,
    marginTop: 0,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
});