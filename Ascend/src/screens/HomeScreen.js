import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import {
  ACHIEVEMENTS_PLACEHOLDER_DATA,
  MOTIVATIONAL_QUOTE,
  ASCENSIONS_PLACEHOLDER_DATA,
} from '../Placeholder Data/Placeholders';

const userData = {
  coins: 100,
  gems: 20,
  experience: 900,
  levelCap: 1000,
  name: 'Steve',
};

const weekTemplate = [
  { id: 'sun', label: 'Su', date: '1' },
  { id: 'mon', label: 'Mo', date: '2' },
  { id: 'tue', label: 'Tu', date: '3', isActive: true, icon: 'fire' },
  { id: 'wed', label: 'We', date: '4' },
  { id: 'thu', label: 'Th', date: '5' },
  { id: 'fri', label: 'Fr', date: '6' },
  { id: 'sat', label: 'Sa', date: '7' },
];

const achievementColors = {
  'text-red-500': '#f87171',
  'text-blue-500': '#60a5fa',
  'text-gray-600': '#4b5563',
};

const HomeScreen = () => {
  const [ascensions, setAscensions] = useState(ASCENSIONS_PLACEHOLDER_DATA);
  const quoteHighlightWord = 'success.';
  const quoteLeadText = useMemo(
    () => MOTIVATIONAL_QUOTE.replace(quoteHighlightWord, ''),
    [quoteHighlightWord]
  );

  const toggleAscension = (id) => {
    setAscensions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderComponent {...userData} />

        <View style={styles.bodyContainer}>
          <Text style={styles.sectionHeading}>Hello Again!</Text>
          <View style={styles.statsRow}>
            <View style={styles.statsGroup}>
              <View style={styles.statItem}>
                <Ionicons name="logo-usd" size={16} color="#f59e0b" />
                <Text style={styles.statValue}>{userData.coins}</Text>
              </View>
              <View style={[styles.statItem, styles.statSpacing]}>
                <MaterialCommunityIcons name="diamond-stone" size={16} color="#38bdf8" />
                <Text style={styles.statValue}>{userData.gems}</Text>
              </View>
            </View>
            <View style={styles.homeProgressBar}>
              <View
                style={[
                  styles.homeProgressFill,
                  { width: `${Math.min(1, userData.experience / userData.levelCap) * 100}%` },
                ]}
              />
              <Text style={styles.homeProgressLabel}>
                {userData.experience}/{userData.levelCap}
              </Text>
            </View>
          </View>

          <View style={styles.weekRow}>
            {weekTemplate.map((day) => (
              <View
                key={day.id}
                style={[styles.dayCard, day.isActive && styles.dayCardActive]}
              >
                <Text style={[styles.dayLabel, day.isActive && styles.dayLabelActive]}>
                  {day.label}
                </Text>
                <Text style={[styles.dayDate, day.isActive && styles.dayDateActive]}>
                  {day.date}
                </Text>
                {day.icon && (
                  <MaterialCommunityIcons
                    name={day.icon}
                    size={18}
                    color={day.isActive ? '#f97316' : '#64748b'}
                  />
                )}
              </View>
            ))}
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Achievements</Text>
            <Text style={styles.sectionSubtext}>
              {ACHIEVEMENTS_PLACEHOLDER_DATA.filter((item) => item.unlocked).length}/
              {ACHIEVEMENTS_PLACEHOLDER_DATA.length}
            </Text>
          </View>

          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS_PLACEHOLDER_DATA.map((item) => (
              <View key={item.id} style={styles.achievementCard}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={28}
                  color={achievementColors[item.color] || '#64748b'}
                />
                <Text style={styles.achievementLabel}>{item.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Ascensions</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="add" size={24} color="#38bdf8" />
            </TouchableOpacity>
          </View>
          <Text style={styles.motivation}>
            {quoteLeadText}
            <Text style={styles.motivationHighlight}>{quoteHighlightWord}</Text>
          </Text>

          <View style={styles.ascensionList}>
            {ascensions.slice(0, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.ascensionRow}
                activeOpacity={0.9}
                onPress={() => toggleAscension(item.id)}
              >
                <View
                  style={[
                    styles.ascensionBullet,
                    item.completed && styles.ascensionBulletActive,
                  ]}
                >
                  {item.completed && (
                    <Ionicons name="checkmark" size={14} color="#0f172a" />
                  )}
                </View>
                <Text
                  style={[
                    styles.ascensionText,
                    item.completed && styles.ascensionTextDone,
                  ]}
                >
                  {item.name}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#38bdf8" />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionHeading}>Journal</Text>
          <View style={styles.journalCard}>
            <Text style={styles.journalPlaceholder}>Write about your day...</Text>
            <Ionicons name="pencil" size={18} color="#94a3b8" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionHeading: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statSpacing: {
    marginLeft: 12,
  },
  statValue: {
    color: '#f8fafc',
    fontWeight: '600',
    marginLeft: 8,
  },
  homeProgressBar: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  homeProgressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#38bdf8',
  },
  homeProgressLabel: {
    textAlign: 'center',
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  dayCard: {
    width: 44,
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCardActive: {
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  dayLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  dayLabelActive: {
    color: '#38bdf8',
    fontWeight: '600',
  },
  dayDate: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  dayDateActive: {
    color: '#f8fafc',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionSubtext: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  achievementCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementLabel: {
    color: '#cbd5f5',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  motivation: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  motivationAccent: {
    fontStyle: 'italic',
  },
  motivationHighlight: {
    color: '#38bdf8',
    fontStyle: 'italic',
  },
  ascensionList: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    marginBottom: 28,
  },
  ascensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1f2937',
  },
  ascensionBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#38bdf8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  ascensionBulletActive: {
    backgroundColor: '#38bdf8',
  },
  ascensionText: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '500',
  },
  ascensionTextDone: {
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  journalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  journalPlaceholder: {
    color: '#94a3b8',
    fontSize: 16,
  },
});

export default HomeScreen;

