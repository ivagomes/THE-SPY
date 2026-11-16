import { CATEGORIES } from '../data/categories.js';

export const MIN_PLAYERS = 4;

/**
 * Regra de negócio:
 * - 4 a 9 jogadores: máximo de 1 impostor
 * - 10 ou mais jogadores: permite 1 ou 2 impostores
 */
export function getMaxImpostors(playerCount) {
  return playerCount >= 10 ? 2 : 1;
}

/**
 * Sorteia aleatoriamente a palavra secreta da categoria escolhida
 * e os índices dos impostores sem repetição.
 */
export function generateRoundData({ categoryId, playerNames, impostorCount }) {
  const category =
    CATEGORIES.find((cat) => cat.id === categoryId) || CATEGORIES[0];

  const randomWordIndex = Math.floor(Math.random() * category.words.length);
  const secretWord = category.words[randomWordIndex];

  const totalPlayers = playerNames.length;
  const validImpostorCount = Math.max(
    1,
    Math.min(impostorCount, getMaxImpostors(totalPlayers))
  );

  // Embaralha os índices para sortear os impostores de forma justa (Fisher-Yates parcial)
  const indices = Array.from({ length: totalPlayers }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const impostorIndices = indices.slice(0, validImpostorCount);

  const players = playerNames.map((name, index) => ({
    id: index,
    name: name.trim() || `Jogador ${index + 1}`,
    isImpostor: impostorIndices.includes(index),
  }));

  return {
    categoryName: category.name,
    categoryId: category.id,
    secretWord,
    impostorCount: validImpostorCount,
    players,
  };
}
