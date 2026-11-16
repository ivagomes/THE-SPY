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
        <Text style={styles.stepIndicator}>
          Jogador {currentPlayerIndex + 1} de {totalPlayers}
        </Text>

        <View style={styles.card}>
          <Text style={styles.instruction}>Passe o celular para</Text>
          <Text style={styles.playerName}>{currentPlayer.name}</Text>
          <Text style={styles.warning}>
            Certifique-se de que mais ninguém está olhando para a tela antes de continuar.
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
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepIndicator: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  instruction: {
    color: '#CBD5E1',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  playerName: {
    color: '#F8FAFC',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
  },
  warning: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
