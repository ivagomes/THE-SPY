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
  const activeCategoryObj =
    CATEGORIES.find((cat) => cat.id === selectedCategory) || CATEGORIES[0];

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
    const parsed = parseInt(playerInputText, 10);
    const finalPlayerCount =
      Number.isNaN(parsed) || parsed < MIN_PLAYERS
        ? MIN_PLAYERS
        : Math.min(30, parsed);
    const finalImpostorCount = Math.min(
      impostorCount,
      getMaxImpostors(finalPlayerCount)
    );

    updatePlayerCount(finalPlayerCount);

    navigation.navigate('Names', {
      categoryId: selectedCategory,
      playerCount: finalPlayerCount,
      impostorCount: finalImpostorCount,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.badgePill}>
            <Text style={styles.badge}>JOGO DE FESTA • O ESPIÃO</Text>
          </View>
          <Text style={styles.title}>Configurar Partida</Text>
          <Text style={styles.subtitle}>
            Escolha o tema da rodada, quantos amigos vão jogar e quantos
            impostores estarão infiltrados.
          </Text>
        </View>

        {/* 1. Seleção de Categoria (13 categorias com grid fluido) */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>1. Categoria</Text>
            <Text style={styles.activeCategoryTag}>
              {activeCategoryObj.name} ({activeCategoryObj.words.length})
            </Text>
          </View>
          <Text style={styles.helperText}>
            Toque em uma das {CATEGORIES.length} categorias disponíveis:
          </Text>

          <View style={styles.categoryGrid}>
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
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Quantidade de Jogadores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Quantidade de Jogadores</Text>
          <Text style={styles.helperText}>
            Mínimo de {MIN_PLAYERS} jogadores na roda
          </Text>

          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                playerCount <= MIN_PLAYERS && styles.counterButtonDisabled,
              ]}
              activeOpacity={0.75}
              onPress={() => updatePlayerCount(playerCount - 1)}
              disabled={playerCount <= MIN_PLAYERS}
            >
              <Text style={styles.counterButtonText}>−</Text>
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
              activeOpacity={0.75}
              onPress={() => updatePlayerCount(playerCount + 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Quantidade de Impostores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Quantidade de Impostores</Text>
          <Text style={styles.helperText}>
            {playerCount < 10
              ? 'De 4 a 9 jogadores: máximo permitido de 1 impostor.'
              : 'Grupo com 10+ jogadores: liberado 1 ou 2 impostores!'}
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
                  {isBlocked ? (
                    <Text style={styles.lockHint}>Requer 10+ jogadores</Text>
                  ) : (
                    <Text style={styles.unlockedHint}>Disponível</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.stickyFooter}>
        <PrimaryButton
          title="Definir Nomes dos Jogadores"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  container: {
    padding: 20,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6394626',
    borderWidth: 1,
    borderColor: '#E6394666',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 10,
  },
  badge: {
    color: '#FF6B78',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  activeCategoryTag: {
    color: '#FF6B78',
    fontSize: 13,
    fontWeight: '800',
  },
  helperText: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    minWidth: '30%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#E63946',
    borderColor: '#FF6B78',
  },
  categoryChipText: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  counterButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    opacity: 0.35,
  },
  counterButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  counterInput: {
    minWidth: 96,
    height: 60,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#64748B',
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 14,
  },
  impostorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  impostorOption: {
    flex: 1,
    minHeight: 72,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  impostorOptionSelected: {
    backgroundColor: '#E639462E',
    borderColor: '#E63946',
  },
  impostorOptionBlocked: {
    opacity: 0.4,
    backgroundColor: '#0F172A',
  },
  impostorOptionNumber: {
    color: '#E2E8F0',
    fontSize: 17,
    fontWeight: '800',
  },
  impostorOptionTextSelected: {
    color: '#FFFFFF',
  },
  impostorOptionTextBlocked: {
    color: '#64748B',
  },
  lockHint: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  unlockedHint: {
    color: '#34D399',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '700',
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
