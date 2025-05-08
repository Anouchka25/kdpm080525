// Mise à jour du code pour gérer la sélection et la capture de photos
import * as ImagePicker from 'expo-image-picker';

// Dans la fonction handleAddImage
const handleAddImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à vos photos.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.8,
  });

  if (!result.canceled) {
    setImages(prev => [...prev, result.assets[0].uri]);
  }
};

// Dans la fonction handleVerificationPhoto
const handleVerificationPhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour utiliser la caméra.');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

  if (!result.canceled) {
    setVerificationPhoto(result.assets[0].uri);
  }
};