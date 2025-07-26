export const getRandomInt = (min: number, max: number) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

export const getRandFloat = (min: number, max: number) => {
  return Math.floor(Math.random() * (min - max + 1)) + min;
};
