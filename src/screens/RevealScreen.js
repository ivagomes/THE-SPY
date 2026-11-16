import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';

export default function RevealScreen({ route, navigation }) {
  const { roundData, currentPlayerIndex } = route.params;
  const [isMasking, setIsMasking] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => subscription.remove();
  }, []);

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
        <View style={styles.headerBadge}>
          <Text style={styles.playerHeader}>
            PAPEL DE {currentPlayer.name.toUpperCase()}
          </Text>
        </View>

        {currentPlayer.isImpostor ? (
          <View style={[styles.roleCard, styles.impostorCard]}>
            <View style={styles.impostorPill}>
              <Text style={styles.roleBadgeImpostor}>ALERTA DE INFILTRADO</Text>
            </View>
            <Text style={styles.impostorTitle}>VOCÊ É O IMPOSTOR!</Text>
            <Text style={styles.roleDescription}>
              Finja que conhece a palavra secreta da categoria{' '}
              <Text style={styles.highlightText}>{roundData.categoryName}</Text>{' '}
              e descubra qual é sem levantar suspeitas!
            </Text>
          </View>
        ) : (
          <View style={[styles.roleCard, styles.citizenCard]}>
            <View style={styles.citizenPill}>
              <Text style={styles.roleBadgeCitizen}>
                CATEGORIA: {roundData.categoryName.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.wordLabel}>A palavra secreta é:</Text>
            <Text style={styles.secretWord}>{roundData.secretWord}</Text>
            <Text style={styles.roleDescription}>
              Memorize a palavra acima, toque em ocultar e ajude a descobrir
              quem é o impostor!
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
    backgroundColor: '#0B1120',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBadge: {
    marginTop: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  playerHeader: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  roleCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2.5,
  },
  impostorCard: {
    backgroundColor: '#2D0F14',
    borderColor: '#EF4444',
  },
  citizenCard: {
    backgroundColor: '#0B2B22',
    borderColor: '#10B981',
  },
  impostorPill: {
    backgroundColor: '#EF444433',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 16,
  },
  citizenPill: {
    backgroundColor: '#10B98133',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 16,
  },
  roleBadgeImpostor: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  roleBadgeCitizen: {
    color: '#6EE7B7',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  impostorTitle: {
    color: '#FF4D5E',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18,
  },
  wordLabel: {
    color: '#CBD5E1',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  secretWord: {
    color: '#34D399',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleDescription: {
    color: '#F1F5F9',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  highlightText: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
