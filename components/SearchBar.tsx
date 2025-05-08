import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { BORDER_RADIUS, SPACING } from '@/constants/Theme';
import { router } from 'expo-router';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
  onFilterPress?: () => void;
};

export default function SearchBar({
  placeholder = 'Rechercher un logement...',
  value,
  onChangeText,
  onSearch,
  onFilterPress,
}: SearchBarProps) {
  const handleFiltersPress = () => {
    if (onFilterPress) {
      onFilterPress();
    } else {
      router.push('/search');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
      </View>
      <Pressable
        style={styles.filterButton}
        onPress={handleFiltersPress}
        android_ripple={{ color: Colors.primary[100], borderless: true }}
      >
        <Sliders size={24} color={Colors.primary[500]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
    height: '100%',
  },
  filterButton: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
});