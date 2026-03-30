import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['bottom']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.surfaceBorder,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 4,
          },
          safeAreaInsets: { bottom: 0 },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarLabelStyle: {
            fontSize: FontSize.xs,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }} />
        <Tabs.Screen name="services" options={{ title: 'Services', tabBarIcon: ({ color, size }) => <Feather name="layers" size={size} color={color} /> }} />
        <Tabs.Screen name="digest" options={{ title: 'Digest', tabBarIcon: ({ color, size }) => <Feather name="inbox" size={size} color={color} /> }} />
        <Tabs.Screen name="history" options={{ title: 'Missed', tabBarIcon: ({ color, size }) => <Feather name="clock" size={size} color={color} /> }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} /> }} />
      </Tabs>
    </SafeAreaView>
  );
}