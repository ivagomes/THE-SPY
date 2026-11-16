import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateRoundData } from '../utils/gameLogic';
import PrimaryButton from '../components/PrimaryButton';

export default function NamesScreen({ route, navigation }) {
  const { categoryId, playerCount, impostorCount } = route.params;

  const [playerNames, setPlayerNames] = useState(() =>
    Array.from({ length: playerCount }, (_, idx) => `Jogador ${idx + 1}`)
  );

  const handleNameChange = (index, value) => {
    setPlayerNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleStartGame = () => {
    const roundData = generateRoundData({
      categoryId,
      playerNames,
      impostorCount,
    });

    navigation.replace('PassPhone', {
      roundData,
      currentPlayerIndex: 0,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Quem vai jogar?</Text>
            <Text style={styles.subtitle}>
              Toque em qualquer nome para personalizar ({playerCount} jogadores •{' '}
              {impostorCount} {impostorCount === 1 ? 'impostor' : 'impostores'}).
            </Text>
          </View>

          <View style={styles.inputsContainer}>
            {playerNames.map((name, index) => (
              <View key={index} style={styles.inputRow}>
                <View style={styles.indexBadge}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => handleNameChange(index, text)}
                  placeholder={`Nome do Jogador ${index + 1}`}
                  placeholderTextColor="#64748B"
                  selectTextOnFocus
                  returnKeyType="done"
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.stickyFooter}>
          <PrimaryButton title="Sortear e Começar" onPress={handleStartGame} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
  },
  inputsContainer: {
    gap: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  indexBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  indexText: {
    color: '#FF6B78',
    fontWeight: '900',
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 10,
  },
  stickyFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#0B1120',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
});
