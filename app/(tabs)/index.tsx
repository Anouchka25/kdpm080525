import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import Colors from '@/constants/Colors';
import { GlobalStyles, SPACING } from '@/constants/Theme';
import { StatusBar } from 'expo-status-bar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = SPACING.md;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredProperties = MOCK_PROPERTIES.filter(property => property.verified);
  const recentProperties = [...MOCK_PROPERTIES].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea} edges={['top']}>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>Ndjimba</Text>
          <Text style={styles.subtitle}>Votre logement à Libreville</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logements vérifiés</Text>
          <FlatList
            data={featuredProperties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PropertyCard 
                property={item} 
                width={CARD_WIDTH}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
            snapToInterval={CARD_WIDTH + CARD_MARGIN}
            decelerationRate="fast"
            snapToAlignment="start"
          />
        </View>
        
        <View style={[styles.section, styles.recentSection]}>
          <Text style={styles.sectionTitle}>Ajouts récents</Text>
          {recentProperties.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} property={property} horizontal />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary[500],
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginTop: -2,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: SPACING.md,
  },
  horizontalList: {
    marginLeft: -SPACING.md,
  },
  horizontalListContent: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.md,
    gap: CARD_MARGIN,
  },
  recentSection: {
    marginBottom: SPACING.lg,
  },
});