import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateRoundData } from '../utils/gameLogic';
import PrimaryButton from '../components/PrimaryButton';

export default function EndRoundScreen({ route, navigation }) {
  const { roundData } = route.params;

  const handlePlayAgainSameGroup = () => {
    const newRoundData = generateRoundData({
      categoryId: roundData.categoryId,
      playerNames: roundData.players.map((p) => p.name),
      impostorCount: roundData.impostorCount,
    });

    navigation.replace('PassPhone', {
      roundData: newRoundData,
      currentPlayerIndex: 0,
    });
  };

  const handleBackToSetup = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.statusPill}>
            <Text style={styles.badge}>RODADA EM ANDAMENTO</Text>
          </View>
          <Text style={styles.title}>Todos já viram seus papéis!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Que comece o debate!</Text>
          <Text style={styles.cardDescription}>
            Os <Text style={styles.bold}>{roundData.players.length} jogadores</Text>{' '}
            já receberam seus papéis na categoria{' '}
            <Text style={styles.bold}>{roundData.categoryName}</Text> com{' '}
            <Text style={styles.bold}>
              {roundData.impostorCount}{' '}
              {roundData.impostorCount === 1 ? 'impostor infiltrado' : 'impostores infiltrados'}
            </Text>
            .
          </Text>
          <View style={styles.divider} />
          <Text style={styles.cardSubtext}>
            Façam perguntas abertas em roda, analisem as respostas e votem em
            quem vocês acham que é o Espião!
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Jogar Novamente (Mesmo Grupo)"
            onPress={handlePlayAgainSameGroup}
          />
          <PrimaryButton
            title="Mudar Categoria / Jogadores"
            variant="secondary"
            onPress={handleBackToSetup}
            style={styles.secondaryAction}
          />
        </View>
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
  },
  header: {
    marginTop: 16,
    alignItems: 'center',
  },
  statusPill: {
    backgroundColor: '#10B98126',
    borderWidth: 1,
    borderColor: '#10B98166',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 12,
  },
  badge: {
    color: '#34D399',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 14,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#E2E8F0',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10B981',
    marginBottom: 18,
  },
  cardSubtext: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  bold: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  actions: {
    gap: 14,
  },
  secondaryAction: {
    marginTop: 2,
  },
});
