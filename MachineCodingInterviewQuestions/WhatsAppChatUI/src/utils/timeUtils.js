export const formatTime = (timestamp) => {
  const parts = timestamp.split(" ");
  const time = parts[0].split(":");
  return `${time[0]}:${time[1]} ${parts[1]}`;
};
