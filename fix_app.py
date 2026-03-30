import os

# === FIX 1: Rewrite tab layout completely ===
tab_content = """import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.surfaceBorder,
          borderTopWidth: 1,
          paddingTop: 5,
        },
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
  );
}
"""
with open(r'C:\Users\Chris\drift\app\(tabs)\_layout.tsx', 'w', encoding='utf-8') as f:
    f.write(tab_content)
print('Tab layout rewritten (no safeAreaInsets override, no hardcoded height)')

# === FIX 2: Ensure all screens have edges top ===
tabs_dir = r'C:\Users\Chris\drift\app\(tabs)'
for fname in ['index.tsx', 'digest.tsx', 'history.tsx', 'services.tsx', 'settings.tsx']:
    fpath = os.path.join(tabs_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()
    if "edges={['top']}" not in c and "<SafeAreaView style={styles.container}>" in c:
        c = c.replace('<SafeAreaView style={styles.container}>', "<SafeAreaView style={styles.container} edges={['top']}>")
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f'  {fname}: added edges top')
    elif "edges={['top']}" in c:
        print(f'  {fname}: already has edges top')
    else:
        print(f'  {fname}: no SafeAreaView found')

print('\nAll app fixes done!')
