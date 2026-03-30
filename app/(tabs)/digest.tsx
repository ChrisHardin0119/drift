import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ChangeAlert } from '../../components/ChangeAlert';

export default function Digest() {
  const { services, getRecentChanges, liveChanges } = useApp();
  const recentChanges = getRecentChanges();

  // Combine local service changes with live feed changes from API
  const serviceChanges = services.flatMap(s =>
    s.changes.map(c => ({ serviceName: s.name, change: c }))
  );

  const liveAsChanges = (liveChanges || []).map((c: any) => ({
    serviceName: c.service_name || 'Unknown',
    change: {
      title: c.title || '',
      description: c.description || '',
      date: c.effective_date || c.created_at || new Date().toISOString(),
      severity: c.change_type === 'price_increase' ? 'high' : c.change_type === 'new_tier' ? 'medium' : 'low',
      type: c.change_type || 'update',
      oldValue: c.old_value,
      newValue: c.new_value,
    }
  }));

  // Deduplicate by title
  const seen = new Set<string>();
  const allChanges = [...serviceChanges, ...liveAsChanges]
    .filter(item => {
      if (seen.has(item.change.title)) return false;
      seen.add(item.change.title);
      return true;
    })
    .sort((a, b) => new Date(b.change.date).getTime() - new Date(a.change.date).getTime());

  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const thisMonth = new Date();
  thisMonth.setDate(thisMonth.getDate() - 30);

  const weekChanges = allChanges.filter(c => new Date(c.change.date) >= thisWeek);
  const monthChanges = allChanges.filter(c => new Date(c.change.date) >= thisMonth && new Date(c.change.date) < thisWeek);
  const olderChanges = allChanges.filter(c => new Date(c.change.date) < thisMonth);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Digest</Text>
        <View style={styles.dateBadge}>
          <Feather name="calendar" size={14} color={Colors.textSecondary} />
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Weekly Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{weekChanges.length}</Text>
              <Text style={styles.summaryLabel}>This week</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{recentChanges.length}</Text>
              <Text style={styles.summaryLabel}>This month</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{allChanges.length}</Text>
              <Text style={styles.summaryLabel}>All time</Text>
            </View>
          </View>
        </View>

        {allChanges.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="check-circle" size={64} color={Colors.success} />
            <Text style={styles.emptyTitle}>Your digital life is stable</Text>
            <Text style={styles.emptyDesc}>
              No changes detected across any of your {services.length} tracked service{services.length !== 1 ? 's' : ''}.
              We'll notify you the moment something shifts.
            </Text>
            {services.length === 0 && (
              <Text style={styles.emptyHint}>Add some services to start monitoring.</Text>
            )}
          </View>
        ) : (
          <>
            {weekChanges.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>This Week</Text>
                {weekChanges.map((item, i) => (
                  <ChangeAlert
                    key={`week-${i}`}
                    serviceName={item.serviceName}
                    title={item.change.title}
                    description={item.change.description}
                    date={item.change.date}
                    severity={item.change.severity}
                    type={item.change.type}
                    oldValue={item.change.oldValue}
                    newValue={item.change.newValue}
                  />
                ))}
              </>
            )}

            {monthChanges.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Earlier This Month</Text>
                {monthChanges.map((item, i) => (
                  <ChangeAlert
                    key={`month-${i}`}
                    serviceName={item.serviceName}
                    title={item.change.title}
                    description={item.change.description}
                    date={item.change.date}
                    severity={item.change.severity}
                    type={item.change.type}
                    oldValue={item.change.oldValue}
                    newValue={item.change.newValue}
                  />
                ))}
              </>
            )}

            {olderChanges.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Older</Text>
                {olderChanges.slice(0, 10).map((item, i) => (
                  <ChangeAlert
                    key={`old-${i}`}
                    serviceName={item.serviceName}
                    title={item.change.title}
                    description={item.change.description}
                    date={item.change.date}
                    severity={item.change.severity}
                    type={item.change.type}
                    oldValue={item.change.oldValue}
                    newValue={item.change.newValue}
                  />
                ))}
              </>
            )}
          </>
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  dateBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, backgroundColor: Colors.surface, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  dateText: { color: Colors.textSecondary, fontSize: FontSize.xs },
  content: { paddingHorizontal: Spacing.lg },
  summaryCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.surfaceBorder },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNumber: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  summaryDivider: { width: 1, height: 32, backgroundColor: Colors.surfaceBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxl },
  emptyTitle: { color: Colors.text, fontSize: FontSize.xl, fontWeight: '700', marginTop: Spacing.lg },
  emptyDesc: { color: Colors.textSecondary, fontSize: FontSize.md, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22, paddingHorizontal: Spacing.lg },
  emptyHint: { color: Colors.textMuted, fontSize: FontSize.sm, marginTop: Spacing.md },
});

