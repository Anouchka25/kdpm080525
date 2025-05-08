import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Theme';
import PhoneInput from '@/components/PhoneInput';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLogin = async () => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone_number', phoneNumber)
        .single();

      if (!isMounted.current) return;

      if (existingUser) {
        const whatsappLink = Platform.select({
          web: `https://wa.me/33658898531?text=${encodeURIComponent(
            `Bonjour, je souhaite récupérer l'accès à mon compte Ndjimba (${phoneNumber}).`
          )}`,
          default: `whatsapp://send?phone=33658898531&text=${encodeURIComponent(
            `Bonjour, je souhaite récupérer l'accès à mon compte Ndjimba (${phoneNumber}).`
          )}`,
        });

        setError(
          'Ce numéro est déjà utilisé. Pour récupérer votre compte, veuillez nous contacter sur WhatsApp.'
        );
        
        const canOpen = await Linking.canOpenURL(whatsappLink);
        if (canOpen) {
          Linking.openURL(whatsappLink);
        }
      } else {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          phone: phoneNumber,
          password: newCode,
        });

        if (!isMounted.current) return;

        if (signUpError) throw signUpError;

        if (user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, phone_number: phoneNumber }]);

          if (profileError) throw profileError;
          
          setCode(newCode);
        }
      }
    } catch (err) {
      if (!isMounted.current) return;
      console.error('Error during login:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>
          Entrez votre numéro de téléphone pour continuer
        </Text>

        <PhoneInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        {code && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeTitle}>Votre code d'accès :</Text>
            <Text style={styles.codeText}>{code}</Text>
            <Text style={styles.codeInfo}>
              Conservez ce code précieusement, il vous servira à vous connecter à l'avenir.
            </Text>
          </View>
        )}

        <Button
          title={isLoading ? 'Chargement...' : 'Continuer'}
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.neutral[900],
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    marginBottom: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.md,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error[500],
    marginBottom: SPACING.md,
  },
  codeContainer: {
    backgroundColor: Colors.primary[50],
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.md,
  },
  codeTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary[700],
    marginBottom: SPACING.sm,
  },
  codeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.primary[500],
    textAlign: 'center',
    letterSpacing: 8,
    marginVertical: SPACING.md,
  },
  codeInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary[700],
    textAlign: 'center',
  },
});