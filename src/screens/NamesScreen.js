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
        >
          <View style={styles.header}>
            <Text style={styles.title}>Nomes dos Jogadores</Text>
            <Text style={styles.subtitle}>
              Digite o nome de cada participante ({playerCount} jogadores •{' '}
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

          <View style={styles.footer}>
            <PrimaryButton title="Sortear e Começar" onPress={handleStartGame} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  inputsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  indexText: {
    color: '#E63946',
    fontWeight: '800',
    fontSize: 14,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
  },
  footer: {
    marginTop: 4,
  },
});
