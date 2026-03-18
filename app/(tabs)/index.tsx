import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { SpendWidget } from '../../components/SpendWidget';
import { ChangeAlert } from '../../components/ChangeAlert';

export default function Dashboard() {
  const { services, getTotalMonthlySpend, getRecentChanges, isBetaUser } = useApp();
  const router = useRouter();
  const monthlySpend = getTotalMonthlySpend();
  const recentChanges = getRecentChanges();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>drift</Text>
            <Text style={styles.tagline}>Your digital life, watched.</Text>
          </View>
          {isBetaUser && (
            <View style={styles.betaBadge}>
              <Text style={styles.betaText}>BETA</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <SpendWidget
            monthlySpend={monthlySpend}
            serviceCount={services.length}
            recentChangeCount={recentChanges.length}
          />
        </View>

        {services.length === 0 && (
          <TouchableOpacity style={styles.emptyState} onPress={() => router.push('/(tabs)/services')}>
            <Feather name="plus-circle" size={48} color={Colors.primary} />
            <Text style={styles.emptyTitle}>Start tracking your subscriptions</Text>
            <Text style={styles.emptyDesc}>Add the services you pay for and Drift will watch for changes.</Text>
            <View style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Add your first service</Text>
            </View>
          </TouchableOpacity>
        )}

        {services.length > 0 && (
          <>
            <View style={styles.quickStats}>
              <View style={styles.statCard}>
                <Feather name="trending-up" size={20} color={Colors.danger} />
                <Text style={styles.statNumber}>{recentChanges.filter(c => c.change.type === 'price_increase').length}</Text>
                <Text style={styles.statLabel}>Price hikes</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="alert-triangle" size={20} color={Colors.warning} />
                <Text style={styles.statNumber}>{recentChanges.filter(c => c.change.type === 'policy_change').length}</Text>
                <Text style={styles.statLabel}>Policy changes</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="shield" size={20} color={Colors.success} />
                <Text style={styles.statNumber}>{services.length - recentChanges.length}</Text>
                <Text style={styles.statLabel}>Stable</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Changes</Text>
                {recentChanges.length > 0 && (
                  <TouchableOpacity onPress={() => router.push('/(tabs)/digest')}>
                    <Text style={styles.seeAll}>See all</Text>
                  </TouchableOpacity>
                )}
              </View>
              {recentChanges.length === 0 ? (
                <View style={styles.noChanges}>
                  <Feather name="check-circle" size={32} color={Colors.success} />
                  <Text style={styles.noChangesText}>No changes detected this month</Text>
                  <Text style={styles.noChangesDesc}>Your digital life is stable. We'll alert you when something changes.</Text>
                </View>
              ) : (
                recentChanges.slice(0, 3).map((item, i) => (
                  <ChangeAlert
                    key={i}
                    serviceName={item.serviceName}
                    title={item.change.title}
                    description={item.change.description}
                    date={item.change.date}
                    severity={item.change.severity}
                    type={item.change.type}
                    oldValue={item.change.oldValue}
                    newValue={item.change.newValue}
                  />
                ))
              )}
            </View>
          </>
        )}

        <TouchableOpacity style={styles.missedBanner} onPress={() => router.push('/(tabs)/history')}>
          <View style={styles.missedLeft}>
            <Feather name="eye-off" size={24} color={Colors.warning} />
            <View style={{ marginLeft: Spacing.md }}>
              <Text style={styles.missedTitle}>What You Already Missed</Text>
              <Text style={styles.missedDesc}>See 12 months of changes you probably didn't notice</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  logo: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  betaBadge: {
    backgroundColor: Colors.primary + '22',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '44',
  },
  betaText: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  seeAll: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  statNumber: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '800',
    marginTop: Spacing.xs,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  emptyDesc: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.lg,
  },
  emptyButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  noChanges: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  noChangesText: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  noChangesDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  missedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.warning + '11',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.warning + '33',
    marginTop: Spacing.sm,
  },
  missedLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  missedTitle: {
    color: Colors.warning,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  missedDesc: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
});
