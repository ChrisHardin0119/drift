import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  monthlySpend: number;
  serviceCount: number;
  recentChangeCount: number;
}

export function SpendWidget({ monthlySpend, serviceCount, recentChangeCount }: Props) {
  const yearlySpend = monthlySpend * 12;
  const statusColor = recentChangeCount === 0 ? Colors.success : recentChangeCount <= 2 ? Colors.warning : Colors.danger;
  const statusText = recentChangeCount === 0 ? 'All stable' :
    recentChangeCount === 1 ? '1 change detected' : `${recentChangeCount} changes detected`;

  return (
    <View style={styles.container}>
      <View style={styles.mainSpend}>
        <Text style={styles.label}>Monthly Subscriptions</Text>
        <Text style={styles.amount}>
          <Text style={styles.dollar}>$</Text>
          {monthlySpend.toFixed(2)}
        </Text>
        <Text style={styles.yearly}>${yearlySpend.toFixed(0)}/year across {serviceCount} service{serviceCount !== 1 ? 's' : ''}</Text>
      </View>

      <View style={styles.statusBar}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        <Feather name="chevron-right" size={14} color={Colors.textMuted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  mainSpend: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginBottom: Spacing.xs,
  },
  amount: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: '800',
    letterSpacing: -1,
  },
  dollar: {
    fontSize: FontSize.xl,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  yearly: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  statusText: {
    flex: 1,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
});
