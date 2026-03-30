import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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
  impact?: string;
  sourceUrl?: string;
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

const typeLabels: Record<string, string> = {
  price_increase: 'Price Increase',
  price_decrease: 'Price Decrease',
  feature_removal: 'Feature Removed',
  feature_addition: 'Feature Added',
  policy_change: 'Policy Change',
  free_tier_change: 'Free Tier Change',
  acquisition: 'Acquisition',
  new_feature: 'New Feature',
};

const severityColors: Record<string, string> = {
  low: Colors.success,
  medium: Colors.warning,
  high: Colors.danger,
};

function stripHtml(text: string): string {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#038;/g, '&').replace(/\s+/g, ' ').trim();
}

export function ChangeAlert({ serviceName, title, description, date, severity, type, oldValue, newValue, impact, sourceUrl }: Props) {
  const [expanded, setExpanded] = useState(false);
  const color = severityColors[severity] || Colors.warning;
  const icon = typeIcons[type] || 'info';
  const label = typeLabels[type] || type;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const cleanDesc = stripHtml(description);
  const cleanTitle = stripHtml(title);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded(!expanded)}
      style={[styles.card, { borderLeftColor: color }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
          <Feather name={icon as any} size={16} color={color} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.service}>{serviceName}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textMuted} />
      </View>
      <Text style={styles.title}>{cleanTitle}</Text>

      {!expanded && (
        <Text style={styles.description} numberOfLines={2}>{cleanDesc}</Text>
      )}

      {expanded && (
        <View>
          <View style={styles.typeBadge}>
            <Text style={[styles.typeBadgeText, { color }]}>{label}</Text>
            <View style={[styles.severityDot, { backgroundColor: color }]} />
            <Text style={[styles.severityText, { color }]}>{severity}</Text>
          </View>

          <Text style={styles.description}>{cleanDesc}</Text>

          {impact && (
            <View style={styles.impactRow}>
              <Feather name="alert-circle" size={14} color={Colors.warning} />
              <Text style={styles.impactText}>{impact}</Text>
            </View>
          )}

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

          {sourceUrl && (
            <TouchableOpacity style={styles.sourceLink} onPress={() => Linking.openURL(sourceUrl)}>
              <Feather name="external-link" size={12} color={Colors.primary} />
              <Text style={styles.sourceLinkText}>Read source</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.tapHint}>Tap to collapse</Text>
        </View>
      )}
    </TouchableOpacity>
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
    marginLeft: Spacing.xs,
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
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  typeBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  severityText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    backgroundColor: Colors.warning + '11',
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  impactText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    flex: 1,
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
  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 4,
  },
  sourceLinkText: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  tapHint: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
