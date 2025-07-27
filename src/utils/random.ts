let seed = 0;

const _seededRandom = () => {
  // https://en.wikipedia.org/wiki/Linear_congruential_generator
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(min + _seededRandom() * (max - min));
};

export const getRandFloat = (min: number, max: number) => {
  return min + _seededRandom() * (max - min);
};
