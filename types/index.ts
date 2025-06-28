export interface User {
  id: string;
  name: string;
  email: string;
  neighborhood: string;
  trustScore: number;
  points: number;
  level: string;
  joinDate: string;
  skills: string[];
  isVerified: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  ownerId: string;
  owner: string;
  images: string[];
  isAvailable: boolean;
  location: string;
  distance: string;
  rating: number;
  trustScore: number;
  createdAt: string;
  updatedAt: string;
}

export type ResourceCategory = 
  | 'tools'
  | 'skills'
  | 'meals'
  | 'transportation'
  | 'accommodation'
  | 'services';

export interface EmergencyAlert {
  id: string;
  type: EmergencyType;
  title: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reporterId: string;
  reporter: string;
  status: 'active' | 'resolved' | 'cancelled';
  responders: string[];
  createdAt: string;
  resolvedAt?: string;
}

export type EmergencyType =
  | 'medical'
  | 'fire'
  | 'security'
  | 'utility'
  | 'weather'
  | 'other';

export interface Message {
  id: string;
  senderId: string;
  sender: string;
  content: string;
  timestamp: string;
  conversationId: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  participants: string[];
  isGroup: boolean;
  lastMessage: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirements: AchievementRequirement[];
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export type AchievementCategory =
  | 'sharing'
  | 'helping'
  | 'emergency'
  | 'community'
  | 'trust';

export interface AchievementRequirement {
  type: string;
  value: number;
  current: number;
}

export interface TrustRating {
  id: string;
  raterId: string;
  rater: string;
  ratedUserId: string;
  resourceId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  totalResources: number;
  completedExchanges: number;
  emergencyResponses: number;
  averageTrustScore: number;
}