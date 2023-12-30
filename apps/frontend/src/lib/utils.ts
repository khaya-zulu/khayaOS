export const analogTime = (timeMs: number) => {
  // get minutes and seconds
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);

  // format time
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesStr}:${secondsStr}`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
