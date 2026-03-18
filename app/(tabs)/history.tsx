import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { historicalChanges, getTotalYearlyImpact } from '../../data/historical';
import { ChangeAlert } from '../../components/ChangeAlert';

const typeFilters = [
  { id: 'all', label: 'All', icon: 'list' },
  { id: 'price_increase', label: 'Price Hikes', icon: 'trending-up' },
  { id: 'policy_change', label: 'Policy', icon: 'alert-triangle' },
  { id: 'feature_removal', label: 'Removals', icon: 'minus-circle' },
];

export default function History() {
  const [filter, setFilter] = useState('all');
  const totalImpact = getTotalYearlyImpact();

  const filtered = filter === 'all'
    ? historicalChanges
    : historicalChanges.filter(c => c.type === filter);

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What You Missed</Text>
        <Text style={styles.subtitle}>12 months of changes you probably didn't notice</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Impact Banner */}
        <View style={styles.impactBanner}>
          <View style={styles.impactIcon}>
            <Feather name="alert-octagon" size={28} color={Colors.danger} />
          </View>
          <View style={styles.impactContent}>
            <Text style={styles.impactAmount}>${totalImpact}+</Text>
            <Text style={styles.impactLabel}>estimated yearly cost increase across tracked services</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{historicalChanges.filter(c => c.type === 'price_increase').length}</Text>
            <Text style={styles.statLabel}>Price hikes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{historicalChanges.filter(c => c.type === 'policy_change').length}</Text>
            <Text style={styles.statLabel}>Policy changes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{historicalChanges.filter(c => c.severity === 'high').length}</Text>
            <Text style={styles.statLabel}>High severity</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={{ paddingHorizontal: Spacing.lg }}>
          {typeFilters.map(f => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterChip, filter === f.id && styles.filterActive]}
              onPress={() => setFilter(f.id)}
            >
              <Feather name={f.icon as any} size={14} color={filter === f.id ? Colors.primary : Colors.textMuted} />
              <Text style={[styles.filterText, filter === f.id && styles.filterTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Changes */}
        <View style={styles.changesList}>
          <Text style={styles.resultsText}>{sorted.length} change{sorted.length !== 1 ? 's' : ''} found</Text>
          {sorted.map(change => (
            <ChangeAlert
              key={change.id}
              serviceName={change.service}
              title={change.title}
              description={change.description}
              date={change.date}
              severity={change.severity}
              type={change.type}
              oldValue={change.oldValue}
              newValue={change.newValue}
            />
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaBanner}>
          <Feather name="shield" size={24} color={Colors.primary} />
          <Text style={styles.ctaTitle}>Don't miss the next one</Text>
          <Text style={styles.ctaDesc}>Start tracking your subscriptions and Drift will catch every change before it hits your wallet.</Text>
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  impactBanner: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.lg, marginTop: Spacing.md, backgroundColor: Colors.danger + '15', borderRadius: BorderRadius.md, padding: Spacing.lg, borderWidth: 1, borderColor: Colors.danger + '33' },
  impactIcon: { marginRight: Spacing.md },
  impactContent: { flex: 1 },
  impactAmount: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.danger },
  impactLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginTop: Spacing.md, gap: Spacing.sm },
  statItem: { flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  statNumber: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  filterRow: { marginTop: Spacing.md, marginBottom: Spacing.md },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: Spacing.sm, gap: 4 },
  filterActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  filterText: { color: Colors.textMuted, fontSize: FontSize.sm },
  filterTextActive: { color: Colors.primary, fontWeight: '600' },
  changesList: { paddingHorizontal: Spacing.lg },
  resultsText: { color: Colors.textMuted, fontSize: FontSize.xs, marginBottom: Spacing.sm },
  ctaBanner: { alignItems: 'center', marginHorizontal: Spacing.lg, marginTop: Spacing.lg, backgroundColor: Colors.primary + '11', borderRadius: BorderRadius.md, padding: Spacing.lg, borderWidth: 1, borderColor: Colors.primary + '33' },
  ctaTitle: { color: Colors.primary, fontSize: FontSize.lg, fontWeight: '700', marginTop: Spacing.sm },
  ctaDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, textAlign: 'center', marginTop: Spacing.xs, lineHeight: 20 },
});
