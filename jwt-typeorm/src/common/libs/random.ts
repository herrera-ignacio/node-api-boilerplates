export const getRandomInt = (
  min: number,
  max: number,
): number => min + Math.round((max - min) * Math.random());

export const getRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(getRandomInt(0, characters.length));
  }

  return result;
};
