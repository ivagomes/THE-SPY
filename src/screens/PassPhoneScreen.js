import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';

export default function PassPhoneScreen({ route, navigation }) {
  const { roundData, currentPlayerIndex } = route.params;
  const currentPlayer = roundData.players[currentPlayerIndex];
  const totalPlayers = roundData.players.length;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => subscription.remove();
  }, []);

  const handleConfirmIdentity = () => {
    navigation.replace('Reveal', {
      roundData,
      currentPlayerIndex,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.progressBadge}>
          <Text style={styles.stepIndicator}>
            JOGADOR {currentPlayerIndex + 1} DE {totalPlayers}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.instruction}>Passe o celular para</Text>
          <Text style={styles.playerName}>{currentPlayer.name}</Text>
          <View style={styles.divider} />
          <Text style={styles.warning}>
            Mantenha a tela virada para você. Só toque no botão abaixo quando o
            celular estiver na sua mão!
          </Text>
        </View>

        <PrimaryButton
          title={`Eu sou o ${currentPlayer.name}`}
          onPress={handleConfirmIdentity}
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
  progressBadge: {
    marginTop: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  stepIndicator: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 24,
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  instruction: {
    color: '#94A3B8',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 24,
  },
  divider: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E63946',
    marginBottom: 20,
  },
  warning: {
    color: '#CBD5E1',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
