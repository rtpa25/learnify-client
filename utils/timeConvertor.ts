export const convertTimeToConsumableValue = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;
  return `${minutes}:${Math.floor(seconds)}`;
};
