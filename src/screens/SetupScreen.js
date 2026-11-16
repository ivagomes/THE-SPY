import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '../data/categories';
import { MIN_PLAYERS, getMaxImpostors } from '../utils/gameLogic';
import PrimaryButton from '../components/PrimaryButton';

export default function SetupScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [playerCount, setPlayerCount] = useState(4);
  const [playerInputText, setPlayerInputText] = useState('4');
  const [impostorCount, setImpostorCount] = useState(1);

  const maxImpostors = getMaxImpostors(playerCount);

  const updatePlayerCount = (newCount) => {
    const clampedCount = Math.max(MIN_PLAYERS, Math.min(30, newCount));
    setPlayerCount(clampedCount);
    setPlayerInputText(String(clampedCount));

    const allowedMax = getMaxImpostors(clampedCount);
    if (impostorCount > allowedMax) {
      setImpostorCount(allowedMax);
    }
  };

  const handlePlayerInputChange = (text) => {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    setPlayerInputText(digitsOnly);

    const parsed = parseInt(digitsOnly, 10);
    if (!Number.isNaN(parsed) && parsed >= MIN_PLAYERS) {
      const clamped = Math.min(30, parsed);
      setPlayerCount(clamped);
      const allowedMax = getMaxImpostors(clamped);
      if (impostorCount > allowedMax) {
        setImpostorCount(allowedMax);
      }
    }
  };

  const handlePlayerInputBlur = () => {
    const parsed = parseInt(playerInputText, 10);
    if (Number.isNaN(parsed) || parsed < MIN_PLAYERS) {
      updatePlayerCount(MIN_PLAYERS);
    } else {
      updatePlayerCount(parsed);
    }
  };

  const handleContinue = () => {
    navigation.navigate('Names', {
      categoryId: selectedCategory,
      playerCount,
      impostorCount: Math.min(impostorCount, getMaxImpostors(playerCount)),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>O ESPIÃO</Text>
          <Text style={styles.title}>Configurar Partida</Text>
          <Text style={styles.subtitle}>
            Defina a categoria, o número de jogadores e quantos impostores estarão infiltrados.
          </Text>
        </View>

        {/* Seleção de Categoria */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Categoria</Text>
          <View style={styles.categoryList}>
            {CATEGORIES.map((category) => {
              const isSelected = category.id === selectedCategory;
              return (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextActive,
                    ]}
                  >
                    {category.name} ({category.words.length} palavras)
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quantidade de Jogadores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Quantidade de Jogadores</Text>
          <Text style={styles.helperText}>Mínimo de {MIN_PLAYERS} jogadores</Text>

          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                playerCount <= MIN_PLAYERS && styles.counterButtonDisabled,
              ]}
              onPress={() => updatePlayerCount(playerCount - 1)}
              disabled={playerCount <= MIN_PLAYERS}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.counterInput}
              keyboardType="number-pad"
              value={playerInputText}
              onChangeText={handlePlayerInputChange}
              onBlur={handlePlayerInputBlur}
              maxLength={2}
            />

            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => updatePlayerCount(playerCount + 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quantidade de Impostores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Quantidade de Impostores</Text>
          <Text style={styles.helperText}>
            {playerCount < 10
              ? 'Grupos de 4 a 9 jogadores: máximo de 1 impostor.'
              : 'Grupo de 10+ jogadores: você pode escolher 1 ou 2 impostores.'}
          </Text>

          <View style={styles.impostorRow}>
            {[1, 2].map((countOption) => {
              const isBlocked = countOption > maxImpostors;
              const isSelected = impostorCount === countOption;
              return (
                <TouchableOpacity
                  key={countOption}
                  activeOpacity={0.8}
                  disabled={isBlocked}
                  onPress={() => setImpostorCount(countOption)}
                  style={[
                    styles.impostorOption,
                    isSelected && styles.impostorOptionSelected,
                    isBlocked && styles.impostorOptionBlocked,
                  ]}
                >
                  <Text
                    style={[
                      styles.impostorOptionNumber,
                      isSelected && styles.impostorOptionTextSelected,
                      isBlocked && styles.impostorOptionTextBlocked,
                    ]}
                  >
                    {countOption} {countOption === 1 ? 'Impostor' : 'Impostores'}
                  </Text>
                  {isBlocked && (
                    <Text style={styles.lockHint}>Requer 10+ jogadores</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="Definir Nomes dos Jogadores"
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    color: '#E63946',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    color: '#F1F5F9',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  helperText: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 14,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  categoryChipActive: {
    backgroundColor: '#E6394622',
    borderColor: '#E63946',
  },
  categoryChipText: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  counterButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    opacity: 0.35,
  },
  counterButtonText: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '700',
  },
  counterInput: {
    minWidth: 80,
    height: 52,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  impostorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  impostorOption: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  impostorOptionSelected: {
    backgroundColor: '#E6394622',
    borderColor: '#E63946',
  },
  impostorOptionBlocked: {
    opacity: 0.4,
    backgroundColor: '#0F172A',
  },
  impostorOptionNumber: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '700',
  },
  impostorOptionTextSelected: {
    color: '#FFFFFF',
  },
  impostorOptionTextBlocked: {
    color: '#64748B',
  },
  lockHint: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  footer: {
    marginTop: 8,
  },
});
