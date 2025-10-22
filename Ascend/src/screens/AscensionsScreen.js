import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOTIVATIONAL_QUOTE, ASCENSIONS_PLACEHOLDER_DATA } from '../Placeholder Data/Placeholders';

const initialAscensions = ASCENSIONS_PLACEHOLDER_DATA.map((item) => ({
  ...item,
  completed: Boolean(item.completed),
}));

const AscensionsScreen = () => {
  const [ascensions, setAscensions] = useState(initialAscensions);
  const [newAscension, setNewAscension] = useState('');
  const quoteHighlightWord = 'success.';
  const quoteLeadText = MOTIVATIONAL_QUOTE.replace(quoteHighlightWord, '');

  const handleAddAscension = () => {
    const trimmed = newAscension.trim();
    if (!trimmed) {
      return;
    }

    setAscensions((prev) => [
      { id: `new-${Date.now()}`, name: trimmed, completed: false },
      ...prev,
    ]);
    setNewAscension('');
  };

  const toggleCompletion = (id) => {
    setAscensions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add Ascension</Text>
        <View style={styles.inputRow}>
          <Ionicons name="create-outline" size={20} color="#38bdf8" />
          <TextInput
            placeholder="Add an Ascension"
            placeholderTextColor="#64748b"
            style={styles.textInput}
            value={newAscension}
            onChangeText={setNewAscension}
            onSubmitEditing={handleAddAscension}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={handleAddAscension} activeOpacity={0.8}>
            <Ionicons name="add-circle" size={22} color="#38bdf8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Ascensions</Text>
        <Text style={styles.quote}>
          {quoteLeadText}
          <Text style={styles.quoteHighlight}>{quoteHighlightWord}</Text>
        </Text>

        <View style={styles.listContainer}>
          {ascensions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.ascensionRow}
              activeOpacity={0.8}
              onPress={() => toggleCompletion(item.id)}
            >
              <View style={[styles.radio, item.completed && styles.radioActive]}>
                {item.completed && <Ionicons name="checkmark" size={14} color="#0f172a" />}
              </View>
              <Text style={[styles.ascensionText, item.completed && styles.ascensionTextDone]}>
                {item.name}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#38bdf8" />
            </TouchableOpacity>
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
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 28,
  },
  textInput: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 16,
    marginHorizontal: 12,
  },
  sectionHeading: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  quote: {
    color: '#94a3b8',
    fontSize: 15,
    marginBottom: 20,
  },
  quoteHighlight: {
    color: '#38bdf8',
    fontStyle: 'italic',
  },
  listContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingVertical: 12,
  },
  ascensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1f2937',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#38bdf8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  radioActive: {
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
});

export default AscensionsScreen;
