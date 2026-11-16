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
          <Text style={styles.badge}>RODADA EM ANDAMENTO</Text>
          <Text style={styles.title}>Todos já viram seus papéis!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hora de descobrir o Espião</Text>
          <Text style={styles.cardDescription}>
            Os {roundData.players.length} jogadores já receberam seus papéis na
            categoria <Text style={styles.bold}>{roundData.categoryName}</Text>{' '}
            ({roundData.impostorCount}{' '}
            {roundData.impostorCount === 1 ? 'impostor' : 'impostores'}).
          </Text>
          <Text style={styles.cardSubtext}>
            Façam perguntas entre si, debatam e descubram quem está infiltrado!
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Jogar Novamente (Mesmo Grupo)"
            onPress={handlePlayAgainSameGroup}
          />
          <PrimaryButton
            title="Alterar Configurações"
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
    backgroundColor: '#0F172A',
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
  badge: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 14,
  },
  cardSubtext: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  bold: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  actions: {
    gap: 12,
  },
  secondaryAction: {
    marginTop: 4,
  },
});
