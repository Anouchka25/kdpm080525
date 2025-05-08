import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform } from 'react-native';
import { Property } from '@/types/property';
import { router } from 'expo-router';
import { Check, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { GlobalStyles, SPACING, BORDER_RADIUS } from '@/constants/Theme';

type PropertyCardProps = {
  property: Property;
  horizontal?: boolean;
  width?: number;
};

export default function PropertyCard({ property, horizontal = false, width }: PropertyCardProps) {
  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  const isLand = property.type === 'land';

  return (
    <Pressable
      style={[
        styles.container,
        GlobalStyles.shadow,
        horizontal ? styles.horizontalContainer : null,
        width ? { width } : null,
      ]}
      onPress={handlePress}
    >
      <View style={horizontal ? styles.horizontalImageContainer : styles.imageContainer}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        {property.verified && (
          <View style={styles.verifiedBadge}>
            <Check size={14} color={Colors.white} strokeWidth={3} />
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.price}>
          {property.price.toLocaleString()} FCFA{isLand ? '' : '/mois'}
        </Text>
        <Text numberOfLines={1} style={styles.title}>
          {property.title}
        </Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.location}>
            {property.neighborhood}, {property.city}
          </Text>
        </View>
        {!isLand && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>{property.surface} m²</Text>
            <Text style={styles.detail}>•</Text>
            <Text style={styles.detail}>
              {property.rooms} {property.rooms > 1 ? 'chambres' : 'chambre'}
            </Text>
          </View>
        )}
        {isLand && (
          <View style={styles.landDetailsContainer}>
            <Text style={styles.landDetail}>Terrain • {property.surface} m²</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    width: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: 120,
  },
  imageContainer: {
    height: 180,
    width: '100%',
  },
  horizontalImageContainer: {
    width: 120,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: Colors.success[500],
    borderRadius: BORDER_RADIUS.pill,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: SPACING.md,
    flex: 1,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary[500],
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
    marginRight: 4,
  },
  landDetailsContainer: {
    marginTop: 2,
  },
  landDetail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.neutral[600],
  },
});