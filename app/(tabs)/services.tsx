import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from '../../components/ServiceCard';
import { popularServices } from '../../data/services';
import { categories } from '../../data/categories';
import { useRouter } from 'expo-router';

export default function Services() {
  const { services, addService, removeService, isBetaUser } = useApp();
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customCategory, setCustomCategory] = useState('other');
  const [customCycle, setCustomCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceDetail, setServiceDetail] = useState<string | null>(null);

  const canAddMore = isBetaUser || services.length < 5;

  const filteredPopular = popularServices.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !services.some(tracked => tracked.name === s.name)
  );

  const handleAddPopular = (service: typeof popularServices[0]) => {
    addService({
      name: service.name,
      category: service.category,
      price: service.defaultPrice,
      billingCycle: 'monthly',
      color: service.color,
    });
    setShowAdd(false);
    setSearchQuery('');
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

  const detailService = serviceDetail ? services.find(s => s.id === serviceDetail) : null;

  return (
    <SafeAreaView style={styles.container}>
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
      {!canAddMore && (
        <View style={styles.limitBanner}>
          <Feather name="lock" size={14} color={Colors.warning} />
          <Text style={styles.limitText}>Free tier: 5 services max. Enter beta code in Settings for unlimited.</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {services.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="layers" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No services tracked yet</Text>
            <Text style={styles.emptyDesc}>Tap "Add" to start tracking your subscriptions.</Text>
          </View>
        ) : (
          services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => setServiceDetail(service.id)}
            />
          ))
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {/* Add Service Modal */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Service</Text>
              <TouchableOpacity onPress={() => { setShowAdd(false); setSearchQuery(''); }}>
                <Feather name="x" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search popular services..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredPopular.slice(0, 15)}
              keyExtractor={item => item.name}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.popularItem} onPress={() => handleAddPopular(item)}>
                  <View style={[styles.popularDot, { backgroundColor: item.color }]} />
                  <Text style={styles.popularName}>{item.name}</Text>
                  <Text style={styles.popularPrice}>${item.defaultPrice.toFixed(2)}/mo</Text>
                  <Feather name="plus" size={18} color={Colors.primary} />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.customButton} onPress={() => setShowCustom(true)}>
              <Feather name="edit-3" size={18} color={Colors.primary} />
              <Text style={styles.customButtonText}>Add custom service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Service Modal */}
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

      {/* Service Detail Modal */}
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
  list: { paddingHorizontal: Spacing.lg },
  empty: { alignItems: 'center', paddingVertical: Spacing.xxl },
  emptyTitle: { color: Colors.text, fontSize: FontSize.lg, fontWeight: '700', marginTop: Spacing.md },
  emptyDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: Spacing.xs },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: { backgroundColor: Colors.surface, borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl, padding: Spacing.lg, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  modalTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  searchInput: { backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  popularItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, gap: Spacing.sm },
  popularDot: { width: 12, height: 12, borderRadius: 6 },
  popularName: { flex: 1, color: Colors.text, fontSize: FontSize.md, fontWeight: '500' },
  popularPrice: { color: Colors.textSecondary, fontSize: FontSize.sm },
  customButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md, gap: Spacing.sm, marginTop: Spacing.sm },
  customButtonText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: '600' },
  inputLabel: { color: Colors.textSecondary, fontSize: FontSize.sm, marginBottom: Spacing.xs, marginTop: Spacing.sm },
  input: { backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  cycleRow: { flexDirection: 'row', gap: Spacing.sm },
  cycleButton: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  cycleActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '22' },
  cycleText: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: '500' },
  cycleTextActive: { color: Colors.primary },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: Spacing.xs, gap: 4 },
  catChipText: { color: Colors.textMuted, fontSize: FontSize.xs },
  saveButton: { backgroundColor: Colors.primary, paddingVertical: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', marginTop: Spacing.md },
  saveButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '700' },
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
