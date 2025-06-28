import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Search, Send, Users, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
  trustScore?: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Mike Chen',
    lastMessage: 'The power drill is ready for pickup!',
    timestamp: '2 min ago',
    unread: 1,
    isGroup: false,
    trustScore: 4.9
  },
  {
    id: '2',
    name: 'Oak Grove Emergency Team',
    lastMessage: 'All clear on the utility issue',
    timestamp: '15 min ago',
    unread: 0,
    isGroup: true
  },
  {
    id: '3',
    name: 'Emma Wilson',
    lastMessage: 'Thanks for the guitar lesson!',
    timestamp: '1 hour ago',
    unread: 0,
    isGroup: false,
    trustScore: 5.0
  },
  {
    id: '4',
    name: 'Neighborhood Watch',
    lastMessage: 'Jessica: Everything looks quiet tonight',
    timestamp: '2 hours ago',
    unread: 3,
    isGroup: true
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Mike Chen',
    content: 'Hi! I saw you\'re interested in borrowing my power drill.',
    timestamp: '10:30 AM',
    isMe: false
  },
  {
    id: '2',
    sender: 'You',
    content: 'Yes! I need it for a small home project. When would be convenient?',
    timestamp: '10:32 AM',
    isMe: true
  },
  {
    id: '3',
    sender: 'Mike Chen',
    content: 'Perfect! How about this afternoon around 3 PM? I\'ll be home.',
    timestamp: '10:35 AM',
    isMe: false
  },
  {
    id: '4',
    sender: 'You',
    content: 'That works great! Should I come to your place?',
    timestamp: '10:36 AM',
    isMe: true
  },
  {
    id: '5',
    sender: 'Mike Chen',
    content: 'The power drill is ready for pickup!',
    timestamp: '2:58 PM',
    isMe: false
  }
];

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        selectedConversation === item.id && styles.conversationItemSelected
      ]}
      onPress={() => setSelectedConversation(item.id)}
    >
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <View style={styles.conversationTitleContainer}>
            {item.isGroup && <Users size={16} color="#9CA3AF" />}
            <Text style={styles.conversationName}>{item.name}</Text>
            {!item.isGroup && item.trustScore && (
              <View style={styles.trustScoreContainer}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.trustScoreText}>{item.trustScore}</Text>
              </View>
            )}
          </View>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {item.unread > 0 && (
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.unreadBadge}
              >
                <Text style={styles.unreadText}>{item.unread}</Text>
              </LinearGradient>
            )}
          </View>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isMe ? styles.myMessage : styles.theirMessage
    ]}>
      {!item.isMe && (
        <Text style={styles.messageSender}>{item.sender}</Text>
      )}
      <View style={[
        styles.messageContent,
        item.isMe ? styles.myMessageContent : styles.theirMessageContent
      ]}>
        {item.isMe && (
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.myMessageGradient}
          />
        )}
        <Text style={[
          styles.messageText,
          item.isMe ? styles.myMessageText : styles.theirMessageText
        ]}>
          {item.content}
        </Text>
      </View>
      <Text style={[
        styles.messageTimestamp,
        item.isMe ? styles.myMessageTimestamp : styles.theirMessageTimestamp
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  const sendMessage = () => {
    if (messageText.trim()) {
      // Here you would normally send the message
      setMessageText('');
    }
  };

  if (selectedConversation) {
    const conversation = mockConversations.find(c => c.id === selectedConversation);
    
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#1A1A1A', '#2D2D2D']}
          style={styles.chatHeader}
        >
          <TouchableOpacity 
            onPress={() => setSelectedConversation(null)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{conversation?.name}</Text>
            {conversation?.isGroup && (
              <Text style={styles.chatHeaderSubtext}>Group • 12 members</Text>
            )}
          </View>
        </LinearGradient>

        <FlatList
          data={mockMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
        />

        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            placeholderTextColor="#6B7280"
          />
          <TouchableOpacity 
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!messageText.trim()}
          >
            <LinearGradient
              colors={!messageText.trim() ? ['#6B7280', '#6B7280'] : ['#6366F1', '#8B5CF6']}
              style={styles.sendGradient}
            >
              <Send size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1A1A1A', '#2D2D2D']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Stay connected with your community</Text>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickAction}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.quickActionIcon}
          >
            <MessageCircle size={20} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.quickActionText}>New Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.quickActionIcon}
          >
            <Users size={20} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Create Group</Text>
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <View style={styles.conversationsContainer}>
        <FlatList
          data={filteredConversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  searchContainer: {
    padding: 20,
    backgroundColor: '#0A0A0A',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0A0A0A',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Inter-Medium',
  },
  conversationsContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  conversationItemSelected: {
    backgroundColor: '#2D2D2D',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  conversationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
    fontFamily: 'Inter-Bold',
  },
  trustScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  trustScoreText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 2,
    fontFamily: 'Inter-Medium',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  unreadBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  // Chat Screen Styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: '#6366F1',
    fontFamily: 'Inter-Medium',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  chatHeaderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  messageContent: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  myMessageContent: {
    borderBottomRightRadius: 4,
  },
  theirMessageContent: {
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  myMessageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageText: {
    padding: 12,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    zIndex: 1,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: '#FFFFFF',
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  myMessageTimestamp: {
    color: '#9CA3AF',
    textAlign: 'right',
  },
  theirMessageTimestamp: {
    color: '#9CA3AF',
    textAlign: 'left',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 12,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});