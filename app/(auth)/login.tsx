import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { GlobalStyles, SPACING } from '@/constants/Theme';

export default function LoginScreen() {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: SPACING.md,
  },
});