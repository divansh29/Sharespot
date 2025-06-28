import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star, Clock, Zap, Award, Plus, TriangleAlert as AlertTriangle, X, Heart, Share, User, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Resource {
  id: string;
  title: string;
  category: string;
  owner: string;
  rating: number;
  distance: string;
  image: string;
  trustScore: number;
  isAvailable: boolean;
  price?: string;
  description: string;
  fullDescription: string;
  createdAt: string;
  isNew: boolean;
  isFeatured: boolean;
  relatedItems: string[];
}

interface User {
  name: string;
  neighborhood: string;
  trustScore: number;
  points: number;
  level: string;
}

const mockUser: User = {
  name: 'Sarah Johnson',
  neighborhood: 'Oak Grove',
  trustScore: 4.8,
  points: 1250,
  level: 'Trusted Neighbor'
};

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Photography Session',
    category: 'Skills',
    owner: 'Alex Rivera',
    rating: 4.9,
    distance: '0.3 miles',
    image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.8,
    isAvailable: true,
    price: '$50/hour',
    description: 'Professional portrait and event photography',
    fullDescription: 'Professional photographer with 8+ years of experience specializing in portraits, family photos, and special events. I use high-end equipment and provide edited digital photos within 48 hours. Perfect for headshots, family portraits, graduation photos, or small events. All sessions include a consultation to discuss your vision and preferred style.',
    createdAt: '2024-01-15T10:30:00Z',
    isNew: false,
    isFeatured: true,
    relatedItems: ['2', '4']
  },
  {
    id: '2',
    title: 'Guitar Lessons for Beginners',
    category: 'Skills',
    owner: 'Emma Wilson',
    rating: 5.0,
    distance: '0.4 miles',
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.9,
    isAvailable: true,
    price: '$25/hour',
    description: 'Learn guitar from a certified instructor',
    fullDescription: 'Professional guitar lessons for beginners and intermediate players. I have 10+ years of teaching experience and can help you learn acoustic or electric guitar. Lessons include music theory, chord progressions, and your favorite songs. All skill levels welcome!',
    createdAt: '2024-01-16T14:20:00Z',
    isNew: true,
    isFeatured: false,
    relatedItems: ['3']
  },
  {
    id: '3',
    title: 'Homemade Italian Lasagna',
    category: 'Meals',
    owner: 'Tony Martinez',
    rating: 4.8,
    distance: '0.1 miles',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.6,
    isAvailable: true,
    price: '$15',
    description: 'Fresh homemade lasagna with family recipe',
    fullDescription: 'Authentic Italian lasagna made with my grandmother\'s secret recipe. Features layers of fresh pasta, homemade meat sauce, ricotta, mozzarella, and parmesan cheese. Serves 6-8 people. Made fresh daily with organic ingredients from local farmers market.',
    createdAt: '2024-01-16T16:45:00Z',
    isNew: true,
    isFeatured: true,
    relatedItems: ['4', '5']
  },
  {
    id: '4',
    title: 'Airport Ride Service',
    category: 'Transportation',
    owner: 'Jessica Lee',
    rating: 4.7,
    distance: '0.3 miles',
    image: 'https://images.pexels.com/photos/1048040/pexels-photo-1048040.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.8,
    isAvailable: false,
    price: '$30',
    description: 'Reliable airport transportation',
    fullDescription: 'Safe and reliable transportation to and from the airport. Clean, comfortable vehicle with space for luggage. Available 24/7 with advance booking. Licensed and insured driver with 5+ years experience. Can accommodate up to 4 passengers.',
    createdAt: '2024-01-14T09:15:00Z',
    isNew: false,
    isFeatured: false,
    relatedItems: ['1', '2']
  },
  {
    id: '5',
    title: 'Fresh Baked Sourdough Bread',
    category: 'Meals',
    owner: 'Maria Garcia',
    rating: 4.9,
    distance: '0.5 miles',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.8,
    isAvailable: true,
    price: '$8',
    description: 'Artisan sourdough bread baked daily',
    fullDescription: 'Handcrafted sourdough bread made with natural starter that\'s been maintained for over 5 years. Baked fresh every morning using organic flour and traditional techniques. Crispy crust, soft interior, perfect for sandwiches or toast. Available in whole wheat and classic varieties.',
    createdAt: '2024-01-16T18:30:00Z',
    isNew: true,
    isFeatured: false,
    relatedItems: ['3']
  },
  {
    id: '6',
    title: 'Garden Design Consultation',
    category: 'Skills',
    owner: 'David Kim',
    rating: 4.6,
    distance: '0.6 miles',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
    trustScore: 4.5,
    isAvailable: true,
    price: '$40/hour',
    description: 'Professional landscape and garden design',
    fullDescription: 'Certified landscape designer with 12+ years of experience creating beautiful, sustainable gardens. I specialize in native plant gardens, vegetable gardens, and drought-resistant landscaping. Consultation includes site analysis, design recommendations, and plant selection guidance. Perfect for homeowners looking to transform their outdoor space.',
    createdAt: '2024-01-15T12:00:00Z',
    isNew: false,
    isFeatured: false,
    relatedItems: ['1']
  }
];

const categories = ['All', 'Featured', 'New', 'Tools', 'Skills', 'Meals', 'Transportation'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || 
                           (selectedCategory === 'Featured' && resource.isFeatured) ||
                           (selectedCategory === 'New' && resource.isNew) ||
                           resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = mockResources.filter(resource => resource.isFeatured);
  const newResources = mockResources.filter(resource => resource.isNew);

  const openDetailModal = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedResource(null);
  };

  const toggleLike = (resourceId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  const renderResourceCard = ({ item: resource, index }: { item: Resource; index: number }) => (
    <View style={styles.resourceCard}>
      <TouchableOpacity
        onPress={() => openDetailModal(resource)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: resource.image }} style={styles.resourceImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          />
          
          {/* Badges */}
          <View style={styles.badgeContainer}>
            {resource.isNew && (
              <LinearGradient colors={['#10B981', '#059669']} style={styles.newBadge}>
                <Text style={styles.badgeText}>NEW</Text>
              </LinearGradient>
            )}
            {resource.isFeatured && (
              <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.featuredBadge}>
                <Star size={12} color="#FFFFFF" fill="#FFFFFF" />
              </LinearGradient>
            )}
          </View>

          {/* Like Button */}
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => toggleLike(resource.id)}
          >
            <Heart
              size={20}
              color={likedItems.has(resource.id) ? "#EF4444" : "#FFFFFF"}
              fill={likedItems.has(resource.id) ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.resourceInfo}>
          <View style={styles.resourceHeader}>
            <Text style={styles.resourceTitle} numberOfLines={1}>{resource.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: resource.isAvailable ? '#10B981' : '#F59E0B' }]}>
              <Text style={styles.statusText}>{resource.isAvailable ? 'Available' : 'Busy'}</Text>
            </View>
          </View>
          
          <Text style={styles.categoryText}>{resource.category}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>{resource.description}</Text>
          
          <View style={styles.ownerInfo}>
            <View style={styles.ownerDetails}>
              <User size={14} color="#9CA3AF" />
              <Text style={styles.ownerName}>{resource.owner}</Text>
            </View>
            <View style={styles.trustScore}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.trustText}>{resource.trustScore}</Text>
            </View>
          </View>
          
          <View style={styles.resourceFooter}>
            <View style={styles.distanceInfo}>
              <MapPin size={14} color="#9CA3AF" />
              <Text style={styles.distanceText}>{resource.distance}</Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.priceText}>{resource.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = (title: string, items: Resource[]) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{items.length} items</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <LinearGradient
          colors={['#1A1A1A', '#2D2D2D']}
          style={styles.header}
        >
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <View style={styles.locationInfo}>
              <MapPin size={16} color="#9CA3AF" />
              <Text style={styles.locationText}>{mockUser.neighborhood}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.statGradient}
              >
                <Zap size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.statValue}>{mockUser.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.statGradient}
              >
                <Award size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.statValue}>{mockUser.trustScore}</Text>
              <Text style={styles.statLabel}>Trust</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search resources or neighbors..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              {selectedCategory === category && (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.categoryGradient}
                />
              )}
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.quickActionIcon}
              >
                <Plus size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Share Resource</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.quickActionIcon}
              >
                <Clock size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Need Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.quickActionIcon}
              >
                <AlertTriangle size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
        {selectedCategory === 'All' && featuredResources.length > 0 && (
          <View style={styles.resourcesContainer}>
            {renderSectionHeader('Featured Resources', featuredResources)}
            <FlatList
              data={featuredResources}
              renderItem={renderResourceCard}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
          </View>
        )}

        {/* New Items Section */}
        {selectedCategory === 'All' && newResources.length > 0 && (
          <View style={styles.resourcesContainer}>
            {renderSectionHeader('Recently Added', newResources)}
            <FlatList
              data={newResources}
              renderItem={renderResourceCard}
              keyExtractor={(item) => `new-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
          </View>
        )}

        {/* All Resources */}
        <View style={styles.resourcesContainer}>
          {renderSectionHeader(
            selectedCategory === 'All' ? 'All Resources' : `${selectedCategory} Resources`,
            filteredResources
          )}
          <FlatList
            data={filteredResources}
            renderItem={renderResourceCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={isDetailModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeDetailModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedResource && (
                <>
                  {/* Header Image */}
                  <View style={styles.modalImageContainer}>
                    <Image source={{ uri: selectedResource.image }} style={styles.modalImage} />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.modalImageOverlay}
                    />
                    
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={closeDetailModal}>
                      <View style={styles.closeButtonBackground}>
                        <ArrowLeft size={24} color="#FFFFFF" />
                      </View>
                    </TouchableOpacity>

                    {/* Action Buttons */}
                    <View style={styles.modalActionButtons}>
                      <TouchableOpacity
                        style={styles.modalActionButton}
                        onPress={() => toggleLike(selectedResource.id)}
                      >
                        <View style={styles.actionButtonBackground}>
                          <Heart
                            size={20}
                            color={likedItems.has(selectedResource.id) ? "#EF4444" : "#FFFFFF"}
                            fill={likedItems.has(selectedResource.id) ? "#EF4444" : "transparent"}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalActionButton}>
                        <View style={styles.actionButtonBackground}>
                          <Share size={20} color="#FFFFFF" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={styles.modalContentBody}>
                    <View style={styles.modalHeader}>
                      <View style={styles.modalTitleContainer}>
                        <Text style={styles.modalTitle}>{selectedResource.title}</Text>
                        <View style={[styles.modalStatusBadge, { backgroundColor: selectedResource.isAvailable ? '#10B981' : '#F59E0B' }]}>
                          <Text style={styles.modalStatusText}>
                            {selectedResource.isAvailable ? 'Available' : 'Busy'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.modalPrice}>{selectedResource.price}</Text>
                    </View>

                    <View style={styles.modalMetaInfo}>
                      <View style={styles.modalMetaItem}>
                        <Text style={styles.modalCategory}>{selectedResource.category}</Text>
                      </View>
                      <View style={styles.modalMetaItem}>
                        <MapPin size={16} color="#9CA3AF" />
                        <Text style={styles.modalDistance}>{selectedResource.distance}</Text>
                      </View>
                      <View style={styles.modalMetaItem}>
                        <Star size={16} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.modalRating}>{selectedResource.rating}</Text>
                      </View>
                    </View>

                    <Text style={styles.modalDescription}>{selectedResource.fullDescription}</Text>

                    {/* Owner Info */}
                    <View style={styles.ownerSection}>
                      <Text style={styles.ownerSectionTitle}>Shared by</Text>
                      <View style={styles.ownerCard}>
                        <LinearGradient
                          colors={['#6366F1', '#8B5CF6']}
                          style={styles.ownerAvatar}
                        >
                          <User size={24} color="#FFFFFF" />
                        </LinearGradient>
                        <View style={styles.ownerCardInfo}>
                          <Text style={styles.ownerCardName}>{selectedResource.owner}</Text>
                          <View style={styles.ownerCardMeta}>
                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                            <Text style={styles.ownerCardTrust}>{selectedResource.trustScore} trust score</Text>
                          </View>
                        </View>
                        <TouchableOpacity style={styles.contactButton}>
                          <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.contactButtonGradient}>
                            <Text style={styles.contactButtonText}>Contact</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Related Items */}
                    {selectedResource.relatedItems.length > 0 && (
                      <View style={styles.relatedSection}>
                        <Text style={styles.relatedSectionTitle}>Related Items</Text>
                        <FlatList
                          data={mockResources.filter(r => selectedResource.relatedItems.includes(r.id))}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.relatedItem}
                              onPress={() => {
                                setSelectedResource(item);
                              }}
                            >
                              <Image source={{ uri: item.image }} style={styles.relatedItemImage} />
                              <View style={styles.relatedItemInfo}>
                                <Text style={styles.relatedItemTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.relatedItemPrice}>{item.price}</Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item) => `related-${item.id}`}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={styles.relatedList}
                          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        />
                      </View>
                    )}

                    {/* Request Button */}
                    <TouchableOpacity style={styles.requestButton}>
                      <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.requestButtonGradient}>
                        <Text style={styles.requestButtonText}>
                          {selectedResource.category === 'Skills' ? 'Book Session' : 'Request Item'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 16,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  statGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
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
  categoriesContainer: {
    backgroundColor: '#0A0A0A',
    paddingBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    position: 'relative',
    overflow: 'hidden',
  },
  categoryChipActive: {
    borderColor: '#6366F1',
  },
  categoryGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Medium',
    zIndex: 1,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  resourcesContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionCount: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  horizontalList: {
    paddingRight: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  resourceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
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
    width: (screenWidth - 60) / 2,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  resourceImage: {
    width: '100%',
    height: 120,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
  },
  newBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  featuredBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    padding: 12,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    fontFamily: 'Inter-Bold',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  categoryText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  descriptionText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  ownerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ownerName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  trustScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 12,
    color: '#6366F1',
    fontFamily: 'Inter-Bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: screenHeight * 0.9,
    overflow: 'hidden',
  },
  modalImageContainer: {
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButtonBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionButtons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  modalActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionButtonBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentBody: {
    padding: 20,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    fontFamily: 'Inter-Bold',
  },
  modalStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  modalStatusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  modalPrice: {
    fontSize: 20,
    color: '#6366F1',
    fontFamily: 'Inter-Bold',
  },
  modalMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCategory: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Medium',
  },
  modalDistance: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  modalRating: {
    fontSize: 14,
    color: '#D1D5DB',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  modalDescription: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  ownerSection: {
    marginBottom: 24,
  },
  ownerSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ownerCardInfo: {
    flex: 1,
  },
  ownerCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  ownerCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ownerCardTrust: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  contactButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  relatedSection: {
    marginBottom: 24,
  },
  relatedSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  relatedList: {
    paddingRight: 20,
  },
  relatedItem: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    width: 120,
  },
  relatedItemImage: {
    width: '100%',
    height: 80,
  },
  relatedItemInfo: {
    padding: 8,
  },
  relatedItemTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  relatedItemPrice: {
    fontSize: 10,
    color: '#6366F1',
    fontFamily: 'Inter-Bold',
  },
  requestButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  requestButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
});