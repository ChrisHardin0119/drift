import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { isBetaUser, activateBeta, services, getTotalMonthlySpend } = useApp();
  const [betaInput, setBetaInput] = useState('');
  const [betaError, setBetaError] = useState('');
  const [betaSuccess, setBetaSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'monthly' | 'yearly'>('free');

  const handleBetaActivate = () => {
    if (activateBeta(betaInput)) {
      setBetaSuccess(true);
      setBetaError('');
    } else {
      setBetaError('Invalid beta code. Please try again.');
      setBetaSuccess(false);
    }
  };

  const monthlySpend = getTotalMonthlySpend();
  const yearlySpend = monthlySpend * 12;
  const currentPlan = isBetaUser ? 'Beta Tester (Pro)' : 'Free';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* ==================== PRICING TIERS ==================== */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Feather name="star" size={20} color={Colors.warning} />
            <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          </View>

          {isBetaUser ? (
            <View style={styles.betaActive}>
              <Feather name="check-circle" size={24} color={Colors.success} />
              <Text style={styles.betaActiveText}>Beta Tester — All Pro features unlocked</Text>
              <Text style={styles.betaActiveDesc}>Thank you for testing Drift! You have full access to everything.</Text>
            </View>
          ) : (
            <View style={styles.plansContainer}>
              {/* Free Tier */}
              <TouchableOpacity
                style={[styles.planCard, selectedPlan === 'free' && styles.planCardSelected]}
                onPress={() => setSelectedPlan('free')}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>Free</Text>
                  <Text style={styles.planPrice}>$0</Text>
                </View>
                <View style={styles.planFeatures}>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Track up to 5 services</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Monthly spend dashboard</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>What You Missed history</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="x" size={14} color={Colors.textMuted} />
                    <Text style={[styles.planFeatureText, { color: Colors.textMuted }]}>Unlimited tracking</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="x" size={14} color={Colors.textMuted} />
                    <Text style={[styles.planFeatureText, { color: Colors.textMuted }]}>Weekly digest alerts</Text>
                  </View>
                </View>
                {selectedPlan === 'free' && <View style={styles.currentBadge}><Text style={styles.currentBadgeText}>Current Plan</Text></View>}
              </TouchableOpacity>

              {/* Monthly Pro */}
              <TouchableOpacity
                style={[styles.planCard, styles.planCardPro, selectedPlan === 'monthly' && styles.planCardSelected]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <View style={styles.popularTag}>
                  <Text style={styles.popularTagText}>MOST POPULAR</Text>
                </View>
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>Pro Monthly</Text>
                  <View>
                    <Text style={styles.planPrice}>$3<Text style={styles.planPriceSub}>/mo</Text></Text>
                  </View>
                </View>
                <View style={styles.planFeatures}>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Unlimited service tracking</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Full change history</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Weekly digest alerts</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Alternative recommendations</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Export reports</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.subscribeBtnPro}>
                  <Text style={styles.subscribeBtnText}>Subscribe — $3/month</Text>
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Yearly Pro */}
              <TouchableOpacity
                style={[styles.planCard, styles.planCardYearly, selectedPlan === 'yearly' && styles.planCardSelected]}
                onPress={() => setSelectedPlan('yearly')}
              >
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>SAVE 58%</Text>
                </View>
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>Pro Annual</Text>
                  <View>
                    <Text style={styles.planPrice}>$15<Text style={styles.planPriceSub}>/yr</Text></Text>
                    <Text style={styles.planPriceEquiv}>= $1.25/mo</Text>
                  </View>
                </View>
                <View style={styles.planFeatures}>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Everything in Pro Monthly</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Save $21/year vs monthly</Text>
                  </View>
                  <View style={styles.planFeature}>
                    <Feather name="check" size={14} color={Colors.success} />
                    <Text style={styles.planFeatureText}>Priority feature access</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.subscribeBtnYearly}>
                  <Text style={styles.subscribeBtnText}>Subscribe — $15/year</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ==================== BETA ACCESS ==================== */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Feather name="zap" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Beta Access</Text>
          </View>
          {isBetaUser ? (
            <View style={styles.betaSmall}>
              <Feather name="check-circle" size={18} color={Colors.success} />
              <Text style={styles.betaSmallText}>Beta activated — all Pro features unlocked</Text>
            </View>
          ) : (
            <>
              <Text style={styles.betaDesc}>Have a beta code? Enter it to unlock all Pro features for free during testing.</Text>
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
              {betaSuccess ? <Text style={styles.betaSuccessText}>Beta activated! All Pro features unlocked.</Text> : null}
            </>
          )}
        </View>

        {/* ==================== ACCOUNT SUMMARY ==================== */}
        <View style={styles.card}>
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

        {/* About */}
        <View style={styles.card}>
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
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  // Plans
  plansContainer: { gap: Spacing.md },
  planCard: { backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.lg, borderWidth: 2, borderColor: Colors.surfaceBorder, position: 'relative', overflow: 'hidden' },
  planCardPro: { borderColor: Colors.primary + '44' },
  planCardYearly: { borderColor: Colors.accent + '44' },
  planCardSelected: { borderColor: Colors.primary },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  planName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  planPrice: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  planPriceSub: { fontSize: FontSize.md, fontWeight: '400', color: Colors.textSecondary },
  planPriceEquiv: { fontSize: FontSize.xs, color: Colors.accent, textAlign: 'right', marginTop: 2 },
  planFeatures: { gap: Spacing.xs },
  planFeature: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  planFeatureText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  popularTag: { position: 'absolute', top: 0, right: 0, backgroundColor: Colors.primary, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderBottomLeftRadius: BorderRadius.sm },
  popularTagText: { color: Colors.white, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  saveBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: Colors.accent, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderBottomLeftRadius: BorderRadius.sm },
  saveBadgeText: { color: Colors.black, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  currentBadge: { marginTop: Spacing.md, alignSelf: 'center', backgroundColor: Colors.surfaceBorder, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  currentBadgeText: { color: Colors.textSecondary, fontSize: FontSize.xs, fontWeight: '600' },
  subscribeBtnPro: { backgroundColor: Colors.primary, paddingVertical: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', marginTop: Spacing.md },
  subscribeBtnYearly: { backgroundColor: Colors.accent, paddingVertical: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', marginTop: Spacing.md },
  subscribeBtnText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '700' },
  // Beta
  betaActive: { alignItems: 'center', paddingVertical: Spacing.md },
  betaActiveText: { color: Colors.success, fontSize: FontSize.md, fontWeight: '700', marginTop: Spacing.sm },
  betaActiveDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: Spacing.xs, textAlign: 'center' },
  betaSmall: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  betaSmallText: { color: Colors.success, fontSize: FontSize.sm },
  betaDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginBottom: Spacing.md, lineHeight: 20 },
  betaInputRow: { flexDirection: 'row', gap: Spacing.sm },
  betaInput: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.surfaceBorder, letterSpacing: 2 },
  betaButton: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, borderRadius: BorderRadius.md, justifyContent: 'center' },
  betaButtonText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.sm },
  betaError: { color: Colors.danger, fontSize: FontSize.sm, marginTop: Spacing.sm },
  betaSuccessText: { color: Colors.success, fontSize: FontSize.sm, marginTop: Spacing.sm },
  // Summary
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  summaryItem: { width: '47%', backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.sm, padding: Spacing.md, alignItems: 'center' },
  summaryValue: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  // About
  aboutText: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20 },
  version: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.md },
  credit: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.xs },
});
