import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/Button';
import { MOCK_PROPERTIES, PROPERTY_TYPES, LIBREVILLE_NEIGHBORHOODS, AKANDA_NEIGHBORHOODS, OWENDO_NEIGHBORHOODS } from '@/data/properties';
import { Property, PropertyType, SearchFilters } from '@/types/property';
import Colors from '@/constants/Colors';
import { GlobalStyles, SPACING, BORDER_RADIUS } from '@/constants/Theme';
import { ArrowDown, ArrowUp, Check, FileSliders as Sliders, MapPin } from 'lucide-react-native';

const PRICE_RANGES = [
  { min: 0, max: 100000, label: 'Moins de 100 000 FCFA' },
  { min: 100000, max: 200000, label: '100 000 - 200 000 FCFA' },
  { min: 200000, max: 300000, label: '200 000 - 300 000 FCFA' },
  { min: 300000, max: 500000, label: '300 000 - 500 000 FCFA' },
  { min: 500000, max: null, label: 'Plus de 500 000 FCFA' },
];

const CITIES = [
  { value: 'Libreville', label: 'Libreville' },
  { value: 'Akanda', label: 'Akanda' },
  { value: 'Owendo', label: 'Owendo' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [filters, setFilters] = useState<SearchFilters>({
    neighborhoods: [],
    propertyType: [],
    city: undefined,
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'date_desc'>('date_desc');

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setFilters(prevFilters => {
      const neighborhoods = prevFilters.neighborhoods.includes(neighborhood)
        ? prevFilters.neighborhoods.filter(n => n !== neighborhood)
        : [...prevFilters.neighborhoods, neighborhood];
      
      return { ...prevFilters, neighborhoods };
    });
  };

  const togglePropertyType = (type: PropertyType) => {
    setFilters(prevFilters => {
      const propertyType = prevFilters.propertyType?.includes(type)
        ? prevFilters.propertyType.filter(t => t !== type)
        : [...(prevFilters.propertyType || []), type];
      
      return { ...prevFilters, propertyType };
    });
  };

  const selectCity = (city: 'Libreville' | 'Akanda' | 'Owendo') => {
    setFilters(prev => ({
      ...prev,
      city: prev.city === city ? undefined : city,
      // Reset neighborhoods when changing city
      neighborhoods: [],
    }));
  };

  const getNeighborhoodsByCity = () => {
    if (!filters.city) return [...LIBREVILLE_NEIGHBORHOODS, ...AKANDA_NEIGHBORHOODS, ...OWENDO_NEIGHBORHOODS];
    switch (filters.city) {
      case 'Libreville':
        return LIBREVILLE_NEIGHBORHOODS;
      case 'Akanda':
        return AKANDA_NEIGHBORHOODS;
      case 'Owendo':
        return OWENDO_NEIGHBORHOODS;
    }
  };

  const selectPriceRange = (index: number) => {
    setSelectedPriceRange(selectedPriceRange === index ? null : index);
    
    if (selectedPriceRange === index) {
      setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    } else {
      const range = PRICE_RANGES[index];
      setFilters(prev => ({ 
        ...prev, 
        minPrice: range.min, 
        maxPrice: range.max
      }));
    }
  };

  const applyFilters = () => {
    let results = [...MOCK_PROPERTIES];
    
    // Filter by city
    if (filters.city) {
      results = results.filter(property => property.city === filters.city);
    }
    
    // Filter by neighborhood
    if (filters.neighborhoods.length > 0) {
      results = results.filter(property => 
        filters.neighborhoods.includes(property.neighborhood)
      );
    }
    
    // Filter by property type
    if (filters.propertyType && filters.propertyType.length > 0) {
      results = results.filter(property => 
        filters.propertyType?.includes(property.type)
      );
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
      results = results.filter(property => property.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      results = results.filter(property => property.price <= filters.maxPrice!);
    }
    
    // Apply sorting
    if (sortBy === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date_desc') {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredProperties(results);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      neighborhoods: [],
      propertyType: [],
      city: undefined,
    });
    setSelectedPriceRange(null);
    setFilteredProperties(MOCK_PROPERTIES);
  };

  const changeSortBy = (sort: 'price_asc' | 'price_desc' | 'date_desc') => {
    setSortBy(sort);
    
    let sorted = [...filteredProperties];
    if (sort === 'price_asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === 'date_desc') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredProperties(sorted);
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recherche</Text>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={toggleFilters}
          />
        </View>

        {showFilters ? (
          <ScrollView style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Ville</Text>
            <View style={styles.cityGrid}>
              {CITIES.map((city) => (
                <TouchableOpacity
                  key={city.value}
                  style={[
                    styles.filterChip,
                    filters.city === city.value && styles.filterChipActive,
                  ]}
                  onPress={() => selectCity(city.value as 'Libreville' | 'Akanda' | 'Owendo')}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      filters.city === city.value && styles.filterChipTextActive,
                    ]}
                  >
                    {city.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterTitle}>Quartiers</Text>
            <View style={styles.neighborhoodGrid}>
              {getNeighborhoodsByCity().map((neighborhood) => (
                <TouchableOpacity
                  key={neighborhood}
                  style={[
                    styles.filterChip,
                    filters.neighborhoods.includes(neighborhood) && styles.filterChipActive,
                  ]}
                  onPress={() => toggleNeighborhood(neighborhood)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      filters.neighborhoods.includes(neighborhood) && styles.filterChipTextActive,
                    ]}
                  >
                    {neighborhood}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterTitle}>Type de bien</Text>
            <View style={styles.propertyTypeGrid}>
              {PROPERTY_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.filterChip,
                    filters.propertyType?.includes(type.value) && styles.filterChipActive,
                  ]}
                  onPress={() => togglePropertyType(type.value)}
                >
                  <Text 
                    style={[
                      styles.filterChipText,
                      filters.propertyType?.includes(type.value) && styles.filterChipTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterTitle}>Fourchette de prix</Text>
            <View style={styles.priceRangesContainer}>
              {PRICE_RANGES.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.priceRangeButton,
                    selectedPriceRange === index && styles.priceRangeButtonActive,
                  ]}
                  onPress={() => selectPriceRange(index)}
                >
                  <Text
                    style={[
                      styles.priceRangeText,
                      selectedPriceRange === index && styles.priceRangeTextActive,
                    ]}
                  >
                    {range.label}
                  </Text>
                  {selectedPriceRange === index && (
                    <Check size={16} color={Colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterActions}>
              <Button 
                title="Réinitialiser" 
                variant="outline" 
                onPress={resetFilters} 
                style={{ flex: 1, marginRight: SPACING.sm }}
              />
              <Button 
                title="Appliquer" 
                variant="primary" 
                onPress={applyFilters} 
                style={{ flex: 1 }}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredProperties.length} bien{filteredProperties.length !== 1 ? 's' : ''} trouvé{filteredProperties.length !== 1 ? 's' : ''}
              </Text>
              <View style={styles.sortingContainer}>
                <TouchableOpacity 
                  style={styles.sortButton} 
                  onPress={() => changeSortBy('price_asc')}
                >
                  <Text style={[styles.sortText, sortBy === 'price_asc' && styles.activeSortText]}>
                    Prix {sortBy === 'price_asc' && <ArrowUp size={14} color={Colors.primary[500]} />}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sortButton} 
                  onPress={() => changeSortBy('price_desc')}
                >
                  <Text style={[styles.sortText, sortBy === 'price_desc' && styles.activeSortText]}>
                    Prix {sortBy === 'price_desc' && <ArrowDown size={14} color={Colors.primary[500]} />}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sortButton} 
                  onPress={() => changeSortBy('date_desc')}
                >
                  <Text style={[styles.sortText, sortBy === 'date_desc' && styles.activeSortText]}>
                    Récent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={filteredProperties}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PropertyCard property={item} horizontal />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.propertiesList}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: SPACING.sm,
  },
  filtersContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  filterTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.md,
  },
  neighborhoodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  propertyTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  filterChip: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    margin: SPACING.xs,
  },
  filterChipActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  filterChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  priceRangesContainer: {
    marginTop: SPACING.sm,
  },
  priceRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  priceRangeButtonActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  priceRangeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  priceRangeTextActive: {
    color: Colors.white,
  },
  filterActions: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  resultsCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  sortingContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    marginLeft: SPACING.md,
  },
  sortText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[500],
  },
  activeSortText: {
    color: Colors.primary[500],
  },
  propertiesList: {
    padding: SPACING.md,
  },
});