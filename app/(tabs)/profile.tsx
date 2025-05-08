// Mise à jour de la validation du numéro de téléphone
const validatePhoneNumber = (number: string) => {
  // Supprime tous les caractères non numériques
  const cleanNumber = number.replace(/\D/g, '');
  
  // Vérifie si le numéro commence par un préfixe valide
  const validPrefixes = ['74', '65', '66', '77'];
  const prefix = cleanNumber.substring(0, 2);
  
  return {
    isValid: cleanNumber.length === 8 && validPrefixes.includes(prefix),
    formattedNumber: cleanNumber,
  };
};

const handleLogin = () => {
  const { isValid, formattedNumber } = validatePhoneNumber(phoneNumber);
  
  if (!isValid) {
    Alert.alert(
      'Numéro invalide',
      'Veuillez entrer un numéro de téléphone valide commençant par 74, 65, 66 ou 77'
    );
    return;
  }

  setIsLoading(true);
  
  // Use useEffect for cleanup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setActiveSection('profile');
    }, 1500);

    // Cleanup function
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array since this effect should only run once
};