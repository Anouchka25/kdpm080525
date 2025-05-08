import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { MOCK_PROPERTIES } from '@/data/properties';
import { 
  ArrowLeft, 
  Flag, 
  MapPin, 
  MessageSquare, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  PhoneCall
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { GlobalStyles, SPACING, BORDER_RADIUS } from '@/constants/Theme';
import Button from '@/components/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={[GlobalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={GlobalStyles.heading2}>Logement introuvable</Text>
          <Button 
            title="Retour à l'accueil" 
            onPress={() => router.push('/')}
            style={{ marginTop: SPACING.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${property.ownerPhone}`);
  };

  const handleSMS = () => {
    Linking.openURL(`sms:${property.ownerPhone}?body=Bonjour, je suis intéressé(e) par votre annonce "${property.title}" sur Ndjimba.`);
  };

  const handleWhatsApp = () => {
    if (!property.ownerWhatsapp) return;
    
    // Remove any non-numeric characters from the phone number
    const whatsappNumber = property.ownerWhatsapp.replace(/\D/g, '');
    const message = `Bonjour, je suis intéressé(e) par votre annonce "${property.title}" sur Ndjimba.`;
    
    Linking.openURL(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleShare = async () => {
    // In a real app, this would use the Share API
    Alert.alert('Partager', 'Fonctionnalité de partage à implémenter');
  };

  const handleReport = () => {
    Alert.alert(
      'Signaler l\'annonce',
      'Pour quelle raison souhaitez-vous signaler cette annonce ?',
      [
        { text: 'Annonce frauduleuse', onPress: () => confirmReport('Annonce frauduleuse') },
        { text: 'Informations incorrectes', onPress: () => confirmReport('Informations incorrectes') },
        { text: 'Photos ne correspondent pas', onPress: () => confirmReport('Photos ne correspondent pas') },
        { text: 'Autre', onPress: () => confirmReport('Autre raison') },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const confirmReport = (reason: string) => {
    Alert.alert(
      'Confirmation',
      `Merci pour votre signalement. Nous allons examiner cette annonce pour la raison suivante : "${reason}".`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: property.images[currentImageIndex] }}
              style={styles.image}
              resizeMode="cover"
            />
            
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.imageControlsContainer}>
              <TouchableOpacity 
                style={[styles.imageControl, { opacity: currentImageIndex > 0 ? 1 : 0.5 }]} 
                onPress={handlePreviousImage}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft size={24} color={Colors.white} />
              </TouchableOpacity>
              
              <Text style={styles.imageCounter}>
                {currentImageIndex + 1}/{property.images.length}
              </Text>
              
              <TouchableOpacity 
                style={[styles.imageControl, { opacity: currentImageIndex < property.images.length - 1 ? 1 : 0.5 }]} 
                onPress={handleNextImage}
                disabled={currentImageIndex === property.images.length - 1}
              >
                <ChevronRight size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Share2 size={20} color={Colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
              <Flag size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.price}>
              {property.price.toLocaleString()} FCFA<Text style={styles.priceDescription}> / mois</Text>
            </Text>
            
            <Text style={styles.title}>{property.title}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.neutral[500]} />
              <Text style={styles.location}>
                {property.neighborhood}, {property.city}
              </Text>
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>{property.surface} m²</Text>
                <Text style={styles.detailLabel}>Surface</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>{property.rooms}</Text>
                <Text style={styles.detailLabel}>
                  {property.rooms > 1 ? 'Chambres' : 'Chambre'}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>{property.bathrooms}</Text>
                <Text style={styles.detailLabel}>
                  {property.bathrooms > 1 ? 'SdB' : 'SdB'}
                </Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{property.description}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contacter le propriétaire</Text>
              <Text style={styles.ownerName}>{property.ownerName}</Text>
              
              <View style={styles.contactButtonsContainer}>
                <Button
                  title="Appeler"
                  variant="primary"
                  icon={<PhoneCall size={18} color={Colors.white} />}
                  onPress={handleCall}
                  style={styles.contactButton}
                />
                
                <Button
                  title="SMS"
                  variant="secondary"
                  icon={<MessageSquare size={18} color={Colors.neutral[800]} />}
                  onPress={handleSMS}
                  style={styles.contactButton}
                />
                
                {property.ownerWhatsapp && (
                  <Button
                    title="WhatsApp"
                    variant="outline"
                    icon={(
                      <Image 
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png' }} 
                        style={{ width: 18, height: 18 }} 
                      />
                    )}
                    onPress={handleWhatsApp}
                    style={styles.contactButton}
                    textStyle={{ color: Colors.primary[500] }}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md + 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageControlsContainer: {
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.sm,
  },
  imageCounter: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.white,
    backgroundColor: Colors.overlay,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.pill,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary[500],
  },
  priceDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.neutral[500],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.neutral[800],
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral[50],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: SPACING.sm,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    lineHeight: 22,
  },
  ownerName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: SPACING.md,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  contactButton: {
    flex: 1,
    marginRight: SPACING.sm,
    minWidth: 100,
  },
});