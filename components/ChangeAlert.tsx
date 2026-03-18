import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  serviceName: string;
  title: string;
  description: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
  type: string;
  oldValue?: string;
  newValue?: string;
}

const typeIcons: Record<string, string> = {
  price_increase: 'trending-up',
  price_decrease: 'trending-down',
  feature_removal: 'minus-circle',
  feature_addition: 'plus-circle',
  policy_change: 'alert-triangle',
  free_tier_change: 'lock',
  acquisition: 'briefcase',
  new_feature: 'star',
};

const severityColors: Record<string, string> = {
  low: Colors.success,
  medium: Colors.warning,
  high: Colors.danger,
};

export function ChangeAlert({ serviceName, title, description, date, severity, type, oldValue, newValue }: Props) {
  const color = severityColors[severity];
  const icon = typeIcons[type] || 'info';
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
          <Feather name={icon as any} size={16} color={color} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.service}>{serviceName}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={[styles.severityDot, { backgroundColor: color }]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {oldValue && newValue && (
        <View style={styles.comparison}>
          <View style={styles.comparisonItem}>
            <Text style={styles.compLabel}>Before</Text>
            <Text style={[styles.compValue, { color: Colors.textSecondary }]}>{oldValue}</Text>
          </View>
          <Feather name="arrow-right" size={14} color={Colors.textMuted} style={{ marginHorizontal: Spacing.sm }} />
          <View style={styles.comparisonItem}>
            <Text style={styles.compLabel}>After</Text>
            <Text style={[styles.compValue, { color }]}>{newValue}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  service: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  comparison: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
  },
  comparisonItem: {
    flex: 1,
  },
  compLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginBottom: 2,
  },
  compValue: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});
