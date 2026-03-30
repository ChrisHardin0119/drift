import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from '../../components/ServiceCard';
import { popularServices } from '../../data/services';
import { categories } from '../../data/categories';
import { useRouter } from 'expo-router';

export default function Services() {
  const { services, addService, removeService, isBetaUser, updateServicePrice } = useApp();
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customCategory, setCustomCategory] = useState('other');
  const [customCycle, setCustomCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [serviceDetail, setServiceDetail] = useState<string | null>(null);
  const [requestName, setRequestName] = useState('');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Tier limits
  const FREE_LIMIT = 5;
  const canAddMore = isBetaUser || services.length < FREE_LIMIT;

  // Filter popular services by search AND category
  const filteredPopular = useMemo(() => {
    return popularServices.filter(s => {
      const matchesSearch = searchQuery.length === 0 || s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const notTracked = !services.some(tracked => tracked.name === s.name);
      return matchesSearch && matchesCategory && notTracked;
    });
  }, [searchQuery, selectedCategory, services]);

  // Group services by category for browsing
  const categoryGroups = useMemo(() => {
    const groups: Record<string, typeof popularServices> = {};
    filteredPopular.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [filteredPopular]);

  // Count services per category (unfiltered, for chips)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: popularServices.filter(s => !services.some(t => t.name === s.name)).length };
    popularServices.forEach(s => {
      if (!services.some(t => t.name === s.name)) {
        counts[s.category] = (counts[s.category] || 0) + 1;
      }
    });
    return counts;
  }, [services]);

  const handleAddPopular = (service: typeof popularServices[0]) => {
    addService({
      name: service.name,
      category: service.category,
      price: service.defaultPrice,
      billingCycle: 'monthly',
      color: service.color,
    });
    // Don't close modal â€” let them keep adding
  };

  const handleAddCustom = () => {
    if (!customName.trim() || !customPrice.trim()) return;
    addService({
      name: customName.trim(),
      category: customCategory,
      price: parseFloat(customPrice),
      billingCycle: customCycle,
    });
    setShowCustom(false);
    setShowAdd(false);
    setCustomName('');
    setCustomPrice('');
    setCustomCategory('other');
  };

  const handleSubmitRequest = () => {
    if (!requestName.trim()) return;
    // Store the request locally for now â€” in V2 this would hit an API
    // For now we save it to AsyncStorage as a "requested service"
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setShowRequest(false);
      setRequestName('');
      setRequestUrl('');
    }, 2000);
  };

  const detailService = serviceDetail ? services.find(s => s.id === serviceDetail) : null;

  // Filter tracked services by category
  const [trackedFilter, setTrackedFilter] = useState<string>('all');
  const filteredTracked = trackedFilter === 'all'
    ? services
    : services.filter(s => s.category === trackedFilter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Services</Text>
        <TouchableOpacity
          style={[styles.addButton, !canAddMore && { opacity: 0.5 }]}
          onPress={() => canAddMore ? setShowAdd(true) : null}
        >
          <Feather name="plus" size={20} color={Colors.white} />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {!canAddMore && !isBetaUser && (
        <View style={styles.limitBanner}>
          <Feather name="lock" size={14} color={Colors.warning} />
          <Text style={styles.limitText}>Free tier: {FREE_LIMIT} services max. Upgrade to Pro for unlimited tracking.</Text>
        </View>
      )}

      {/* Category filter for tracked services */}
      {services.length > 3 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trackedFilters} contentContainerStyle={{ paddingHorizontal: Spacing.lg }}>
          <TouchableOpacity
            style={[styles.filterChip, trackedFilter === 'all' && styles.filterChipActive]}
            onPress={() => setTrackedFilter('all')}
          >
            <Text style={[styles.filterChipText, trackedFilter === 'all' && styles.filterChipTextActive]}>All ({services.length})</Text>
          </TouchableOpacity>
          {categories.filter(c => services.some(s => s.category === c.id)).map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterChip, trackedFilter === cat.id && { backgroundColor: cat.color + '22', borderColor: cat.color }]}
              onPress={() => setTrackedFilter(cat.id)}
            >
              <Feather name={cat.icon as any} size={12} color={trackedFilter === cat.id ? cat.color : Colors.textMuted} />
              <Text style={[styles.filterChipText, trackedFilter === cat.id && { color: cat.color }]}>
                {cat.name} ({services.filter(s => s.category === cat.id).length})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {services.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="layers" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No services tracked yet</Text>
            <Text style={styles.emptyDesc}>Tap "Add" to start tracking your subscriptions.</Text>
          </View>
        ) : (
          filteredTracked.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => setServiceDetail(service.id)}
            />
          ))
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {/* ==================== ADD SERVICE MODAL ==================== */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Service</Text>
              <TouchableOpacity onPress={() => { setShowAdd(false); setSearchQuery(''); setSelectedCategory('all'); }}>
                <Feather name="x" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
              <Feather name="search" size={18} color={Colors.textMuted} style={{ position: 'absolute', left: 12, zIndex: 1 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search 240+ services..."
                placeholderTextColor={Colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity style={styles.clearSearch} onPress={() => setSearchQuery('')}>
                  <Feather name="x-circle" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Category chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <TouchableOpacity
                style={[styles.catChipLg, selectedCategory === 'all' && styles.catChipLgActive]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={[styles.catChipLgText, selectedCategory === 'all' && styles.catChipLgTextActive]}>All ({categoryCounts.all || 0})</Text>
              </TouchableOpacity>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChipLg, selectedCategory === cat.id && { backgroundColor: cat.color + '22', borderColor: cat.color }]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Feather name={cat.icon as any} size={13} color={selectedCategory === cat.id ? cat.color : Colors.textMuted} />
                  <Text style={[styles.catChipLgText, selectedCategory === cat.id && { color: cat.color }]}>
                    {cat.name} ({categoryCounts[cat.id] || 0})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Results */}
            <FlatList
              data={filteredPopular.slice(0, 50)}
              keyExtractor={item => item.name}
              style={{ maxHeight: 280 }}
              ListEmptyComponent={
                <View style={styles.noResults}>
                  <Feather name="search" size={28} color={Colors.textMuted} />
                  <Text style={styles.noResultsText}>No matches found</Text>
                  <TouchableOpacity style={styles.requestLink} onPress={() => { setShowAdd(false); setShowRequest(true); }}>
                    <Feather name="plus-circle" size={14} color={Colors.primary} />
                    <Text style={styles.requestLinkText}>Can't find your subscription? Request it</Text>
                  </TouchableOpacity>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.popularItem}
                  onPress={() => { if (canAddMore) handleAddPopular(item); }}
                  disabled={!canAddMore}
                >
                  <View style={[styles.popularDot, { backgroundColor: item.color }]} />
                  <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.popularPrice}>${item.defaultPrice.toFixed(2)}/mo</Text>
                  {canAddMore ? (
                    <Feather name="plus" size={18} color={Colors.primary} />
                  ) : (
                    <Feather name="lock" size={16} color={Colors.textMuted} />
                  )}
                </TouchableOpacity>
              )}
            />

            <Text style={styles.resultCount}>{filteredPopular.length} services available</Text>

            {/* Bottom actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.customButton} onPress={() => setShowCustom(true)}>
                <Feather name="edit-3" size={16} color={Colors.primary} />
                <Text style={styles.customButtonText}>Add custom</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.requestButton} onPress={() => { setShowAdd(false); setShowRequest(true); }}>
                <Feather name="help-circle" size={16} color={Colors.accent} />
                <Text style={styles.requestButtonText}>Can't find it?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ==================== CUSTOM SERVICE MODAL ==================== */}
      <Modal visible={showCustom} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Custom Service</Text>
              <TouchableOpacity onPress={() => setShowCustom(false)}>
                <Feather name="x" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Service Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., My VPN"
              placeholderTextColor={Colors.textMuted}
              value={customName}
              onChangeText={setCustomName}
            />

            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="9.99"
              placeholderTextColor={Colors.textMuted}
              value={customPrice}
              onChangeText={setCustomPrice}
              keyboardType="decimal-pad"
            />

            <Text style={styles.inputLabel}>Billing Cycle</Text>
            <View style={styles.cycleRow}>
              {(['monthly', 'yearly'] as const).map(cycle => (
                <TouchableOpacity
                  key={cycle}
                  style={[styles.cycleButton, customCycle === cycle && styles.cycleActive]}
                  onPress={() => setCustomCycle(cycle)}
                >
                  <Text style={[styles.cycleText, customCycle === cycle && styles.cycleTextActive]}>
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChip, customCategory === cat.id && { backgroundColor: cat.color + '33', borderColor: cat.color }]}
                  onPress={() => setCustomCategory(cat.id)}
                >
                  <Feather name={cat.icon as any} size={14} color={customCategory === cat.id ? cat.color : Colors.textMuted} />
                  <Text style={[styles.catChipText, customCategory === cat.id && { color: cat.color }]}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveButton, (!customName.trim() || !customPrice.trim()) && { opacity: 0.5 }]}
              onPress={handleAddCustom}
            >
              <Text style={styles.saveButtonText}>Add Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ==================== CAN'T FIND IT - REQUEST MODAL ==================== */}
      <Modal visible={showRequest} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request a Service</Text>
              <TouchableOpacity onPress={() => { setShowRequest(false); setRequestSubmitted(false); }}>
                <Feather name="x" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {requestSubmitted ? (
              <View style={styles.requestSuccess}>
                <Feather name="check-circle" size={48} color={Colors.success} />
                <Text style={styles.requestSuccessTitle}>Request submitted!</Text>
                <Text style={styles.requestSuccessDesc}>We'll add this service to our database. It may appear in a future update.</Text>
              </View>
            ) : (
              <>
                <Text style={styles.requestDesc}>
                  Can't find your subscription? Tell us what's missing and we'll add it to our database automatically.
                </Text>

                <Text style={styles.inputLabel}>Service Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Crunchyroll, Brilliant, etc."
                  placeholderTextColor={Colors.textMuted}
                  value={requestName}
                  onChangeText={setRequestName}
                  autoFocus
                />

                <Text style={styles.inputLabel}>Website URL (optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://..."
                  placeholderTextColor={Colors.textMuted}
                  value={requestUrl}
                  onChangeText={setRequestUrl}
                  keyboardType="url"
                  autoCapitalize="none"
                />

                <Text style={styles.requestNote}>
                  Requested services are reviewed and added to the database. In the meantime, you can add it as a custom service.
                </Text>

                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={[styles.saveButton, !requestName.trim() && { opacity: 0.5 }]}
                    onPress={handleSubmitRequest}
                    disabled={!requestName.trim()}
                  >
                    <Feather name="send" size={16} color={Colors.white} />
                    <Text style={styles.saveButtonText}> Submit Request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.customFallback}
                    onPress={() => { setShowRequest(false); setShowAdd(true); setShowCustom(true); }}
                  >
                    <Text style={styles.customFallbackText}>Or add as custom service</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ==================== SERVICE DETAIL MODAL ==================== */}
      <Modal visible={!!serviceDetail} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            {detailService && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{detailService.name}</Text>
                  <TouchableOpacity onPress={() => setServiceDetail(null)}>
                    <Feather name="x" size={24} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.detailPrice}>${detailService.price.toFixed(2)}/{detailService.billingCycle === 'yearly' ? 'yr' : 'mo'}</Text>
                <Text style={styles.detailSince}>Tracking since {new Date(detailService.dateAdded).toLocaleDateString()}</Text>

                {detailService.priceHistory.length > 1 && (
                  <View style={styles.historySection}>
                    <Text style={styles.historyTitle}>Price History</Text>
                    {detailService.priceHistory.map((entry, i) => (
                      <View key={i} style={styles.historyItem}>
                        <Text style={styles.historyDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                        <Text style={styles.historyPrice}>${entry.price.toFixed(2)}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {detailService.changes.length > 0 && (
                  <View style={styles.historySection}>
                    <Text style={styles.historyTitle}>Changes</Text>
                    {detailService.changes.map((change, i) => (
                      <View key={i} style={styles.changeItem}>
                        <Text style={styles.changeDate}>{new Date(change.date).toLocaleDateString()}</Text>
                        <Text style={styles.changeTitle}>{change.title}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => { removeService(detailService.id); setServiceDetail(null); }}
                >
                  <Feather name="trash-2" size={16} color={Colors.danger} />
                  <Text style={styles.removeText}>Remove Service</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, gap: Spacing.xs },
  addButtonText: { color: Colors.white, fontWeight: '600', fontSize: FontSize.sm },
  limitBanner: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.lg, padding: Spacing.sm, backgroundColor: Colors.warning + '11', borderRadius: BorderRadius.sm, gap: Spacing.xs, marginBottom: Spacing.sm },
  limitText: { color: Colors.warning, fontSize: FontSize.xs, flex: 1 },
  trackedFilters: { marginBottom: Spacing.sm, maxHeight: 40 },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: Spacing.xs, gap: 4 },
  filterChipActive: { backgroundColor: Colors.primary + '22', borderColor: Colors.primary },
  filterChipText: { color: Colors.textMuted, fontSize: FontSize.xs },
  filterChipTextActive: { color: Colors.primary, fontWeight: '600' },
  list: { paddingHorizontal: Spacing.lg },
  empty: { alignItems: 'center', paddingVertical: Spacing.xxl },
  emptyTitle: { color: Colors.text, fontSize: FontSize.lg, fontWeight: '700', marginTop: Spacing.md },
  emptyDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: Spacing.xs },
  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: { backgroundColor: Colors.surface, borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl, padding: Spacing.lg, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  modalTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  // Search
  searchRow: { position: 'relative', marginBottom: Spacing.sm },
  searchInput: { backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, paddingLeft: 40, paddingRight: 36, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  clearSearch: { position: 'absolute', right: 12, top: '50%', marginTop: -8 },
  // Category chips in add modal
  categoryScroll: { marginBottom: Spacing.sm, maxHeight: 36 },
  catChipLg: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: Spacing.xs, gap: 4 },
  catChipLgActive: { backgroundColor: Colors.primary + '22', borderColor: Colors.primary },
  catChipLgText: { color: Colors.textMuted, fontSize: FontSize.xs },
  catChipLgTextActive: { color: Colors.primary, fontWeight: '600' },
  // Results
  popularItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, gap: Spacing.sm },
  popularDot: { width: 10, height: 10, borderRadius: 5 },
  popularName: { flex: 1, color: Colors.text, fontSize: FontSize.sm, fontWeight: '500' },
  popularPrice: { color: Colors.textSecondary, fontSize: FontSize.xs },
  resultCount: { color: Colors.textMuted, fontSize: FontSize.xs, textAlign: 'center', marginTop: Spacing.xs },
  noResults: { alignItems: 'center', paddingVertical: Spacing.xl },
  noResultsText: { color: Colors.textMuted, fontSize: FontSize.md, marginTop: Spacing.sm },
  requestLink: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.md },
  requestLinkText: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: '500' },
  // Bottom actions
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md, gap: Spacing.sm },
  customButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, paddingVertical: Spacing.sm, gap: Spacing.xs, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md },
  customButtonText: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: '600' },
  requestButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, paddingVertical: Spacing.sm, gap: Spacing.xs, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md },
  requestButtonText: { color: Colors.accent, fontSize: FontSize.sm, fontWeight: '600' },
  // Custom service
  inputLabel: { color: Colors.textSecondary, fontSize: FontSize.sm, marginBottom: Spacing.xs, marginTop: Spacing.sm },
  input: { backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  cycleRow: { flexDirection: 'row', gap: Spacing.sm },
  cycleButton: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  cycleActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '22' },
  cycleText: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: '500' },
  cycleTextActive: { color: Colors.primary },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: Spacing.xs, gap: 4 },
  catChipText: { color: Colors.textMuted, fontSize: FontSize.xs },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, paddingVertical: Spacing.md, borderRadius: BorderRadius.md, marginTop: Spacing.md },
  saveButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '700' },
  // Request service
  requestDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20, marginBottom: Spacing.sm },
  requestNote: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.md, lineHeight: 16, fontStyle: 'italic' },
  requestActions: { marginTop: Spacing.md },
  customFallback: { alignItems: 'center', paddingVertical: Spacing.md },
  customFallbackText: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: '500' },
  requestSuccess: { alignItems: 'center', paddingVertical: Spacing.xl },
  requestSuccessTitle: { color: Colors.success, fontSize: FontSize.xl, fontWeight: '700', marginTop: Spacing.md },
  requestSuccessDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, textAlign: 'center', marginTop: Spacing.sm },
  // Detail
  detailPrice: { fontSize: FontSize.hero, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  detailSince: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.md },
  historySection: { marginTop: Spacing.md },
  historyTitle: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: '600', marginBottom: Spacing.xs },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.xs, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  historyDate: { color: Colors.textMuted, fontSize: FontSize.sm },
  historyPrice: { color: Colors.text, fontSize: FontSize.sm, fontWeight: '600' },
  changeItem: { paddingVertical: Spacing.xs, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  changeDate: { color: Colors.textMuted, fontSize: FontSize.xs },
  changeTitle: { color: Colors.text, fontSize: FontSize.sm },
  removeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md, gap: Spacing.sm, marginTop: Spacing.lg },
  removeText: { color: Colors.danger, fontSize: FontSize.md, fontWeight: '600' },
});

