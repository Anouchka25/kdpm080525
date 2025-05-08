import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Search, PlusCircle, UserCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? 80 : 60 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.primary[500],
            tabBarInactiveTintColor: Colors.neutral[400],
            tabBarLabelStyle: {
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarStyle: {
              height: Platform.OS === 'ios' ? 80 : 60,
              paddingTop: 5,
              paddingBottom: Platform.OS === 'ios' ? 25 : 5,
              backgroundColor: Colors.white,
              borderTopColor: Colors.neutral[200],
              elevation: 8,
              shadowColor: Colors.black,
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: -3 },
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Accueil',
              tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Recherche',
              tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="add-property"
            options={{
              title: 'Publier',
              tabBarIcon: ({ color, size }) => (
                <PlusCircle color={color} size={size + 4} strokeWidth={1.5} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <UserCircle color={color} size={size + 4} strokeWidth={1.5} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}