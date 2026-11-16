import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';

export default function RevealScreen({ route, navigation }) {
  const { roundData, currentPlayerIndex } = route.params;
  const [isMasking, setIsMasking] = useState(false);

  const currentPlayer = roundData.players[currentPlayerIndex];
  const totalPlayers = roundData.players.length;
  const isLastPlayer = currentPlayerIndex + 1 >= totalPlayers;

  const handleHideAndNext = () => {
    // Oculta imediatamente o conteúdo secreto antes de navegar para evitar qualquer "piscada"
    setIsMasking(true);

    if (isLastPlayer) {
      navigation.replace('EndRound', { roundData });
    } else {
      navigation.replace('PassPhone', {
        roundData,
        currentPlayerIndex: currentPlayerIndex + 1,
      });
    }
  };

  if (isMasking) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.playerHeader}>Papel de {currentPlayer.name}</Text>

        {currentPlayer.isImpostor ? (
          <View style={[styles.roleCard, styles.impostorCard]}>
            <Text style={styles.roleBadgeImpostor}>INFILTRADO</Text>
            <Text style={styles.impostorTitle}>VOCÊ É O IMPOSTOR!</Text>
            <Text style={styles.roleDescription}>
              Finja que conhece a palavra secreta da categoria{' '}
              <Text style={styles.highlightText}>{roundData.categoryName}</Text>{' '}
              e não deixe que descubram você.
            </Text>
          </View>
        ) : (
          <View style={[styles.roleCard, styles.citizenCard]}>
            <Text style={styles.roleBadgeCitizen}>
              CATEGORIA: {roundData.categoryName.toUpperCase()}
            </Text>
            <Text style={styles.wordLabel}>A palavra secreta é:</Text>
            <Text style={styles.secretWord}>{roundData.secretWord}</Text>
            <Text style={styles.roleDescription}>
              Memorize a palavra acima e descubra quem é o impostor na roda!
            </Text>
          </View>
        )}

        <PrimaryButton
          title={
            isLastPlayer
              ? 'Ocultar e Iniciar Rodada'
              : 'Ocultar e Chamar Próximo Jogador'
          }
          variant="secondary"
          onPress={handleHideAndNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerHeader: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 12,
  },
  roleCard: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  impostorCard: {
    backgroundColor: '#2A1215',
    borderColor: '#E63946',
  },
  citizenCard: {
    backgroundColor: '#0F2922',
    borderColor: '#10B981',
  },
  roleBadgeImpostor: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  roleBadgeCitizen: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  impostorTitle: {
    color: '#EF4444',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  wordLabel: {
    color: '#CBD5E1',
    fontSize: 16,
    marginBottom: 8,
  },
  secretWord: {
    color: '#10B981',
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  roleDescription: {
    color: '#E2E8F0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  highlightText: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
