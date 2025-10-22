import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockHistory = [
  { id: '1', date: '18 October', text: 'Felt productive and completed workout.' },
  { id: '2', date: '17 October', text: 'Read for 20 minutes before bed.' },
  { id: '3', date: '16 October', text: 'Meditated and stayed mindful.' },
];

const JournalScreen = () => {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState(mockHistory);

  const handleSaveEntry = () => {
    const trimmed = entry.trim();
    if (!trimmed) {
      return;
    }

    setHistory((prev) => [
      { id: `entry-${Date.now()}`, date: 'Today', text: trimmed },
      ...prev,
    ]);
    setEntry('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Write a Journal</Text>
        <View style={styles.inputCard}>
          <TextInput
            placeholder="Write about your day..."
            placeholderTextColor="#64748b"
            value={entry}
            onChangeText={setEntry}
            style={styles.textInput}
            multiline
          />
          {entry ? (
            <TouchableOpacity onPress={() => setEntry('')}>
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="create-outline" size={20} color="#38bdf8" />
          )}
        </View>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSaveEntry}>
          <Ionicons name="add" size={22} color="#f8fafc" />
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>Journal History</Text>
        <View style={styles.historyList}>
          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Ionicons name="chevron-down" size={18} color="#38bdf8" />
              </View>
              <Text style={styles.historyText}>{item.text}</Text>
            </View>
          ))}
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
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 16,
    marginRight: 12,
  },
  saveButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  sectionHeading: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyDate: {
    color: '#f8fafc',
    fontWeight: '600',
  },
  historyText: {
    color: '#cbd5f5',
    fontSize: 14,
  },
});

export default JournalScreen;
