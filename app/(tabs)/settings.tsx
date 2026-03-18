import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, BETA_CODE } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { isBetaUser, activateBeta, services, getTotalMonthlySpend } = useApp();
  const [betaInput, setBetaInput] = useState('');
  const [betaError, setBetaError] = useState('');
  const [betaSuccess, setBetaSuccess] = useState(false);

  const handleBetaActivate = () => {
    if (activateBeta(betaInput)) {
      setBetaSuccess(true);
      setBetaError('');
      if (Platform.OS === 'web') {
        // Web doesn't have Alert
      }
    } else {
      setBetaError('Invalid beta code. Please try again.');
      setBetaSuccess(false);
    }
  };

  const monthlySpend = getTotalMonthlySpend();
  const yearlySpend = monthlySpend * 12;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Beta Access */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Feather name="zap" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Beta Access</Text>
          </View>
          {isBetaUser ? (
            <View style={styles.betaActive}>
              <Feather name="check-circle" size={24} color={Colors.success} />
              <Text style={styles.betaActiveText}>Beta access activated</Text>
              <Text style={styles.betaActiveDesc}>All Pro features unlocked. Thank you for testing!</Text>
            </View>
          ) : (
            <>
              <Text style={styles.betaDesc}>Enter your beta code to unlock all Pro features for free during the testing period.</Text>
              <View style={styles.betaInputRow}>
                <TextInput
                  style={styles.betaInput}
                  placeholder="Enter beta code"
                  placeholderTextColor={Colors.textMuted}
                  value={betaInput}
                  onChangeText={(t) => { setBetaInput(t); setBetaError(''); setBetaSuccess(false); }}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={[styles.betaButton, !betaInput.trim() && { opacity: 0.5 }]}
                  onPress={handleBetaActivate}
                  disabled={!betaInput.trim()}
                >
                  <Text style={styles.betaButtonText}>Activate</Text>
                </TouchableOpacity>
              </View>
              {betaError ? <Text style={styles.betaError}>{betaError}</Text> : null}
              {betaSuccess ? <Text style={styles.betaSuccessText}>Beta activated! Enjoy all Pro features.</Text> : null}
            </>
          )}
        </View>

        {/* Account Summary */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Feather name="bar-chart-2" size={20} color={Colors.accent} />
            <Text style={styles.sectionTitle}>Your Summary</Text>
          </View>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{services.length}</Text>
              <Text style={styles.summaryLabel}>Services tracked</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${monthlySpend.toFixed(0)}</Text>
              <Text style={styles.summaryLabel}>Monthly spend</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${yearlySpend.toFixed(0)}</Text>
              <Text style={styles.summaryLabel}>Yearly spend</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {services.reduce((sum, s) => sum + s.changes.length, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Changes caught</Text>
            </View>
          </View>
        </View>

        {/* Plan Info */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Feather name="star" size={20} color={Colors.warning} />
            <Text style={styles.sectionTitle}>Your Plan</Text>
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{isBetaUser ? 'Beta Tester (Pro)' : 'Free'}</Text>
            <Text style={styles.planDesc}>
              {isBetaUser
                ? 'Unlimited services, full change history, all features unlocked.'
                : 'Track up to 5 services. Upgrade to Pro for unlimited tracking and advanced features.'}
            </Text>
            {!isBetaUser && (
              <View style={styles.planFeatures}>
                <Text style={styles.planFeatureTitle}>Pro features include:</Text>
                <View style={styles.featureItem}>
                  <Feather name="check" size={14} color={Colors.success} />
                  <Text style={styles.featureText}>Unlimited service tracking</Text>
                </View>
                <View style={styles.featureItem}>
                  <Feather name="check" size={14} color={Colors.success} />
                  <Text style={styles.featureText}>Full change history</Text>
                </View>
                <View style={styles.featureItem}>
                  <Feather name="check" size={14} color={Colors.success} />
                  <Text style={styles.featureText}>Weekly digest notifications</Text>
                </View>
                <View style={styles.featureItem}>
                  <Feather name="check" size={14} color={Colors.success} />
                  <Text style={styles.featureText}>Alternative recommendations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Feather name="check" size={14} color={Colors.success} />
                  <Text style={styles.featureText}>Export reports</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* About */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Feather name="info" size={20} color={Colors.textSecondary} />
            <Text style={styles.sectionTitle}>About Drift</Text>
          </View>
          <Text style={styles.aboutText}>
            Drift watches your digital subscriptions for changes you'd otherwise miss — price creeps, feature removals, privacy policy shifts, and more.
          </Text>
          <Text style={styles.version}>Version 1.0.0 (Beta)</Text>
          <Text style={styles.credit}>Built by Chris Hardin</Text>
        </View>

        <View style={{ height: Spacing.xxl * 2 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  content: { paddingHorizontal: Spacing.lg },
  sectionCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  betaDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginBottom: Spacing.md, lineHeight: 20 },
  betaInputRow: { flexDirection: 'row', gap: Spacing.sm },
  betaInput: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.surfaceBorder, letterSpacing: 2 },
  betaButton: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, borderRadius: BorderRadius.md, justifyContent: 'center' },
  betaButtonText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.sm },
  betaError: { color: Colors.danger, fontSize: FontSize.sm, marginTop: Spacing.sm },
  betaSuccessText: { color: Colors.success, fontSize: FontSize.sm, marginTop: Spacing.sm },
  betaActive: { alignItems: 'center', paddingVertical: Spacing.md },
  betaActiveText: { color: Colors.success, fontSize: FontSize.md, fontWeight: '700', marginTop: Spacing.sm },
  betaActiveDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: Spacing.xs },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  summaryItem: { width: '47%', backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.sm, padding: Spacing.md, alignItems: 'center' },
  summaryValue: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  planInfo: {},
  planName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.primary },
  planDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs, lineHeight: 20 },
  planFeatures: { marginTop: Spacing.md },
  planFeatureTitle: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  featureText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  aboutText: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20 },
  version: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.md },
  credit: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.xs },
});
