import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { TrackedService } from '../data/services';
import { getCategoryById } from '../data/categories';

interface Props {
  service: TrackedService;
  onPress: () => void;
}

export function ServiceCard({ service, onPress }: Props) {
  const category = getCategoryById(service.category);
  const hasRecentChanges = service.changes.length > 0 &&
    new Date(service.changes[service.changes.length - 1].date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const latestChange = service.changes[service.changes.length - 1];
  const monthlyPrice = service.billingCycle === 'yearly' ? service.price / 12 :
    service.billingCycle === 'weekly' ? service.price * 4.33 : service.price;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: service.color || category.color + '22' }]}>
        <Feather name={category.icon as any} size={20} color={service.color || category.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.category}>{category.name}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${monthlyPrice.toFixed(2)}<Text style={styles.cycle}>/mo</Text></Text>
        {hasRecentChanges && latestChange && (
          <View style={[styles.badge, {
            backgroundColor: latestChange.severity === 'high' ? Colors.danger + '22' :
              latestChange.severity === 'medium' ? Colors.warning + '22' : Colors.success + '22'
          }]}>
            <Text style={[styles.badgeText, {
              color: latestChange.severity === 'high' ? Colors.danger :
                latestChange.severity === 'medium' ? Colors.warning : Colors.success
            }]}>Changed</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  name: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  category: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  cycle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginTop: 4,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
